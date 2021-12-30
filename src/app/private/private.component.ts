import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-dm',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {

  constructor(
    private auth:AuthService
  ) {
  }

  ngOnInit(): void {
    const sub = this.auth.me().subscribe()
  }
}
