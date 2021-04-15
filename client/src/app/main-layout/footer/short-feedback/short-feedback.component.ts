import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { sendShortFeedbackPending } from 'src/app/store/actions/client/client.actions';
import { IClientState } from 'src/app/store/reducers/client';

@Component({
  selector: 'app-short-feedback',
  templateUrl: './short-feedback.component.html',
  styleUrls: ['./short-feedback.component.css']
})
export class ShortFeedbackComponent implements OnInit {

  @ViewChild('formDirective') private formDirective: NgForm;
  public form: FormGroup;
  public sending$: Observable<boolean>;
  public error$: Observable<boolean>;

  constructor(private store: Store<IClientState>) {
    this.sending$ = store.select(s => s.clientState.shortFeedback.shortFeedbackSending);
    this.error$ = store.select(s => s.clientState.shortFeedback.shortFeedbackError);
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      message: new FormControl(null)
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(sendShortFeedbackPending({
      name: this.form.value.name,
      phone: this.form.value.phone,
      message: this.form.value.message
    }));

    this.formDirective.resetForm();
  }

}
