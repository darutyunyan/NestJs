import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorComponent } from 'src/app/shared/templates/error/error.component';
import { UnSubscriber } from 'src/app/shared/utils/Unsubscriber';
import { IAdminState } from 'src/app/store/reducers/admin';
import { addProductPending, clearProductError } from 'src/app/store/actions/admin/product.action';
import { clearProductNameError, getProductNamesPending } from 'src/app/store/actions/admin/product-name.action';
import { showMessage } from 'src/app/store/actions/message.action';
import { IError } from 'src/app/store/models/error';
import { IProductNameItem } from 'src/app/store/models/produt-name/product-name.module';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
export class AddProductComponent extends UnSubscriber implements OnInit {

    @ViewChild('formDirective')
    private formDirective: NgForm;

    public readonly ALERT_LINK_PR_NAME: string = 'add-product-name';
    public readonly ALERT_MESSAGE_PR_NAME: string = 'Добавьте имя продукта!';
    public form: FormGroup;
    public error$: Observable<IError>;
    public successOperation$: Observable<boolean>;
    public names$: Observable<IProductNameItem[]>;
    public errorProductName$: Observable<IError>;

    constructor(private store: Store<IAdminState>) {
        super();
        this.error$ = store.select(s => s.adminState.productState.error);
        this.successOperation$ = store.select(s => s.adminState.productState.successOperation);
        this.names$ = store.select(s => s.adminState.productNameState.items);
        this.errorProductName$ = store.select(s => s.adminState.productNameState.error);
    }

    public ngOnInit(): void {
        this.form = new FormGroup({
            info: new FormControl(null, [Validators.required]),
            productName: new FormControl(null, [Validators.required])
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
                        this.store.dispatch(clearProductError());
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

        this.errorProductName$
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
                            }
                        ));
                    }
                }
            });

        this.store.dispatch(getProductNamesPending());
    }

    public submit(): void {
        if (this.form.invalid) {
            return;
        }

        this.store.dispatch(addProductPending({
            info: this.form.value.info,
            productNameId: this.form.value.productName
        }));

        this.formDirective.resetForm();
    }
}
