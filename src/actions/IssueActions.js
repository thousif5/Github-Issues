const repoData = {
  owner : 'thousif7',
  repo : 'test-issues'
}

let repoOwner = repoData.owner+'/'+repoData.repo;

export const getData = val => dispatch => {
  fetch(`https://api.github.com/repos/${repoOwner}/issues?state=all&page=${val}&per_page=7`)
  .then(res => res.json())
  .then(issues => dispatch({
    type: 'GET_DATA',
    payload: {issues, val}
  }))
  .catch(err => console.log(err))
}

export const loginCheck = () => dispatch => {
  dispatch ({
    type: "LOGIN",
  })
}

export const setStatus = (status, page) => dispatch => {
  fetch(`https://api.github.com/repos/${repoOwner}/issues?state=${status}&page=${page}&per_page=7`)
  .then(res => res.json())
  .then(issues => dispatch({
    type: 'STATUS_UPDATE',
    payload: {issues}
  }))
  .catch(err => console.log(err))
}

export const handleChange = (e) => dispatch => {
  fetch(`https://api.github.com/repos/${repoOwner}/issues?labels=${e.target.value.join()}&per_page=7`)
    .then(res => res.json())
    .then(issues => dispatch({
      type: 'LABELS_FILTER',
      payload: {issues, e}
    }))
    .catch(err => console.log(err))
}

export const getAuthorsFiltered = (e,page) => dispatch => {
  fetch(`https://api.github.com/repos/${repoOwner}/issues?page=${page}&per_page=7`)
    .then(res => res.json())
    .then(issues => dispatch({
      type: 'AUTHORS_FILTER',
      payload: {issues, e}
    }))
    .catch(err => console.log(err))
}

export const doSort = sorted => dispatch => {
  dispatch({
    type: 'SORT',
    payload: sorted
  })
}

export const searchData = (e, value) => dispatch => {
  dispatch({
    type: 'SEARCH',
    payload: {e, value}
  })
}

export const getLabelsData = () => dispatch => {
  fetch(`https://api.github.com/repos/${repoOwner}/labels`)
    .then(res => res.json())
    .then(labelsData => 
      dispatch({
        type: 'GET_LABELS',
        payload: labelsData
      })
      )
      .catch(err => console.log(err))
}