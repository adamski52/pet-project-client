import {IMAGES} from "../mocks/collage-images"
import {Injectable} from 'angular2/core';

@Injectable()
export class CollageService {
  getImages() {
    return Promise.resolve(IMAGES);
  }
}