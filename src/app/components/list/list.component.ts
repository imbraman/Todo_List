import {Component, NgZone, OnInit} from '@angular/core';
import {ListItem, Status} from '../../model/list-item';
import {ListService} from '../../list.service';
import {DragulaService} from 'ng2-dragula';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {


  listItems: { 'todo': ListItem[], 'all': ListItem[] } = {'todo': [], 'all': []};
  subs: Subscription;

  constructor(private listService: ListService, protected _ngZone: NgZone, private dragulaService: DragulaService) {
    this.listService.getListItems().forEach((item) => {
      console.log(item.status);
      item.status === Status.WAITING ? this.listItems['all'].push(item) : this.listItems['todo'].push(item);
    });
  }

  ngOnInit() {
    this._ngZone.runOutsideAngular(() => {
      this.dragulaService.createGroup('MAIN', {}); // We are creating dragula group outside angular to prevent performance issues;
      this.subs = new Subscription();
      this.subs.add(this.dragulaService.drop('MAIN')
        .subscribe((el) => {
          // this actions I'm doing at least to make work approach with ng-templates
          this.listItems[el.target.id].push(this.listItems[el.source.id].find((item) => item.id === el.el.id));
          this.listItems[el.source.id] = this.listItems[el.source.id].filter((item) => item.id !== el.el.id);
          console.log(this.listItems);
        })
      );
    });
  }
}
