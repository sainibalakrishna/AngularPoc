import { Pipe, PipeTransform } from '@angular/core';
import { IPosts } from '../models/posts.model';

@Pipe({ name: 'appSearchFilter' })
export class FilterPipe implements PipeTransform {
  transform(items: IPosts[], searchText: string): any[] {
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
