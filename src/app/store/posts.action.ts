import { createAction, props } from '@ngrx/store';
import { IPosts } from '../models/posts.model';

export const LoadDataSuccess = createAction(
  '[API] Load Data Success',
  props<{ data: any }>()
);
export const LoadDataFailure = createAction(
  '[API] Load Data Fail',
  props<{ error: any }>()
);
export const LoadData = createAction(
  '[API] Load Data',
  props<{ payload: any }>()
);
export const CreatePost = createAction(
  '[API] CreatePost',
  props<{ data: IPosts }>()
);
export const CreatePostFailure = createAction(
  '[API] CreatePost Fail',
  props<{ error: any }>()
);
export const CreatePostSuccess = createAction(
  '[API] CreatePost Success',
  props<{ payload: any }>()
);
export const PostDetailsById = createAction(
  '[API] PostDetailsById',
  props<{ payload: any }>()
);
export const PostDetailsByIdFailure = createAction(
  '[API] PostDetailsById Fail',
  props<{ error: any }>()
);
export const PostDetailsByIdSuccess = createAction(
  '[API] PostDetailsById Success',
  props<{ payload: any }>()
);