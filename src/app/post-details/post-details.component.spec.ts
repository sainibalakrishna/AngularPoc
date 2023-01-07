import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailsComponent } from './post-details.component';
import { provideMockStore } from '@ngrx/store/testing';
import { State } from '../models/posts.model';
import * as fromSelector from '../store/posts.selector';

describe('PostDetailsComponent', () => {
  let component: PostDetailsComponent;
  let fixture: ComponentFixture<PostDetailsComponent>;

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
      PostDetails: [
        {
          id: 102,
          title: 'test',
          body: 'test bar',
          userId: 1
        }
      ]
    };
    await TestBed.configureTestingModule({
      declarations: [ PostDetailsComponent ],
      providers: [
        provideMockStore({
          initialState,
            selectors: [
              {
                selector: fromSelector.postDetails,
                value: initialState.PostDetails
              }
            ],
          })
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call onCloseClick', () => {
    component.onCloseClick();
    expect(component.onCloseClick).toBeTruthy();
  });
});
