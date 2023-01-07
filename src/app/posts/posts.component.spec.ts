import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Pipe,
  PipeTransform
} from '@angular/core';
import { IPosts } from '../models/posts.model';
import { FormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { State } from '../models/posts.model';
import * as fromSelector from '../store/posts.selector';

@Pipe({
  name: 'appSearchFilter',
})
export class SearchPipeMock implements PipeTransform {
  public name = 'translate';
  public transform(items: IPosts[], searchText: string): any {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.title.toLocaleLowerCase().includes(searchText);
    });
  }
}

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async () => {
    const initialState: State = {
      postsData: [
        {
          id: 101,
          title: 'foo',
          body: 'bar',
          userId: 1
        },
        {
          id: 102,
          title: 'test',
          body: 'test bar',
          userId: 1
        }
      ],
      loading: false,
      postCreated: false,
      PostDetails: null
    };
    await TestBed.configureTestingModule({
      declarations: [ PostsComponent, SearchPipeMock ],
      imports: [
        FormsModule
      ],
      providers: [
        provideMockStore({
          initialState,
            selectors: [
              {
                selector: fromSelector.getPostsState,
                value: initialState.postsData
              }
            ],
          })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPostData', () => {
    component.getPostData();
    expect(component.getPostData).toBeTruthy();
  });
});
