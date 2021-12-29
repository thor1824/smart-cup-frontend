import {NgModule} from '@angular/core';
import {PublicComponent} from "./public.component";
import {PublicRoutingModule} from "./public-routing.module";
import {LoginComponent} from "./login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    PublicComponent,
    LoginComponent
  ],
  imports: [
    PublicRoutingModule,
    ReactiveFormsModule,
    IonicModule,
    FontAwesomeModule
  ]
})
export class PublicModule {

  constructor() {
  }
}
