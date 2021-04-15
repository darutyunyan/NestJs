import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorComponent } from 'src/app/shared/templates/error/error.component';
import { UnSubscriber } from 'src/app/shared/utils/Unsubscriber';
import { IAdminState } from 'src/app/store/reducers/admin';
import { removeProductPending } from 'src/app/store/actions/admin/product.action';
import { showMessage } from 'src/app/store/actions/message.action';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditProductComponent } from './edit-product/edit-product.component';
import { IProductItem } from 'src/app/store/models/product/product.module';

@Component({
    selector: 'app-table-product',
    templateUrl: './table-product.component.html',
    styleUrls: ['./table-product.component.css']
})
export class TableProductComponent extends UnSubscriber implements OnInit {

    @Input()
    public products: IProductItem[];
    public productName: string;
    public successOperation$: Observable<boolean>;

    constructor(
        private store: Store<IAdminState>,
        private dialog: MatDialog) {
        super();
        this.successOperation$ = store.select(s => s.adminState.productState.successOperation);
    }

    public ngOnInit(): void {
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
    }

    public update(product: IProductItem): void {
        const dialogConfig = new MatDialogConfig<IProductItem>();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '600px';

        dialogConfig.data = product;

        this.dialog.open(EditProductComponent, dialogConfig);
    }

    public remove(id): void {
        this.store.dispatch(removeProductPending({ id }));
    }
}
