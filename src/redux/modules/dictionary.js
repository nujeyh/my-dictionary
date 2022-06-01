import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Actions
const LOAD = "dictionary/LOAD";
const CREATE = "dictionary/CREATE";
const DELETE = "dictionary/DELETE";
const UPDATE = "dictionary/UPDATE";
const COMPLETE = "dictionary/COMPLETE";
const LOADED = "dictionary/LOADED";

// 초기값 설정
const initialState = {
  isLoaded: false,
  list: [],
};

// Action Creator
export function loadDict(dictionary) {
  return { type: LOAD, dictionary };
}

export function createDict(dictionary) {
  return { type: CREATE, dictionary };
}

export function deleteDict(wordId) {
  return { type: DELETE, wordId };
}

export function updateDict(dictIndex) {
  return { type: UPDATE, dictIndex };
}

export function completeDict(dictIndex) {
  return { type: COMPLETE, dictIndex };
}

export function isLoaded(loaded) {
  return { type: LOADED, loaded };
}

// Middleware
// action -> middleware -> reducer로 데이터 수정 단계가 추가된다.
// redux-thunk
// 객체 대신 함수를 생성하는 액션 생성 함수를 작성할 수 있게 해준다.
// 리덕스는 action 객체를 dispatch하기 때문에 함수를 생성하면 특정 액션이
// 발생하기 전에 조건을 주거나, 어떤 행동을 사전에 처리할 수 있다.
export const loadDictFB = () => {
  return async function (dispatch) {
    // db에서 데이터를 받아온다.
    const DictData = await getDocs(collection(db, "dictionary"));

    let dictionary = [];

    // store에 state를 추가하기 위해 데이터에 id를 포함한다.
    DictData.forEach((data) => {
      dictionary.push({ id: data.id, ...data.data() });
    });

    // 만든 데이터로 dispatch 한다
    dispatch(loadDict(dictionary));
  };
};

export const createDictFB = (dictionary) => {
  return async function (dispatch) {
    // UpdateWord 컴포넌트에서 받은 값을 firebase에 추가한다.
    const docRef = await addDoc(collection(db, "dictionary"), dictionary);

    // redux dispatch
    dispatch(createDict({ id: docRef.id, ...dictionary }));
  };
};

export const deleteDictFB = (wordId) => {
  return async function (dispatch) {
    // firebase에서 데이터를 삭제한다.
    const docRef = doc(db, "dictionary", wordId);
    await deleteDoc(docRef);

    // redux dispatch
    dispatch(deleteDict(wordId));
  };
};

export const updateDictFB = (dictionary) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "dictionary", dictionary.id);

    dispatch(isLoaded(false));

    // firebase 데이터 업데이트
    await updateDoc(docRef, {
      word: dictionary.word,
      meaning: dictionary.meaning,
      example: dictionary.example,
      translation: dictionary.translation,
    });

    // store의 현재 state와 같은 id도 수정한다
    const _dictionary = getState().dictionary.list;
    const dictIndex = _dictionary.findIndex((item) => {
      return item.id === dictionary.id;
    });

    dispatch(updateDict(dictIndex));
  };
};

export const completeDictFB = (dictionary) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "dictionary", dictionary.id);

    if (dictionary.completed === false) {
      await updateDoc(docRef, { completed: true });
    } else {
      await updateDoc(docRef, { completed: false });
    }

    const _dictionary = getState().dictionary.list;
    const dictIndex = _dictionary.findIndex((item) => {
      return item.id === dictionary.id;
    });

    dispatch(completeDict(dictIndex));
  };
};

//----------------- Reducer -----------------
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "dictionary/LOAD": {
      return { list: action.dictionary, isLoaded: false };
    }
    case "dictionary/CREATE": {
      const newDictionary = [...state.list, action.dictionary];
      return { ...state, list: newDictionary, isLoaded: true };
    }

    case "dictionary/DELETE": {
      // 삭제할 값만 제외하고 list를 다시 만든다.
      const newDictionary = state.list.filter((item) => {
        return action.wordId !== item.id;
      });
      return { ...state, list: newDictionary, isLoaded: true };
    }

    case "dictionary/UPDATE": {
      const newDictionary = state.list.map((item, index) => {
        if (parseInt(action.dictIndex) === index) {
          return { ...item };
        } else {
          return item;
        }
      });
      return { ...state, list: newDictionary, isLoaded: true };
    }

    case "dictionary/COMPLETE": {
      const newDictionary = state.list.map((item, index) => {
        if (parseInt(action.dictIndex) === index && item.completed === false) {
          return { ...item, completed: true };
        } else if (
          parseInt(action.dictIndex) === index &&
          item.completed === true
        ) {
          return { ...item, completed: false };
        } else {
          return item;
        }
      });
      return { ...state, list: newDictionary };
    }

    case "dictionary/LOADED": {
      return { ...state, isLoaded: action.loaded };
    }
    default:
      return state;
  }
}
