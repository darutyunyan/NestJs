import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnSubscriber } from 'src/app/shared/utils/Unsubscriber';
import { clearLogError, getLogPending } from 'src/app/store/actions/admin/log.action';
import { showMessage } from 'src/app/store/actions/message.action';
import { IError } from 'src/app/store/models/error';
import { ILog } from 'src/app/store/models/log/log.model';
import { IAdminState } from 'src/app/store/reducers/admin';

@Component({
    selector: 'app-log',
    templateUrl: './log.component.html',
    styleUrls: ['./log.component.css']
})
export class LogComponent extends UnSubscriber implements OnInit {
    public items$: Observable<ILog[]>;
    public error$: Observable<IError>;

    constructor(private store: Store<IAdminState>) {
        super();
        this.error$ = this.store.select(s => s.adminState.logState.error);
        this.items$ = this.store.select(s => s.adminState.logState.items);
    }

    public ngOnInit(): void {
        this.error$
            .pipe(takeUntil(this.unSubscriber$))
            .subscribe({
                next: (error: IError) => {
                    if (error != null) {
                        this.store.dispatch(clearLogError());
                        this.store.dispatch(showMessage(
                            {
                                messageData: {
                                    statusCode: error.statusCode,
                                    message: error.message
                                }
                            }));
                    }
                }
            });

        this.store.dispatch(getLogPending());
    }

}
