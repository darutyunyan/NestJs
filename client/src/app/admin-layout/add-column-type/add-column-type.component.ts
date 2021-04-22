import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorComponent } from 'src/app/shared/templates/error/error.component';
import { UnSubscriber } from 'src/app/shared/utils/Unsubscriber';
import { IAdminState } from 'src/app/store/reducers/admin';
import { addColumnTypePending, clearColumnTypeError, getColumnTypePending, removeColumnTypePending } from 'src/app/store/actions/admin/column-type.action';
import { showMessage } from 'src/app/store/actions/message.action';
import { IError } from 'src/app/store/models/error';
import { IColumnTypeItem } from 'src/app/store/models/column-type/column-type.model';

@Component({
    selector: 'app-add-column-type',
    templateUrl: './add-column-type.component.html',
    styleUrls: ['./add-column-type.component.css']
})
export class AddColumnTypeComponent extends UnSubscriber implements OnInit, OnDestroy {
    @ViewChild('formDirective')
    private formDirective: NgForm;
    public items$: Observable<IColumnTypeItem[]>;
    public error$: Observable<IError>;
    public successOperation$: Observable<boolean>;
    public form: FormGroup;

    constructor(private store: Store<IAdminState>) {
        super();
        this.items$ = store.select(s => s.adminState.columnTypeState.items);
        this.error$ = store.select(s => s.adminState.columnTypeState.error);
        this.successOperation$ = store.select(s => s.adminState.columnTypeState.successOperation);
    }

    public ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl(null, [Validators.required])
        });

        this.successOperation$
            .pipe(takeUntil(this.unSubscriber$))
            .subscribe({
                next: (success) => {
                    if (success) {
                        this.store.dispatch(getColumnTypePending());
                        this.store.dispatch(showMessage({
                            messageData: {
                                statusCode: ErrorComponent.SUCCESS_OPERATION
                            }
                        }));
                    }
                }
            });

        this.error$
            .pipe(takeUntil(this.unSubscriber$))
            .subscribe({
                next: (error: IError) => {
                    if (error != null) {
                        this.store.dispatch(clearColumnTypeError());
                        this.store.dispatch(showMessage(
                            {
                                messageData: {
                                    statusCode: error.statusCode,
                                    message: error.message
                                }
                            }));
                    }
                }
            });

        this.store.dispatch(getColumnTypePending());
    }
    public remove(id): void {
        this.store.dispatch(removeColumnTypePending({ id }));
    }

    public submit(): void {
        if (this.form.invalid) {
            return;
        }

        this.store.dispatch(addColumnTypePending({
            name: this.form.value.name
        }));

        this.formDirective.resetForm();
    }
}
