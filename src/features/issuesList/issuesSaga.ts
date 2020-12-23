
import { takeEvery, call, put,all } from 'redux-saga/effects';

import { getIssuesStart,getIssuesSuccess,
         getIssuesFailure,fetchIssues,
         fetchIssue,getIssueStart,
         getIssueSuccess,getIssueFailure } from './issuesSlice';
import { getIssue, getIssues } from 'api/githubAPI'
import { PayloadAction } from '@reduxjs/toolkit';

export function* fetchIssuesAsync(action:PayloadAction<{
    org: string,
    repo: string,
    page?: number}>
  ){
    try {
      yield put(getIssuesStart())   
      const issues = yield call(getIssues,action.payload.org, action.payload.repo, action.payload.page)
      yield put(getIssuesSuccess(issues))
    } catch (err) {
      yield put(getIssuesFailure(err.toString()))
    }
  }
  
  export function* fetchIssueAsync  (action:PayloadAction<{
    org: string,
    repo: string,
    number: number}>
  ) {
    try {
    
      yield put(getIssueStart())     
      const issue = yield call(getIssue,action.payload.org, action.payload.repo, action.payload.number)
      yield put(getIssueSuccess(issue))
    } catch (err) {
      yield put(getIssueFailure(err.toString()))
    }
  }

  export default function* issuesSaga() {
    yield all([takeEvery(fetchIssues.type, fetchIssuesAsync),
            takeEvery(fetchIssue.type, fetchIssueAsync)
    ])
  }