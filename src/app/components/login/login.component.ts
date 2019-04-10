import {Component} from '@angular/core';

import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/aunthetication.service';
import {TokenPayload} from '../../model/user-details';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/list');
    }, (err) => {
      console.error(err);
    });
  }
}
