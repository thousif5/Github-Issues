const initialState = {
  data: [],
  name: [],
  labels: [],
  authorList: [],
  page: 1,
  signed: sessionStorage.getItem("signed"),
 filter : {
    state: '',
    authors: '',
    label: '',
    search: '',
    sort: ''
  }
};

const IssueReducer = (state = initialState, action) => {
  if(action.type === 'ALL_FILTER') {
    let target = Object.assign({},state.filter);
    let keys = Object.keys(state.filter)
    keys.forEach(ele => {
      if(action.payload[ele] !== target[ele] && action.payload[ele] !== '') target[ele] = action.payload[ele]
      if(action.payload[ele] === -1) target[ele] = ''
    })
    return {
      ...state,
      filter: target
    }
  }

  if (action.type === "GET_DATA") {
    let filterReset = Object.assign({},state.filter);
    let keys = Object.keys(state.filter)
    keys.forEach(ele => {filterReset[ele]='' })
    return {
      ...state,
      data: action.payload.issues,
      authorList: action.payload.issues,
      page: action.payload.val,
      filter:filterReset
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

  return state;
};

export default IssueReducer;
