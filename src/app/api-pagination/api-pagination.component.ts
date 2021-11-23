import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Api } from '../api';
import { ApiService } from '../api.service';
import { merge, Observable, of as observableOf, of, Subscription } from 'rxjs';
import { catchError, map, startWith, switchMap, tap } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/table';
import { OrderByPipe } from '../pipe/order-by.pipe';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-api-pagination',
  templateUrl: './api-pagination.component.html',
  styleUrls: ['./api-pagination.component.scss'],
  providers: [OrderByPipe],
})
export class ApiPaginationComponent implements OnInit {
  private subs = new Subscription();
  displayedColumns = ['name', 'picture', 'phone', 'email', 'location'];
  dataSourceUser: any;
  pageReady$!: Observable<any>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  private dataArray: any;
  sortedData!: any[];

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
  }

  compare(a: number | string, b: number | string, isAsc: any) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    const data = this.dataArray.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort(
      (
        a: {
          name: string | number;
          picture: string | number;
          phone: string | number;
          email: string | number;
          location: string | number;
        },
        b: {
          name: string | number;
          picture: string | number;
          phone: string | number;
          email: string | number;
          location: string | number;
        }
      ) => {
        let isAsc = sort.direction == 'asc';
        switch (sort.active) {
          case 'name':
            return this.compare(a.name, b.name, isAsc);
          case 'picture':
            return this.compare(+a.picture, +b.picture, isAsc);
          case 'phone':
            return this.compare(+a.phone, +b.phone, isAsc);
          case 'email':
            return this.compare(+a.email, +b.email, isAsc);
          case 'location':
            return this.compare(+a.location, +b.location, isAsc);
          default:
            return 0;
        }
      }
    );
  }
}
