import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IState } from 'src/app/store/reducers/admin';
import { hideMessage } from 'src/app/store/actions/message.action';
import { ErrorType, IMessageData } from 'src/app/store/models/message.model';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  public static readonly ERROR_COMMON: string = 'ABBCC1121';
  public static readonly ERROR_BUSINESS: string = 'ABBC1122';
  public static readonly SUCCESS_OPERATION: string = 'ABBC1123';

  public message: string = null;
  public errorType: ErrorType = null;
  private readonly SUCCESS_MESSAGE: string = 'Операция успешно выполнена!';

  constructor(
    private store: Store<IState>,
    public dialogRef: MatDialogRef<ErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public messageData: IMessageData) { }

  public ngOnInit(): void {
    this.message = this.messageData.statusCode === ErrorComponent.SUCCESS_OPERATION ?
      this.SUCCESS_MESSAGE :
      this.messageData.message;

    this.errorType = this.getErrorType(this.messageData.statusCode);
  }

  public onNoClick(): void {
    this.dialogRef.close();
    this.store.dispatch(hideMessage());
  }

  public getErrorTypeString(): string {
    if (this.errorType === ErrorType.Warning) {
      return 'warning';
    } else if (this.errorType === ErrorType.Error) {
      return 'error';
    } else if (this.errorType === ErrorType.Success) {
      return 'done';
    }
  }

  private getErrorType(statusCode: string): ErrorType {
    switch (statusCode) {
      case ErrorComponent.ERROR_BUSINESS:
        return ErrorType.Warning;

      case ErrorComponent.ERROR_COMMON:
        return ErrorType.Error;

      case ErrorComponent.SUCCESS_OPERATION:
        return ErrorType.Success;

      default:
        return ErrorType.Error;
    }
  }
}
