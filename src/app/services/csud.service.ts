import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsudService {

  constructor(private _http: HttpClient) { }

  addCsud(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/csuds', data);
  }
  
  updateCsud(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/csuds/${id}`, data);
  }

  getCsudList(): Observable<any> {
    return this._http.get('http://localhost:3000/csuds');
  }

  deleteCsud(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/csuds/${id}`);
  }

}
