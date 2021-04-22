import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAdminState } from 'src/app/store/reducers/admin';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  public isShow$: Observable<boolean>;

  constructor(private store: Store<IAdminState>) { }

  public ngOnInit(): void {
    this.isShow$ = this.store.select(s => s.adminState.loader.isShow);
  }

}
