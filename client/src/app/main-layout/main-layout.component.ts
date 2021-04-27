import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OnlineRequestComponent } from '../shared/templates/online-request/online-request.component';
import { getRandomProductIDPending } from '../store/actions/client/client.actions';
import { IClientState } from '../store/reducers/client';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

    public randomProductId$: Observable<string>;

    constructor(
        private store: Store<IClientState>,
        private router: Router,
        private dialog: MatDialog) {
        this.randomProductId$ = store.select(s => s.clientState.randonProductId);
    }

    public ngOnInit(): void {
         this.store.dispatch(getRandomProductIDPending());
    }

    public toHome(): void {
        this.router.navigate(['/home']);
    }

    public openOnlineRequest(): void {
        this.dialog.open(OnlineRequestComponent);
    }
}
