import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer, ViewChild} from '@angular/core';
import {ListItemModel, ListType} from '../../../model/list-item.model';
import {Subject, Subscription, timer} from 'rxjs';
import {debounce, debounceTime, throttleTime} from 'rxjs/operators';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html'
})
export class ListItemComponent implements OnInit, OnDestroy {

  constructor(private renderer: Renderer) {
    this.subs.add(this.markAsCompletedDebouncer.pipe(
      debounceTime(500)
    ).subscribe(
      (value) => {
        this.markAsCompleted.emit(value);
      },
      (error) => {
        console.log(error);
      }
    ))
      .add(this.deleteItemDebouncer.pipe(
        debounceTime(100)
      ).subscribe(
        (value) => {
          this.deleteItem.emit(value);
        },
        (error) => {
          console.log(error);
        }
      ));
  }


  @Input()
  model: ListItemModel;

  @Output()
  public deleteItem: EventEmitter<ListItemModel> = new EventEmitter<ListItemModel>();

  @Output()
  public saveItem: EventEmitter<ListItemModel> = new EventEmitter<ListItemModel>();

  @Output()
  public markAsCompleted: EventEmitter<ListItemModel> = new EventEmitter<ListItemModel>();

  @Output()
  public moveToTodoList: EventEmitter<ListItemModel> = new EventEmitter<ListItemModel>();

  deleteItemDebouncer = new Subject<ListItemModel>();

  markAsCompletedDebouncer = new Subject<ListItemModel>();

  subs = new Subscription();

  @ViewChild('inp')
  set inp(inp: ElementRef) {
    if (inp && inp.nativeElement) {
      // we are moving it to the end of stack, because otherwise it works but throws error in console
      setTimeout(() => inp.nativeElement.focus());
    }
  }

  ngOnInit() {
  }

  editField() {
    this.model.isUnderEdit = true;
  }

  saveField() {
    this.model.isUnderEdit = false;
    this.saveItem.emit(this.model);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
