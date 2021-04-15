import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorComponent } from 'src/app/shared/templates/error/error.component';
import { UnSubscriber } from 'src/app/shared/utils/Unsubscriber';
import { IAdminState } from 'src/app/store/reducers/admin';
import { addProductTypePending, clearProductTypeError, getProductTypesPending, removeProductTypePending } from 'src/app/store/actions/admin/product-type.action';
import { showMessage } from 'src/app/store/actions/message.action';
import { IError } from 'src/app/store/models/error';
import { IProductTypeItem } from 'src/app/store/models/product-type/product-type.model';

@Component({
    selector: 'app-add-product-type',
    templateUrl: './add-product-type.component.html',
    styleUrls: ['./add-product-type.component.css']
})
export class AddProductTypeComponent extends UnSubscriber implements OnInit {

    @ViewChild('formDirective') private formDirective: NgForm;
    public items$: Observable<IProductTypeItem[]>;
    public loaded$: Observable<boolean>;
    public error$: Observable<IError>;
    public successOperation$: Observable<boolean>;
    public form: FormGroup;

    constructor(private store: Store<IAdminState>) {
        super();
        this.items$ = store.select(s => s.adminState.productTypeState.items);
        this.loaded$ = store.select(s => s.adminState.productTypeState.loaded);
        this.error$ = store.select(s => s.adminState.productTypeState.error);
        this.successOperation$ = store.select(s => s.adminState.productTypeState.successOperation);
    }

    public ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl(null, [Validators.required])
        });

        this.successOperation$
            .pipe(takeUntil(this.unSubscriber$))
            .subscribe({
                next: ((success) => {
                    if (success) {
                        this.store.dispatch(showMessage({
                            messageData: {
                                statusCode: ErrorComponent.SUCCESS_OPERATION
                            }
                        }));
                    }
                })
            });

        this.error$
            .pipe(takeUntil(this.unSubscriber$))
            .subscribe({
                next: (error: IError) => {
                    if (error != null) {
                        this.store.dispatch(clearProductTypeError());
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

        this.store.dispatch(getProductTypesPending());
    }

    public remove(id: string): void {
        this.store.dispatch(removeProductTypePending({ id }));
    }

    public submit(): void {
        if (this.form.invalid) {
            return;
        }

        this.store.dispatch(addProductTypePending({ name: this.form.value.name }));
        this.formDirective.resetForm();
    }
}
