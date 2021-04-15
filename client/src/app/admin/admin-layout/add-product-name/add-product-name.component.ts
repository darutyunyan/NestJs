import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorComponent } from 'src/app/shared/templates/error/error.component';
import { UnSubscriber } from 'src/app/shared/utils/Unsubscriber';
import { IAdminState } from 'src/app/store/reducers/admin';
import { addProductNamePending, clearProductNameError, getProductNamesPending, removeProductNamePending } from 'src/app/store/actions/admin/product-name.action';
import { clearProductTypeError, getProductTypesPending } from 'src/app/store/actions/admin/product-type.action';
import { showMessage } from 'src/app/store/actions/message.action';
import { IError } from 'src/app/store/models/error';
import { IProductTypeItem } from 'src/app/store/models/product-type/product-type.model';
import { IProductNameItem } from 'src/app/store/models/produt-name/product-name.module';

@Component({
    selector: 'app-add-product-name',
    templateUrl: './add-product-name.component.html',
    styleUrls: ['./add-product-name.component.css']
})
export class AddProductNameComponent extends UnSubscriber implements OnInit {

    @ViewChild('formDirective') private formDirective: NgForm;
    public items$: Observable<IProductNameItem[]>;
    public types$: Observable<IProductTypeItem[]>;
    public loaded$: Observable<boolean>;
    public typeLoaded$: Observable<boolean>;
    public error$: Observable<IError>;
    public errorProductType$: Observable<IError>;
    public successOperation$: Observable<boolean>;
    public form: FormGroup;
    public searchItem: string;

    constructor(private store: Store<IAdminState>) {
        super();
        this.items$ = store.select(s => s.adminState.productNameState.items);
        this.loaded$ = store.select(s => s.adminState.productNameState.loaded);
        this.error$ = store.select(s => s.adminState.productNameState.error);
        this.successOperation$ = store.select(s => s.adminState.productNameState.successOperation);
        this.types$ = store.select(s => s.adminState.productTypeState.items);
        this.typeLoaded$ = store.select(s => s.adminState.productTypeState.loaded);
        this.errorProductType$ = store.select(s => s.adminState.productTypeState.error);
    }

    public ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl(null, [Validators.required]),
            productType: new FormControl(null, [Validators.required])
        });

        this.successOperation$
            .pipe(takeUntil(this.unSubscriber$))
            .subscribe({
                next: (success) => {
                    if (success) {
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
                        this.store.dispatch(clearProductNameError());
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

        this.errorProductType$
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
                            }
                        ));
                    }
                }
            });

        this.store.dispatch(getProductNamesPending());
        this.store.dispatch(getProductTypesPending());
    }

    public remove(id): void {
        this.store.dispatch(removeProductNamePending({ id }));
    }

    public submit(): void {
        if (this.form.invalid) {
            return;
        }

        this.store.dispatch(addProductNamePending({
            name: this.form.value.name,
            productTypeId: this.form.value.productType
        }));

        this.formDirective.resetForm();
    }
}
