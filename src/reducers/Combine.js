import { combineReducers } from 'redux';
import IssuesReducer from './IssueReducer';
import CommentsReducer from './CommentsReducer';

export default combineReducers({
  issues: IssuesReducer,
  comments: CommentsReducer
})
