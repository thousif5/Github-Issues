const repoData = {
  owner : 'thousif7',
  repo : 'test-issues'
}

let repoOwner = repoData.owner+'/'+repoData.repo;

export const getData = val => dispatch => {
  fetch(`https://api.github.com/repos/${repoOwner}/issues?state=all&page=${val}&per_page=4`)
  .then(res => res.json())
  .then(issues => dispatch({
    type: 'GET_DATA',
    payload: {issues, val}
  }))
}

export const setStatus = status => dispatch => {
  status === 'open' ? status = 'open' : status = 'closed'
  fetch(`https://api.github.com/repos/${repoOwner}/issues?state=${status}&per_page=4`)
  .then(res => res.json())
  .then(issues => dispatch({
    type: 'OPEN_OR_CLOSE_DATA',
    payload: {issues}
  }))
}

export const getLabelsFiltered = e => dispatch => {
  fetch(`https://api.github.com/repos/${repoOwner}/issues?labels=${e}&per_page=4`)
    .then(res => res.json())
    .then(issues => dispatch({
      type: 'LABELS_FILTER',
      payload: {issues}
    }))
}

export const getAuthorsFiltered = e => dispatch => {
  fetch(`https://api.github.com/repos/${repoOwner}/issues?per_page=4`)
    .then(res => res.json())
    .then(issues => dispatch({
      type: 'AUTHORS_FILTER',
      payload: {issues, e}
    }))
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