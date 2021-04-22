import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ErrorComponent } from 'src/app/shared/templates/error/error.component';
import { IAdminState } from 'src/app/store/reducers/admin/index';
import { IMessageData } from 'src/app/store/models/message.model';
import { AuthService } from './shared/services/auth.service';
import { UnSubscriber } from 'src/app/shared/utils/Unsubscriber';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent extends UnSubscriber implements OnInit {
    public message$: Observable<IMessageData>;

    constructor(
        private store: Store<IAdminState>,
        private auth: AuthService,
        private router: Router,
        private dialog: MatDialog) {
        super();
        this.message$ = this.store.select(s => s.adminState.messageData);
    }

    public ngOnInit(): void {
        this.message$
            .pipe(takeUntil(this.unSubscriber$))
            .subscribe({
                next: (data: IMessageData) => {
                    this.showMessage(data);
                }
            });
    }

    public isAuthenicated(): boolean {
        return this.auth.isAuthenicated();
    }

    public goHome(): void {
        this.router.navigate(['/']);
    }

    public goLocationSettings(): void {
        this.router.navigate(['/admin', 'add-location']);
    }

    public goLogPage(): void {
        this.router.navigate(['/admin', 'log']);
    }

    public logout(): void {
        this.auth.logout();
        this.router.navigate(['/']);
    }

    public showMessage(data: IMessageData): void {
        if (data.statusCode != null) {
            const dialogConfig = new MatDialogConfig<IMessageData>();

            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.width = '400px';

            dialogConfig.data = data;

            this.dialog.open(ErrorComponent, dialogConfig);
        }
    }

}
