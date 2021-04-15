import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getLocationPending } from 'src/app/store/actions/shared/location.action';
import { IError } from 'src/app/store/models/error';
import { IClientState } from 'src/app/store/reducers/client';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  
  public error$: Observable<IError>;
  public mapLoading$: Observable<boolean>;

  constructor(private store: Store<IClientState>) { 
    this.mapLoading$ = this.store.select(s => s.locationState.loading);
    this.error$ = this.store.select(s => s.locationState.error);
  }

  public ngOnInit(): void {
    this.store.dispatch(getLocationPending());
  }

}
