import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, pluck, retry } from 'rxjs/operators';
import { Api, Api2 } from './api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiurl = 'https://randomuser.me/api/?results=20';
  url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}
  // getData() {
  //   return this.http.get(this.apiurl).pipe(pluck('results')).toPromise();
  // }
  getWarnData() {
    return this.http.get(this.apiurl).pipe(pluck('results'));
  }

  getRandomUsers(): Observable<Api[]> {
    const URL = `${this.apiurl}`;
    return this.http.get<Api[]>(URL).pipe(pluck('results'));
  }

  getAlbums() {
    return this.http.get('https://jsonplaceholder.typicode.com/albums');
  }
  //

  getUserData(): Observable<Api> {
    return this.http.get<Api>(this.apiurl);
  }
}
