import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getLocationPending } from 'src/app/store/actions/shared/location.action';
import { IError } from 'src/app/store/models/error';
import { IClientState } from 'src/app/store/reducers/client';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public error$: Observable<IError>;
  public mapLoading$: Observable<boolean>;

  constructor(private store: Store<IClientState>) {
    this.mapLoading$ = this.store.select(s => s.locationState.loading);
    this.error$ = this.store.select(s => s.locationState.error);
  }

  public ngOnInit(): void {
    this.store.dispatch(getLocationPending());
  }

  public getFullYear(): string {
    return new Date().getFullYear().toString();
  }

}
