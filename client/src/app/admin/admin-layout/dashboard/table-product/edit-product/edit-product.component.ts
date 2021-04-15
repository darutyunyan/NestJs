import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnSubscriber } from 'src/app/shared/utils/Unsubscriber';
import { clearColumnTypeError, getColumnTypePending } from 'src/app/store/actions/admin/column-type.action';
import { updateProductPending } from 'src/app/store/actions/admin/product.action';
import { clearProductNameError, getProductNamesPending } from 'src/app/store/actions/admin/product-name.action';
import { showMessage } from 'src/app/store/actions/message.action';
import { IColumnTypeItem } from 'src/app/store/models/column-type/column-type.model';
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
    public namesLoaded$: Observable<boolean>;
    public errorProductName$: Observable<IError>;
    public columns$: Observable<IColumnTypeItem[]>;
    public columnsLoaded$: Observable<boolean>;
    public errorColumnError$: Observable<IError>;

    constructor(
        private store: Store<IAdminState>,
        public dialogRef: MatDialogRef<EditProductComponent>,
        @Inject(MAT_DIALOG_DATA) public product: IProductItem) {
        super();
        this.names$ = store.select(s => s.adminState.productNameState.items);
        this.namesLoaded$ = store.select(s => s.adminState.productNameState.loaded);
        this.errorProductName$ = store.select(s => s.adminState.productNameState.error);
        this.columns$ = store.select(s => s.adminState.columnTypeState.items);
        this.columnsLoaded$ = store.select(s => s.adminState.columnTypeState.loaded);
        this.errorColumnError$ = store.select(s => s.adminState.columnTypeState.error);
    }

    public ngOnInit(): void {
        this.form = new FormGroup({
            info: new FormControl(this.product.info, [Validators.required]),
            productName: new FormControl(this.product.productName._id, [Validators.required]),
            columnType: new FormControl(this.product.columnType._id, [Validators.required])
        });

        this.errorColumnError$
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
                            }
                        ));
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
        this.store.dispatch(getColumnTypePending());
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
            productNameId: this.form.value.productName,
            columnTypeId: this.form.value.columnType
        }));

        this.close();
    }
}
