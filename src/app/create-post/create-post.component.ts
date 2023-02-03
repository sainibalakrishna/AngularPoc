import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, IPosts } from '../models/posts.model';
import * as fromSelector from '../store/posts.selector';
import * as fromActions from '../store/posts.action';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  myForm: any;

  constructor(private store: Store<State>, private fb: FormBuilder, private router: Router) {}
  
  ngOnInit() {
    this.myForm = this.fb.group({
      title: ['', [Validators.required, Validators.pattern(new RegExp('^[xX]'))]],
      bodyText: ['', Validators.required],
      message: ''
    });
  }
  onSubmit(form: FormGroup) {
    const postData: IPosts = {
      title: form.value.title,
      body: form.value.bodyText,
      userId: 1
    }
    this.store.dispatch(fromActions.CreatePost({data: postData}));
    this.store.select(fromSelector.createPosts).subscribe(data => {
      if (data) {
        this.myForm.reset();
        alert('post is created successfully...');
      }
    });
  }
}
