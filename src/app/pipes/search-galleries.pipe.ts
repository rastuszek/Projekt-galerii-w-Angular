import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchGalleries'
})
export class SearchGalleriesPipe implements PipeTransform {

  galleries: any;


  transform(value: any, args?: string): any {

      this.galleries = value;

      if (args) {
        this.galleries = this.galleries.filter(item =>
          ((item.title.toLowerCase().indexOf(args.toLowerCase()) !== -1) || (item.description.toLowerCase().indexOf(args.toLowerCase()) !== -1) || (item.dateCreated.indexOf(args) !== -1)));
      } else {
        this.galleries=value;
      }
      return this.galleries;
  }
}
