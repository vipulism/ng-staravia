import { HeaderData } from './HeaderData';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

  private headerContent = new Subject<HeaderData>();
  hdrContentObs = <Observable<HeaderData>>this.headerContent

  setHdrData(data:HeaderData){
    this.headerContent.next(data);
  }
 
}
