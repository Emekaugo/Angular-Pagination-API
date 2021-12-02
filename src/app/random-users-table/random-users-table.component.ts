import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ChangeDetectorRef } from '@angular/core';

import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { Api, Api2 } from '../api';
import { ApiService } from '../api.service';
import { catchError, tap } from 'rxjs/operators';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentType } from '@angular/cdk/portal';
import { CreateRandomUserComponent } from '../create-random-user/create-random-user.component';
import { EditRandomUserComponent } from '../edit-random-user/edit-random-user.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageUploadService } from '../image-upload.service';

@Component({
  selector: 'app-random-users-table',
  templateUrl: './random-users-table.component.html',
  styleUrls: ['./random-users-table.component.scss'],
})
export class RandomUsersTableComponent implements OnInit {
  private subs = new Subscription();
  userAddform!: FormGroup;
  private dataArray: any;
  displayedColumns = [
    'name',
    'picture',
    'phone',
    'email',
    'location',
    'actions',
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  public dataSource!: MatTableDataSource<Api>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatTable, { static: true }) table!: MatTable<Api>;

  name!: string;
  phone?: number;
  picture: any;
  email!: string;
  location!: string;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    public _d: DomSanitizer,
    private uploadService: ImageUploadService
  ) {}

  ngOnInit() {
    this.subs.add(
      this.apiService.getRandomUsers().subscribe(
        (res) => {
          console.log(res);
          this.dataArray = res;
          this.dataSource = new MatTableDataSource<Api>(this.dataArray);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      )
    );
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openCreateRandomUser() {
    const dialogRef = this.dialog.open(CreateRandomUserComponent, {
      width: '250px',
    });
  }

  openEditRandomUser(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(EditRandomUserComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.delete(result.data);
      }
      console.log('The dialog was closed');
    });
  }

  addRowData(row_obj: { name: any }) {
    var d = new Date();
    this.dataArray.push({
      id: d.getTime(),
      name: row_obj.name,
    });
    this.table.renderRows();
  }
  updateRowData(row_obj: { email: any; name: any }) {
    this.dataArray = this.dataArray.filter(
      (value: { email: any; name: any }, key: any) => {
        if (value.email == row_obj.email) {
          value.name = row_obj.name;
        }
        return true;
      }
    );
  }

  delete(index: number) {
    console.log(index);
    this.dataSource.data.splice(index, 1);
    this.dataSource.filter = '';
  }
}
