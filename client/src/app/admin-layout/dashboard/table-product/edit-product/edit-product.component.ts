import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnSubscriber } from 'src/app/shared/utils/Unsubscriber';
import { updateProductPending } from 'src/app/store/actions/admin/product.action';
import { clearProductNameError, getProductNamesPending } from 'src/app/store/actions/admin/product-name.action';
import { showMessage } from 'src/app/store/actions/message.action';
import { IError } from 'src/app/store/models/error';
import { IProductItem } from 'src/app/store/models/product/product.module';
import { IProductNameItem } from 'src/app/store/models/produt-name/product-name.module';
import { IAdminState } from 'src/app/store/reducers/admin';

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent extends UnSubscriber implements OnInit {

    public form: FormGroup;
    public names$: Observable<IProductNameItem[]>;
    public errorProductName$: Observable<IError>;

    constructor(
        private store: Store<IAdminState>,
        public dialogRef: MatDialogRef<EditProductComponent>,
        @Inject(MAT_DIALOG_DATA) public product: IProductItem) {
        super();
        this.names$ = store.select(s => s.adminState.productNameState.items);
        this.errorProductName$ = store.select(s => s.adminState.productNameState.error);
    }

    public ngOnInit(): void {
        this.form = new FormGroup({
            info: new FormControl(this.product.info, [Validators.required]),
            productName: new FormControl(this.product.productName._id, [Validators.required])
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

    public close(): void {
        this.dialogRef.close();
    }

    public submit(): void {
        if (this.form.invalid) {
            return;
        }

        this.store.dispatch(updateProductPending({
            id: this.product._id,
            info: this.form.value.info,
            productNameId: this.form.value.productName
        }));

        this.close();
    }
}
