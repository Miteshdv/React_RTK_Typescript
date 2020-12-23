import { createSelector,defaultMemoize } from 'reselect';
import { RootState } from 'app/rootReducer'
import { sliceName as commentsSlice } from './commentsSlice';
import { sliceName as issuesSlice } from 'features/issuesList/issuesSlice';

export const commentsDomain = (state:RootState) => state[commentsSlice];
const issuesDomain = (state:RootState) => state[issuesSlice]

export const getIssueForComment = defaultMemoize((issueId:number)=>createSelector(issuesDomain,
    (issues) => issues.issuesByNumber[issueId]
  ))

export const getCommentsData = defaultMemoize((issueId:number)=>createSelector(commentsDomain,(comments)=>{
  const {loading:commentsLoading, error:commentsError, commentsByIssue:commentsIssueData} = comments
  return {commentsLoading,commentsError,comments:commentsIssueData[issueId]}

}))