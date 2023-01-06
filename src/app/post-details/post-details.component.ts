import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, IPosts } from '../models/posts.model';
import * as fromSelector from '../store/posts.selector';
import * as fromActions from '../store/posts.action';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent {
  @Input() postDetailId;
  @Output() closeModel = new EventEmitter<void>();
  postDetailsData: IPosts;

  constructor(private store: Store<State>) {}
  onCloseClick() {
    this.closeModel.emit();
  }

  ngOnInit() {
    this.store.dispatch(fromActions.PostDetailsById({payload: this.postDetailId}));
    this.store.select(fromSelector.postDetails).subscribe(data => {
      this.postDetailsData = data;
    });
  }
}
