import * as fromAction from './posts.action';
import { createReducer, on } from '@ngrx/store';
import { State } from '../models/posts.model';

export const postsFeatureKey = 'postsData';

export const initialState: State = {
  postsData: [],
  loading: false,
  postCreated: false,
  PostDetails: null
};

export const reducer = createReducer(
  initialState,
  on(fromAction.LoadDataSuccess, (state, data) => ({
    ...state,
    postsData: data,
    loading: false
  })),
  on(fromAction.LoadDataFailure, (state, data) => ({
    ...state,
    loading: false
  })),
  on(fromAction.CreatePostSuccess, (state, data) => ({
    ...state,
    postsData: data,
    postCreated: true
  })),
  on(fromAction.CreatePostFailure, (state, data) => ({
    ...state,
    postCreated: false
  })),
  on(fromAction.PostDetailsByIdSuccess, (state, data) => ({
    ...state,
    PostDetails: data.payload,
    loading: true
  })),
  on(fromAction.PostDetailsByIdFailure, (state, data) => ({
    ...state,
    loading: false
  }))
)
