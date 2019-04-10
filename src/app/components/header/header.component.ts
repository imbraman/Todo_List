import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/aunthetication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  @Input()
  title: string;

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
  }

}
