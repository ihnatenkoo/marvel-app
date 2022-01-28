export const getRandomChar = (char) => {
  return {
    type: 'GET_RANDOM_CHAR',
    payload: char
  }
}

export const getCharList = (charList) => {
  return {
    type: 'GET_CHAR_LIST',
    payload: charList
  }
}

export const changeOffsetCharacters  = () => {
  return {
    type: 'CHANGE_OFFSET_CHARACTERS',
  }
}

export const toggleEndCharacters = (boolean) => {
  return {
    type: 'TOGGLE_END_CHARATERS',
    payload: boolean
  }
}

export const setActiveChar = (id) => {
  return {
    type: 'SET_ACTIVE_CHAR',
    payload: id
  }
}

export const setSearchedChar = (char) => {
  return {
    type: 'SET_SEARCHED_CHAR',
    payload: char
  }
}

export const resetSearchedChar = () => {
  return {
    type: 'RESET_SEARCHED_CHAR',
  }
}