import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UnSubscriber } from 'src/app/shared/utils/Unsubscriber';
import { IProductNameItem, ITableItem } from 'src/app/store/models/client.model';
import { IClientState } from 'src/app/store/reducers/client';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent extends UnSubscriber {

    @Input()
    public product: ITableItem | null;
    public loading$: Observable<boolean>;

    constructor(
        private store: Store<IClientState>) {
        super();
        this.loading$ = this.store.select(s => s.clientState.productLoading);
    }

}
