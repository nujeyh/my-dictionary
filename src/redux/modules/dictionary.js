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

export function isLoaded(loaded) {
  return { type: LOADED, loaded };
}

// 비동기 통신을 도와주는 미들웨어
// action -> middleware -> reducer로 데이터 수정 단계가 추가된다.
// redux-thunk
// 객체 대신 함수를 생성하는 액션 생성 함수를 작성할 수 있게 해준다.
// 리덕스는 action 객체를 dispatch하기 때문에 함수를 생성하면 특정 액션이
// 발생하기 전에 조건을 주거나, 어떤 행동을 사전에 처리할 수 있다.
export const loadDictFB = () => {
  return async function (dispatch) {
    const DictData = await getDocs(collection(db, "dictionary"));

    let dictionary = [];

    DictData.forEach((data) => {
      dictionary.push({ id: data.id, ...data.data() });
    });
    dispatch(loadDict(dictionary));
  };
};

export const createDictFB = (dictionary) => {
  return async function (dispatch) {
    // Word 컴포넌트에서 받은 값 firebase에 추가
    const docRef = await addDoc(collection(db, "dictionary"), dictionary);
    dispatch(createDict({ id: docRef.id, ...dictionary }));
  };
};

export const deleteDictFB = (wordId) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "dictionary", wordId);
    await deleteDoc(docRef);

    dispatch(deleteDict(wordId));
  };
};

export const updateDictFB = (dictionary) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "dictionary", dictionary.id);
    dispatch(isLoaded(false));

    await updateDoc(docRef, {
      word: dictionary.word,
      meaning: dictionary.meaning,
      example: dictionary.example,
      translation: dictionary.translation,
    });
    console.log("파베업뎃 완료");

    const _dictionary = getState().dictionary.list;
    const dictIndex = _dictionary.findIndex((item) => {
      return item.id === dictionary.id;
    });
    console.log("dictIndex", dictIndex);
    dispatch(updateDict(dictIndex));
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "dictionary/LOAD": {
      console.log("리듀서 로드 중");
      return { list: action.dictionary, isLoaded: false };
    }
    case "dictionary/CREATE": {
      const newDictionary = [...state.list, action.dictionary];
      return { ...state, list: newDictionary, isLoaded: true };
    }

    case "dictionary/DELETE": {
      const newDictionary = state.list.filter((item) => {
        return action.wordId !== item.id;
      });
      return { ...state, list: newDictionary, isLoaded: true };
    }

    case "dictionary/UPDATE": {
      const newDictionary = state.list.map((item, index) => {
        console.log("리듀서 업뎃 중");
        if (parseInt(action.dictIndex) === index) {
          return { ...item };
        } else {
          return item;
        }
      });
      return { ...state, list: newDictionary, isLoaded: true };
    }

    case "dictionary/LOADED": {
      return { ...state, isLoaded: action.loaded };
    }
    default:
      return state;
  }
}
