import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";
import * as fromActions from "./posts.action";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostsEffects {
  constructor(private actions: Actions, private http: HttpClient,) {}
  loadData$ = createEffect(() => this.actions.pipe(
    ofType(fromActions.LoadData),
    switchMap((payload) => {
      return this.http.get('https://jsonplaceholder.typicode.com/posts').pipe(
        map((data) => {
          return fromActions.LoadDataSuccess({data})
        }),
        catchError(error =>
          of(fromActions.LoadDataFailure({ error: error }))
        )
      );
    })
  ));
  createPost$ = createEffect(() => this.actions.pipe(
    ofType(fromActions.CreatePost),
    switchMap((payload) => {
      return this.http.post('https://jsonplaceholder.typicode.com/posts', {
        title: payload.data.title,
        body: payload.data.body,
        userId: payload.data.userId,
      }).pipe(
        map((data) => {
          return fromActions.CreatePostSuccess({payload: data})
        }),
        catchError(error =>
          of(fromActions.CreatePostFailure({ error: error }))
        )
      );
    })
  ));

  postDetailsById$ = createEffect(() => this.actions.pipe(
    ofType(fromActions.PostDetailsById),
    switchMap((payload) => {
      return this.http.get('https://jsonplaceholder.typicode.com/posts/' + payload.payload).pipe(
        map((data) => {
          return fromActions.PostDetailsByIdSuccess({payload: data})
        }),
        catchError(error =>
          of(fromActions.PostDetailsByIdFailure({ error: error }))
        )
      );
    })
  ));
}
