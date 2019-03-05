import {IPhoto} from './iphoto';


export class IGallery {
  galleryId: string;
  title: string;
  dateCreated: string;
  thumbUrl: string;
  description: string;
  tags?: any;
  photos: IPhoto[];
  place?: any;
}
