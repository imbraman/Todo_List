import {Component, NgZone, OnInit} from '@angular/core';
import {ListItem, ListType} from '../../model/list-item';
import {ListService} from '../../list.service';
import {DragulaService} from 'ng2-dragula';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-task-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {


  readonly quickDeleteTime = 100;
  readonly longDeleteTime = 500;
  private  listItems: { 'todo': ListItem[], 'all': ListItem[] } = {'todo': [], 'all': []};
  private subs: Subscription;

  constructor(private listService: ListService, protected _ngZone: NgZone,
              private dragulaService: DragulaService) {
    this.listService.getListItems().subscribe(items => {
      this.listItems['todo'] = items.map(item => {
        item.listType = ListType.TODO;
        return item;
      });
    });
  }

  ngOnInit() {
    this._ngZone.runOutsideAngular(() => {
      this.dragulaService.createGroup('MAIN', {}); // We are creating dragula group outside angular to prevent performance issues;
      this.subs = new Subscription();
      this.subs.add(this.dragulaService.drop('MAIN')
        .subscribe((el) => {
          this._ngZone.run(() => {
              // this actions I'm doing at least to make work approach with ng-templates
              const elementId = el.el.querySelector('.task').id;
              const element = this.listItems[el.source.id].find((item) => item.id === elementId);
              element.listType = el.target.id === 'all' ? ListType.ALL : ListType.TODO;
              this.listItems[el.target.id].push(this.listItems[el.source.id].find((item) => item.id === elementId));
              this.listItems[el.source.id] = this.listItems[el.source.id].filter((item) => item.id !== elementId);
            }
          );
        })
      );
    });
  }

  addItem() {
    this.listItems['all'].push(this.listService.createNewListItem());
  }


  removeFromAllList(listItem: ListItem) {
    setTimeout(() => this.listItems['all'] = this.listItems['all'].filter(item => item.id !== listItem.id), this.quickDeleteTime);
  }

  removeFromTodoList(listItem: ListItem) {
    setTimeout(() => this.listItems['todo'] = this.listItems['todo'].filter(item => item.id !== listItem.id), this.quickDeleteTime);
  }

  markItemAsCompleted(listItem: ListItem, time: number = this.longDeleteTime) {
    setTimeout(() => this.listItems['todo'] = this.listItems['todo'].filter(item => item.id !== listItem.id), time);
  }

  moveItemToTodoList(listItem: ListItem) {
    listItem.listType = ListType.TODO;
    this.listItems['todo'].push(listItem);
    this.listItems['all'] = this.listItems['all'].filter(item => item.id !== listItem.id);
  }

  markAllItemsAsCompleted() {
    this.listItems['todo'].forEach(item => {
      this.markItemAsCompleted(item, this.quickDeleteTime);
    });
  }
}
