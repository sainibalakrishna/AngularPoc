import { Component, OnInit, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';
import { State, IPosts } from '../models/posts.model';
import * as fromSelector from '../store/posts.selector';
import * as fromActions from '../store/posts.action';
import { PlaceHolderDirective } from '../directives/placeholder.directive';
import { PostDetailsComponent } from '../post-details/post-details.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  allPostsList$ = this.store.select(fromSelector.getPostsState);
  activeTabIndex = 0;
  @ViewChild(PlaceHolderDirective) placeHolderDirective: PlaceHolderDirective;
  searchText='';
  closeSub: Subscription;
  searchTextControl = new FormControl();

  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.store.dispatch(fromActions.LoadData({payload: null}));
    this.searchTextControl.valueChanges.pipe(debounceTime(500)).subscribe(newValue => this.searchText = newValue);
  }
  getPostData() {
    this.activeTabIndex = 0;
    this.store.dispatch(fromActions.LoadData({payload: null}));
  }
  showPostDetails(posts) {
    this.placeHolderDirective.viewContainerRef.clear();
    const compRef = this.placeHolderDirective.viewContainerRef.createComponent(PostDetailsComponent);
    compRef.instance.postDetailId = posts?.id;
    this.closeSub = compRef.instance.closeModel.subscribe(() => {
      this.closeSub.unsubscribe();
      this.placeHolderDirective.viewContainerRef.clear();
    })
  }
}
