import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import {IconService} from "../services/icon.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DeviceService} from "../services/device.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup


  constructor(
    public iconService: IconService,
    private fb: FormBuilder,
    private deviceService: DeviceService,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      deviceId: ['', Validators.required]
    })
  }

  get deviceIDCon(): FormControl {
    return this.formGroup.get('deviceId') as FormControl;
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      deviceId: ['', Validators.required]
    })
  }

  onCommitId() {
    if(this.formGroup.invalid){
      return;
    }

    this.deviceService.DeviceId = this.formGroup.get('deviceId')?.value as string;
    this.router.navigate(['dashboard']).then();
  }

}
