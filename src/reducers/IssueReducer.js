const initialState = {
  data: [],
  name: [],
  labels: [],
  open: "",
  close: "",
  authorList: [],
  page: 1,
  signed: sessionStorage.getItem("signed")
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

  if (action.type === "LOGIN") {
    let status = "";
    state.signed === "sign in" ? (status = "sign out") : (status = "sign in");
    return {
      ...state,
      signed: status
    };
  }

  if (action.type === "STATUS_UPDATE") {
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
      data: action.payload.issues,
      name: action.payload.e.target.value
    };
  }

  if (action.type === "GET_LABELS") {
    return {
      ...state,
      labels: action.payload
    };
  }

  if (action.type === "AUTHORS_FILTER") {
    let newData = action.payload.issues.filter(
      issue => issue.user.login === action.payload.e
    );
    return {
      ...state,
      data: newData.filter(issue => issue.user.login === action.payload.e)
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
