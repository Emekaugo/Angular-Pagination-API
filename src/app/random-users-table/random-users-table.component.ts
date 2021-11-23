import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ChangeDetectorRef } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { Api } from '../api';
import { ApiService } from '../api.service';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-random-users-table',
  templateUrl: './random-users-table.component.html',
  styleUrls: ['./random-users-table.component.scss'],
})
export class RandomUsersTableComponent implements OnInit {
  private subs = new Subscription();
  displayedColumns = ['name', 'picture', 'phone', 'email', 'location'];
  dataSourceUser: any;
  pageReady$!: Observable<any>;

  showData: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private dataArray: any;
  data: Api[] = [];

  userList: any;

  constructor(private apiService: ApiService) {
    // this.apiService.getRandomUsers().subscribe((x) => {
    //   this.data = x;
    //   console.log(this.data);
    //   console.warn(x);
    // });
  }

  ngOnInit() {
    this.pageReady$ = this.apiService.getRandomUsers().pipe(
      tap((result) => {
        if (!result) {
          return;
        }
        console.log('result', result);
        this.dataArray = result;
        this.dataSourceUser = this.dataArray;
        this.dataSourceUser.paginator = this.paginator;
        this.dataSourceUser.sort = this.sort;
      }),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        return of(null);
      })
    );

    // this.subs.add(
    //   this.apiService.getRandomUsers().subscribe(
    //     (results) => {
    //       if (!results) {
    //         return;
    //       }
    //       console.log(results);
    //       this.dataArray = results;
    //       this.dataSourceUser = this.dataArray;
    //       this.dataSourceUser.paginator = this.paginator;
    //       this.dataSourceUser.sort = this.sort;
    //     },
    //     (err: HttpErrorResponse) => {
    //       console.log(err);
    //     }
    //   )
    // );
    // this.getUserList();
  }

  // ngAfterViewInit() {
  //   this.dataSourceUser.paginator = this.paginator;
  //   this.dataSourceUser.sort = this.sort;
  // }

  // ngOnDestroy() {
  //   if (this.subs) {
  //     this.subs.unsubscribe();
  //   }
  // }

  // getUserList() {
  //   this.apiService.getWarnData().subscribe((result) => {
  //     console.log(result);
  //     this.userList = result;
  //   });

  //   console.log(this.userList);
  // }
}
