import { takeEvery, call, put,all } from 'redux-saga/effects';
import { getCommentsStart,getCommentsSuccess,getCommentsFailure,fetchComments } from './commentsSlice';
import {  getComments, Issue } from 'api/githubAPI'
import { PayloadAction } from '@reduxjs/toolkit';


export function* fetchCommentsAsync(action:PayloadAction<Issue>) {
  try {
    
    put(getCommentsStart())
    console.log('MAKING API CALL COMMENTS')
    const comments = yield call(getComments,action.payload.comments_url)  
    
    yield put(getCommentsSuccess({ issueId: action.payload.number, comments }));
  } catch (error) {   
    yield put(getCommentsFailure(error))
  }
}

export default function* commentsSaga() {
  yield all([takeEvery(fetchComments.type, fetchCommentsAsync)])
}