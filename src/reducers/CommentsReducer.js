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
    let temp = action.payload.array
    let update = temp.filter(
      ele => parseInt(ele.id) !== parseInt(action.payload.e.target.id)
    );
    return {
      ...state,
      comments: update
    }
  }

  return state
}

export default CommentsReducer;