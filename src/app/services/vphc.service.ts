import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VphcService {
  [x: string]: any;

  constructor(private _http: HttpClient) { }

  addVphc(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/vphcs', data);
  }
  
  updateVphc(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/vphcs/${id}`, data);
  }

  getVphcList(): Observable<any> {
    return this._http.get('http://localhost:3000/vphcs');
  }

  deleteVphc(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/vphcs/${id}`);
  }

}