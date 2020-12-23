import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAction } from '@reduxjs/toolkit'
import { Comment} from 'api/githubAPI'

export const fetchComments = createAction<any | undefined>('comments/fetchComment')


interface CommentsState {
  commentsByIssue: Record<number, Comment[] | undefined>
  loading: boolean
  error: string | null
}

interface CommentLoaded {
  issueId: number
  comments: Comment[]
}

const initialState: CommentsState = {
  commentsByIssue: {},
  loading: false,
  error: null
}

const comments = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    getCommentsStart(state) {
      state.loading = true
      state.error = null
    },
    getCommentsSuccess(state, action: PayloadAction<CommentLoaded>) {
      const { comments, issueId } = action.payload
      state.commentsByIssue[issueId] = comments
      state.loading = false
      state.error = null
    },
    getCommentsFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const {
  getCommentsStart,
  getCommentsSuccess,
  getCommentsFailure
} = comments.actions
export const sliceName = comments.name 
export default comments.reducer


