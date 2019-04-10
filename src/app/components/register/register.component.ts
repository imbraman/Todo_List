import { Component } from '@angular/core';

import { Router } from '@angular/router';
import {TokenPayload} from '../../model/user-details';
import {AuthenticationService} from '../../services/aunthetication.service';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/list');
    }, (err) => {
      console.error(err);
    });
  }
}
