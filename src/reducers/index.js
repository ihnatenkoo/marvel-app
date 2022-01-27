const initialState = {
  charList: [],
  offsetCharacters: 301, // 1549 max offset
  isEndOfCharacters: false,
  randomChar: {
    id: '',
    name: null,
    description: "",
    thumbnail: null,
    wiki: null,
    homepage: null,
    comics: [],
  },
  

}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_RANDOM_CHAR':
      return {
        ...state,
        randomChar: action.payload
      }

    case 'GET_CHAR_LIST':
      return {
        ...state,
        charList: action.payload
      }

    case 'CHANGE_OFFSET_CHARACTERS':
      return {
        ...state,
        offsetCharacters: state.offsetCharacters + 9
      }

    case 'TOGGLE_END_CHARATERS':
      return {
        ...state,
        isEndOfCharacters: action.payload
      }
    default:
      return state;
  }
}


export default reducer;