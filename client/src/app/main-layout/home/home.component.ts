import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getProductsPending } from 'src/app/store/actions/client/client.actions';
import { IGetAllItem } from 'src/app/store/models/client.model';
import { IError } from 'src/app/store/models/error';
import { IClientState } from 'src/app/store/reducers/client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public product$: Observable<IGetAllItem[]>;
  public error$: Observable<IError>;
  public loading$: Observable<boolean>;

  constructor(private store: Store<IClientState>) {
    this.loading$ = store.select(s => s.clientState.loading);
    this.error$ = store.select(s => s.clientState.error);
    this.product$ = store.select(s => s.clientState.products.items);
  }

  public ngOnInit(): void {
    this.store.dispatch(getProductsPending());
  }

  public getFullYear(): number {
    return new Date().getFullYear();
  }
}
