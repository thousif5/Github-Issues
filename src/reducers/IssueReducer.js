const initialState = {
  data: null,
  open: "",
  close: "",
  authorList: [],
  page: 0
};

const IssueReducer = (state = initialState, action) => {
  if (action.type === "GET_DATA") {
    return {
      ...state,
      data: action.payload.issues,
      open: action.payload.issues.filter(item => item.state === "open").length,
      close: action.payload.issues.filter(item => item.state === "closed")
        .length,
      authorList: action.payload.issues,
      page: action.payload.val
    };
  }

  if (action.type === "OPEN_OR_CLOSE_DATA") {
    return {
      ...state,
      data: action.payload.issues,
      open: action.payload.issues.filter(item => item.state === "open").length,
      close: action.payload.issues.filter(item => item.state === "closed")
        .length
    };
  }

  if (action.type === "LABELS_FILTER") {
    return {
      ...state,
      data: action.payload.issues
    };
  }

  if (action.type === "AUTHORS_FILTER") {
    return {
      ...state,
      data: action.payload.issues.filter(
        issue => issue.user.login === action.payload.e
      )
    };
  }

  if (action.type === "SORT") {
    return {
      ...state,
      data: action.payload
    };
  }

  if (action.type === "SEARCH") {
    return {
      ...state,
      data: action.payload.value.filter(
        issue => issue.title.toLowerCase().indexOf(action.payload.e) !== -1
      )
    };
  }

  return state;
};

export default IssueReducer;
