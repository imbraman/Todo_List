import {Component, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ListItemModel, ListType} from '../../model/list-item.model';
import {ListService} from '../../services/list.service';
import {DragulaService} from 'ng2-dragula';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material';
import {WarningDialogComponent} from './dialogs/warning-dialog/warning-dialog.component';
import {ListModel} from '../../model/list.model';


@Component({
  selector: 'app-items-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {

  private listItems: { 'todo': ListItemModel[], 'all': ListItemModel[] } = {'todo': [], 'all': []};
  private subs: Subscription;
  private todoListLength = 5;
  private list: ListModel;


  @ViewChild('dialog') child: MatDialog;

  constructor(private listService: ListService, protected _ngZone: NgZone,
              private dragulaService: DragulaService, public dialog: MatDialog) {
    this.listService.getList().subscribe((list: ListModel) => {
      this.list = list;
      if (list) {
        this.listItems['todo'] = list.items;
      }
    });
  }

  ngOnInit() {
    this._ngZone.runOutsideAngular(() => {
      this.dragulaService.createGroup('MAIN', {}); // We are creating dragula group outside angular to prevent performance issues;
      this.subs = new Subscription();
      this.subs.add(this.dragulaService.drop('MAIN')
        .subscribe((el) => {
          this._ngZone.run(() => {
              if (el.source.id !== el.target.id) {
                // this actions I'm doing at least to make work approach with ng-templates
                const elementId = el.el.querySelector('.list-item').id;
                const element = this.listItems[el.source.id].find((item) => item.id === elementId);
                el.target.id === 'all' ? this.moveItemToAll(element) : this.moveItemToTodoList(element);
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
    this.listItems['all'] = this.listItems['all'].filter(item => item.id !== listItem.id);
  }

  removeFromTodoList(listItem: ListItemModel) {
    this.listItems['todo'] = this.listItems['todo'].filter(item => item.id !== listItem.id);
    this.saveList();
  }

  markItemAsCompleted(listItem: ListItemModel) {
    this.listItems['todo'] = this.listItems['todo'].filter(item => item.id !== listItem.id);
    this.saveList();
  }

  moveItemToTodoList(listItem: ListItemModel) {
    if (this.listItems['todo'].length < this.todoListLength) {
      listItem.listType = ListType.TODO;
      this.listItems['todo'].push(listItem);
      this.listItems['all'] = this.listItems['all'].filter(item => item.id !== listItem.id);
      this.saveList();
    } else {
      this.dragulaService.find('MAIN').drake.cancel(true);
      this.showWarning();
    }
  }

  moveItemToAll(listItem: ListItemModel) {
    listItem.listType = ListType.ALL;
    this.listItems['all'].push(listItem);
    this.listItems['todo'] = this.listItems['todo'].filter(item => item.id !== listItem.id);
    this.saveList();
  }

  markAllItemsAsCompleted() {
    this.listItems['todo'] = [];

  }

  showWarning() {
    this.dialog.open(WarningDialogComponent, {
      width: '300px'
    });
  }

  saveList() {
    if (this.list) {
      this.list.items = this.listItems['todo'];
      this.listService.updateList(this.list);
    } else {
      this.listService.createList(this.listItems['todo']).subscribe((list: ListModel) => {
        this.list = list;
      });
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.dragulaService.destroy('MAIN');
  }
}
