import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, pluck, retry } from 'rxjs/operators';
import { Api } from './api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiurl = 'https://randomuser.me/api/?results=20';
  url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}
  getData() {
    return this.http.get(this.apiurl).pipe(pluck('results')).toPromise();
  }
  getWarnData() {
    return this.http.get(this.apiurl).pipe(pluck('results'));
  }

  getRandomUsers(): Observable<Api[]> {
    const URL = `${this.apiurl}`;
    return this.http.get<Api[]>(URL).pipe(pluck('results'));
  }

  getJsonData() {
    return this.http.get<any>(this.url);
  }
}
