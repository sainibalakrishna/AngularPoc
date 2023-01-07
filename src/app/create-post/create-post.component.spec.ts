import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePostComponent } from './create-post.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StoreModule} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BrowserModule } from '@angular/platform-browser';
import { State } from '../models/posts.model';
import * as fromSelector from '../store/posts.selector';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;
  const formBuilder: FormBuilder = new FormBuilder();  
  let mockStore: MockStore<State>;

  beforeEach(async () => {
    const initialState: State = {
      postsData: [],
      loading: false,
      postCreated: false,
      PostDetails: null
    };
    await TestBed.configureTestingModule({
      declarations: [ CreatePostComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot([]),
        EffectsModule.forRoot([])
      ],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: fromSelector.createPosts,
              value: initialState.postCreated,
            }
          ],
        })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run onSubmit', () => {
    const myForm: any = {
      value: {
        title: 'Test',
        bodyText: 'Test'
      }
    }
    component.onSubmit(myForm);
    expect(component.onSubmit).toBeTruthy();
  });
});
