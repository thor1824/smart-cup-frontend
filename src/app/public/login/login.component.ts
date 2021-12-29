import {Component, OnDestroy, OnInit} from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import {IconService} from "../../services/icon.service";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {DeviceService} from "../../services/device.service";
import {ActivatedRoute, Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AuthService} from "../../services/auth.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {tap} from "rxjs/operators";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('flipState', [
      state('signUp', style({
        transform: 'rotateY(179deg)'
      })),
      state('signIn', style({
        transform: 'rotateY(0)'
      })),
      transition('signUp => signIn', animate('500ms ease-out')),
      transition('signIn => signUp', animate('500ms ease-in'))
    ])
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  signInformGroup: FormGroup
  registerFormGroup: FormGroup
  teardownSubscription: Subscription = new Subscription()

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('repeatPassword')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  constructor(
    public iconService: IconService,
    private fb: FormBuilder,
    private deviceService: DeviceService,
    private router: Router,
    private auth: AuthService
  ) {
    this.signInformGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })

    this.registerFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required]]
    }, {validators: this.checkPasswords})
  }

  flip: string = 'signIn';


  get signInEmail(): FormControl {
    return this.signInformGroup.get('email') as FormControl;
  }

  get signInPassword(): FormControl {
    return this.signInformGroup.get('password') as FormControl;
  }

  get signUpEmail(): FormControl {
    return this.registerFormGroup.get('email') as FormControl;
  }

  get signUpPassword(): FormControl {
    return this.registerFormGroup.get('password') as FormControl;
  }

  get signUpRepeatPassword(): FormControl {
    return this.registerFormGroup.get('repeatPassword') as FormControl;
  }

  ngOnInit(): void {
    /*this.formGroup = this.fb.group({
      deviceId: ['', Validators.required]
    })*/
    /*this.signInformGroup = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', [Validators.required]]
    })*/

  }

  onSignIn() {
    if(this.signInformGroup.invalid){
      return;
    }
    const sub = this.auth.signIn(this.signInEmail.value, this.signInPassword.value).pipe(tap(x => {
      this.router.navigate(['dashboard']).then();
    })).subscribe();
    this.teardownSubscription.add(sub);
  }

  onSignUp() {
    if(this.registerFormGroup.invalid){
      return;
    }
    const sub = this.auth.register(this.signUpEmail.value, this.signUpRepeatPassword.value).pipe(tap(x => {
      this.router.navigate(['dashboard']).then();
    })).subscribe();
    this.teardownSubscription.add(sub);
  }

  onFlipToSignUp() {
    this.flip = 'signUp';
  }

  onFlipToSignIn() {
    this.flip = 'signIn';
  }

  ngOnDestroy(): void {
    this.teardownSubscription.unsubscribe();
  }


}
