import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Subject } from 'rxjs';
import { CsudService } from '../services/csud.service';
// import { CgcaService } from './csud.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private lnglatSrc = new Subject<string>;
  public lnglat$ = this.lnglatSrc.asObservable();

  setLngLat(lngLat: string){
    this.lnglatSrc.next(lngLat);
  }
  

  constructor(private sudService: CsudService,) { }
}