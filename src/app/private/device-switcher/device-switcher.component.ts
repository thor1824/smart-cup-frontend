import {Component, OnInit} from '@angular/core';
import {IconService} from "../../services/icon.service";
import {MenuController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DeviceService} from "../../services/device.service";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-device-switcher',
  templateUrl: './device-switcher.component.html',
  styleUrls: ['./device-switcher.component.scss']
})
export class DeviceSwitcherComponent implements OnInit {
  showCreate: boolean = false;
  newDeviceForm: FormGroup;
  teardownSub = new Subscription();

  constructor(
    public icon: IconService,
    private menu: MenuController,
    private fb: FormBuilder,
    public deviceService: DeviceService,
    private auth: AuthService
  ) {
    this.newDeviceForm = this.fb.group({
      deviceCode: ['', [Validators.required]],
      name: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  openDeviceMenu() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openAddNewCup() {
    this.showCreate = true
  }

  onAddDevice() {
    if (this.newDeviceForm.invalid) {
      return;
    }
    const userId = this.auth.user$.value._id;
    const model = this.newDeviceForm.value;
    model['userId'] = userId
    const sub = this.deviceService.RegisterDevice(model).subscribe(() => {
      this.showCreate = false;
      this.newDeviceForm.reset();
    });
    this.teardownSub.add(sub);
  }

  onCancelAdd() {
    this.showCreate = false;
    this.newDeviceForm.reset();
  }
}
