const initialState = {
  data: null,
  comments: []
}

const CommentsReducer = (state = initialState, action) => {
  if(action.type === "GET_COMMENTS_DATA") {
    return {
      ...state,
      data: action.payload.bodyData
    }
  }

  if(action.type === "GET_COMMENTS") {
    console.log(action.payload)
    return {
      ...state,
      comments: action.payload.commentsData
    }
  }

  if(action.type === "ADD_COMMENTS") {
    return {
      ...state,
      comments: action.payload
    }
  }

  if(action.type === "DELETE_COMMENTS") {
    return {
      ...state,
      comments: action.payload
    }
  }

  return state
}

export default CommentsReducer;