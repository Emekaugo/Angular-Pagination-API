import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-create-random-user',
  templateUrl: './create-random-user.component.html',
  styleUrls: ['./create-random-user.component.scss'],
})
export class CreateRandomUserComponent implements OnInit {
  usersCreateForm!: FormGroup;
  subscription = new Subscription();
  processing = false;
  updateApprovalRequest = false;

  constructor(
    public dialogRef: MatDialogRef<CreateRandomUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.usersCreateForm = this.fb.group({
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
    return this.usersCreateForm.controls;
  }

  sendRequest() {
    if (this.usersCreateForm.invalid) {
      return;
    }
  }

  createNewUser(user: any) {
    return of(true);
  }

  updateUserRecord(user: any) {
    return of(true);
  }
}
