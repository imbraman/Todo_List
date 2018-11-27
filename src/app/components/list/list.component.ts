import {Component, NgZone, OnInit} from '@angular/core';
import {ListItem, Status} from '../../model/list-item';
import {ListService} from '../../list.service';
import {DragulaService} from 'ng2-dragula';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {


  listItems: { 'todo': ListItem[], 'all': ListItem[] } = {'todo': [], 'all': []};
  subs: Subscription;

  constructor(private listService: ListService, protected _ngZone: NgZone, private dragulaService: DragulaService) {
    this.listService.getListItems().subscribe(items => {
      items.forEach(item => {
        item.status === Status.WAITING ? this.listItems['all'].push(item) : this.listItems['todo'].push(item);
      });
    });
  }

  ngOnInit() {
    this._ngZone.runOutsideAngular(() => {
      this.dragulaService.createGroup('MAIN', {}); // We are creating dragula group outside angular to prevent performance issues;
      this.subs = new Subscription();
      this.subs.add(this.dragulaService.drop('MAIN')
        .subscribe((el) => {
          // this actions I'm doing at least to make work approach with ng-templates
          const elementId = el.el.querySelector('.task').id;
          this.listItems[el.target.id].push(this.listItems[el.source.id].find((item) => item.id === elementId));
          this.listItems[el.source.id] = this.listItems[el.source.id].filter((item) => item.id !== elementId);
        })
      );
    });
  }

  addItem() {
    this.listItems['all'].push(this.listService.createNewListItem());
  }
}
