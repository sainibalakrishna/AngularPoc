import { createFeatureSelector, createSelector } from '@ngrx/store';
import { postsFeatureKey } from './posts.reducer';
import { State } from '../models/posts.model';

export const selectPostsState = createFeatureSelector<State>(
  postsFeatureKey
);

export const getPostsState = createSelector(
  selectPostsState,
  (state) => state?.postsData?.data
);
export const createPosts = createSelector(
  selectPostsState,
  (state) => state.postCreated
);
export const postDetails = createSelector(
  selectPostsState,
  (state) => state.PostDetails
);
