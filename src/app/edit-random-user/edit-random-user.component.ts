import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, of } from 'rxjs';
import { CreateRandomUserComponent } from '../create-random-user/create-random-user.component';

@Component({
  selector: 'app-edit-random-user',
  templateUrl: './edit-random-user.component.html',
  styleUrls: ['./edit-random-user.component.scss'],
})
export class EditRandomUserComponent implements OnInit {
  usersEditForm!: FormGroup;
  subscription = new Subscription();
  processing = false;
  updateApprovalRequest = false;

  action!: string;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<EditRandomUserComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    console.log(data);
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  ngOnInit(): void {
    this.usersEditForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      location: ['', [Validators.required]],
    });
  }
  closeModal() {
    this.dialogRef.close();
  }

  get formFields() {
    return this.usersEditForm.controls;
  }

  sendRequest() {
    if (this.usersEditForm.invalid) {
      return;
    }
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  createNewUser(user: any) {
    return of(true);
  }

  updateUserRecord(user: any) {
    return of(true);
  }
}
