import { Injectable } from '@angular/core';
import * as iconLibrarySolidFree from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  public Coffee = iconLibrarySolidFree.faMugHot

  constructor() { }
}
