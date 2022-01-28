const initialState = {
  charList: [],
  activeChar: null,
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
  searchedChar: null
  

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

    case 'SET_ACTIVE_CHAR':
      return {
        ...state,
        activeChar: action.payload
      }

    case 'SET_SEARCHED_CHAR': 
      return {
        ...state,
        searchedChar: action.payload
      }

    case 'RESET_SEARCHED_CHAR': 
      return {
        ...state,
        searchedChar: null
      }
    default:
      return state;
  }
}


export default reducer;