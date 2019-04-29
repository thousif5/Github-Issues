const repoData = {
  owner : 'thousif7',
  repo : 'test-issues'
}

let repoOwner = repoData.owner+'/'+repoData.repo;

export const getFilter = obj => dispatch => {
  dispatch({
    type: 'ALL_FILTER',
    payload: obj
  })
}

export const getData = val => dispatch => {
  fetch(`https://api.github.com/repos/${repoOwner}/issues?state=all&page=${val}&per_page=7`)
  .then(res => res.json())
  .then(issues => dispatch({
    type: 'GET_DATA',
    payload: {issues, val}
  }))
  .catch(err => alert('Unable to fetch', err.message))
}

export const loginCheck = () => dispatch => {
  dispatch ({
    type: "LOGIN",
  })
}

export const handleChange = (e) => dispatch => {
  fetch(`https://api.github.com/repos/${repoOwner}/issues?labels=${e.target.value.join()}&per_page=7`)
    .then(res => res.json())
    .then(issues => dispatch({
      type: 'LABELS_FILTER',
      payload: {issues, e}
    }))
    .catch(err => alert('unable to fetch', err.message))
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
      .catch(err => alert('unable to fetch', err.message))
}