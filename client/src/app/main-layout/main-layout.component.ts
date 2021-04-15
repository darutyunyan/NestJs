import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OnlineRequestComponent } from '../shared/templates/online-request/online-request.component';
import { IClientState } from '../store/reducers/client';
import { selectIdFirstProduct } from '../store/reducers/selectors/client/selectors';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  public firstProductId$: Observable<string>;

  constructor(
    private store: Store<IClientState>,
    private router: Router,
    private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.firstProductId$ = this.store.pipe(select(selectIdFirstProduct));
  }

  public toHome(): void {
    this.router.navigate(['/home']);
  }

  public openOnlineRequest(): void {
    this.dialog.open(OnlineRequestComponent);
  }
}
