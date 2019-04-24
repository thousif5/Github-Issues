const repoData = {
  owner : 'thousif7',
  repo : 'test-issues'
}

let repoOwner = repoData.owner+'/'+repoData.repo;
let newToken = sessionStorage.getItem("data");

export const getData = id => dispatch => {
  // if(newToken!== null) {
    fetch(`https://api.github.com/repos/${repoOwner}/issues/${id}`)
    .then(res => res.json())
    .then(bodyData => dispatch({
      type: 'GET_COMMENTS_DATA',
      payload: {bodyData}
    }))
  // }
}

export const getComments = id => dispatch => {
  // if (newToken !== null) {
    fetch(
      `https://api.github.com/repos/${repoOwner}/issues/${id}/comments`
    )
    .then(res => res.json())
    .then(commentsData => dispatch({
      type: 'GET_COMMENTS',
      payload: {commentsData}
    }))
  // }
}

export const commentToAdd = (e, value, array) => dispatch => {
  if(newToken!== null && e.key === "Enter") {
    fetch(`https://api.github.com/repos/${repoOwner}/issues/${value}/comments?access_token=${newToken}`, { method: "POST", body: JSON.stringify({ body: e.target.value }) })
    .then(res => res.json())
    .then(addedComments => {
      let tempArray = [...array];
          tempArray.push(addedComments);
          console.log(tempArray);
          dispatch({
            type: 'ADD_COMMENTS',
            payload: tempArray
          })
          
    });
    e.target.value = "";
  }
}

export const deleteComment = (e, array) => dispatch => {
  if (newToken !== null) {
    fetch(
      `https://api.github.com/repos/${repoOwner}/issues/comments/${
        e.target.id
      }?access_token=${newToken}`,
      { method: "DELETE" }
    ).catch(err => console.log(err));
      let temp = [...array]
    let update = temp.filter(
      ele => parseInt(ele.id) !== parseInt(e.target.id)
    );
      dispatch({
        type: 'DELETE_COMMENTS',
        payload: update
      })
  }
}