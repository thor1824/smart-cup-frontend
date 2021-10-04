import { Injectable } from '@angular/core';
import * as iconLibrarySolidFree from '@fortawesome/free-solid-svg-icons';
import * as iconLibraryRegularFree from '@fortawesome/free-regular-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  public Coffee = iconLibrarySolidFree.faMugHot
  public Chart = iconLibraryRegularFree.faChartBar
  public Clock = iconLibraryRegularFree.faClock
  public Settings = iconLibrarySolidFree.faCog

  constructor() { }
}
