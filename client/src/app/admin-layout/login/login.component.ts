import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UnSubscriber } from 'src/app/shared/utils/Unsubscriber';
import { IAdminState } from 'src/app/store/reducers/admin';
import { loginPending } from 'src/app/store/actions/admin/account.action';
import { IJwtSetting } from 'src/app/store/models/acccount/account.moduel';
import { AuthService } from './../shared/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent extends UnSubscriber implements OnInit {

    @ViewChild('formDirective') private formDirective: NgForm;
    public form: FormGroup;
    public jwtSetting$: Observable<IJwtSetting>;

    constructor(
        private store: Store<IAdminState>,
        private auth: AuthService,
        private router: Router
    ) {
        super();
        this.jwtSetting$ = store.select(s => s.adminState.accountState.jwtSetting);
        if (auth.isAuthenicated()) {
            this.router.navigate(['/admin', 'dashboard']);
        }
    }

    public ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.required]),
            password: new FormControl(null, [Validators.required])
        });

        this.jwtSetting$
            .pipe(takeUntil(this.unSubscriber$))
            .subscribe({
                next: (response: IJwtSetting) => {
                    this.auth.setToken(response);
                    this.router.navigate(['/admin', 'dashboard']);
                }
            });
    }

    public submit(): void {
        if (this.form.invalid) {
            return;
        }

        this.store.dispatch(loginPending({ username: this.form.value.email, password: this.form.value.password }));
        this.formDirective.resetForm();
    }
}
