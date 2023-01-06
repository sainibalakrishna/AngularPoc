import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as postsState from './store/posts.reducer';
import { PostsEffects } from './store/posts.effect';
import { HttpClientModule} from '@angular/common/http'
import { FormsModule} from '@angular/forms';
import { FilterPipe } from '../app/filter-pipe/search-filter.pipe';
import { PostDetailsComponent } from './post-details/post-details.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlaceHolderDirective } from './directives/placeholder.directive';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    FilterPipe,
    PostDetailsComponent,
    CreatePostComponent,
    PlaceHolderDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(postsState.reducer),
    EffectsModule.forFeature([PostsEffects]),
    StoreModule.forFeature(
      postsState.postsFeatureKey,
      postsState.reducer
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
