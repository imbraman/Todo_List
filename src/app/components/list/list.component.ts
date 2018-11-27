import {Component, NgZone, OnInit} from '@angular/core';
import {ListItemModel, ListType} from '../../model/list-item.model';
import {ListService} from '../../services/list.service';
import {DragulaService} from 'ng2-dragula';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-task-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {


  readonly quickDeleteTime = 100;
  readonly longDeleteTime = 500;
  private listItems: { 'todo': ListItemModel[], 'all': ListItemModel[] } = {'todo': [], 'all': []};
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
              if (el.source.id !== el.target.id) {
                this.saveList();
              }
            }
          );
        })
      );
    });
  }

  addItem() {
    this.listItems['all'].push(this.listService.createNewListItem());
  }


  removeFromAllList(listItem: ListItemModel) {
    setTimeout(() => this.listItems['all'] = this.listItems['all'].filter(item => item.id !== listItem.id), this.quickDeleteTime);
  }

  removeFromTodoList(listItem: ListItemModel) {
    this.listService.sendListToServer(this.listItems['todo']);
    setTimeout(() => {
      this.listItems['todo'] = this.listItems['todo'].filter(item => item.id !== listItem.id);
      this.saveList();
    }, this.quickDeleteTime);
  }

  markItemAsCompleted(listItem: ListItemModel, time: number = this.longDeleteTime) {

    setTimeout(() => {
      this.listItems['todo'] = this.listItems['todo'].filter(item => item.id !== listItem.id);
      this.saveList();
    }, time);
  }

  moveItemToTodoList(listItem: ListItemModel) {
    listItem.listType = ListType.TODO;
    this.listItems['todo'].push(listItem);
    this.listItems['all'] = this.listItems['all'].filter(item => item.id !== listItem.id);
    this.saveList();
  }

  markAllItemsAsCompleted() {
    this.listItems['todo'] = [];

  }

  saveList() {
    this.listService.sendListToServer(this.listItems['todo']);
  }
}
