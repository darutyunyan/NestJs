import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { sendFeedbackPending } from 'src/app/store/actions/client/client.actions';
import { IClientState } from 'src/app/store/reducers/client';

@Component({
  selector: 'app-online-request',
  templateUrl: './online-request.component.html',
  styleUrls: ['./online-request.component.css']
})
export class OnlineRequestComponent implements OnInit {

  @ViewChild('formDirective') private formDirective: NgForm;
  public form: FormGroup;
  public sending$: Observable<boolean>;
  public error$: Observable<boolean>;

  constructor(private store: Store<IClientState>) {
    this.sending$ = store.select(s => s.clientState.feedback.feedbackSending);
    this.error$ = store.select(s => s.clientState.feedback.feedbackError);
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      email: new FormControl(null, [Validators.email]),
      productPosition: new FormControl(null, [Validators.required])
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(sendFeedbackPending({
      name: this.form.value.name,
      phone: this.form.value.phone,
      email: this.form.value.email,
      productPosition: this.form.value.productPosition
    }));

    this.formDirective.resetForm();
  }

}
