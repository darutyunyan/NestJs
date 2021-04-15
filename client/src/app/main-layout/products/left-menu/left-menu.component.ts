import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UnSubscriber } from 'src/app/shared/utils/Unsubscriber';
import { getProductsPending } from 'src/app/store/actions/client/client.actions';
import { IGetAllItem } from 'src/app/store/models/client.model';
import { IClientState } from 'src/app/store/reducers/client';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent extends UnSubscriber implements OnInit {

  public products$: Observable<IGetAllItem[]>;
  public loading$: Observable<boolean>;

  constructor(
    private store: Store<IClientState>) {
    super();
    this.products$ = this.store.select(s => s.clientState.products.items);
    this.loading$ = this.store.select(s => s.clientState.loading);
  }

  public ngOnInit(): void {
    this.store.dispatch(getProductsPending());
  }

}
