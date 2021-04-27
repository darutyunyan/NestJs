import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnSubscriber } from 'src/app/shared/utils/Unsubscriber';
import { getProductByIdPending } from 'src/app/store/actions/client/client.actions';
import { ITableItem } from 'src/app/store/models/client.model';
import { IError } from 'src/app/store/models/error';
import { IClientState } from 'src/app/store/reducers/client';
import { selectProduct } from 'src/app/store/reducers/selectors/client/selectors';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent extends UnSubscriber implements OnInit {
    public product$: Observable<ITableItem>;
    public error$: Observable<IError>;

    constructor(
        private store: Store<IClientState>,
        private activateRoute: ActivatedRoute) {
        super();
        this.product$ = this.store.select(selectProduct);
        this.error$ = this.store.select(s => s.clientState.error);
        // TODO ERROR
    }

    public ngOnInit(): void {
        this.activateRoute.params
            .pipe(takeUntil(this.unSubscriber$))
            .subscribe({
                next: ({ id }) => {
                    this.store.dispatch(getProductByIdPending({ id }));
                    document.querySelector('mat-sidenav-content').scrollTop = 0;
                }
            });
    }

}
