import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer, ViewChild} from '@angular/core';
import {ListItem, ListType} from '../../../model/list-item';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html'
})
export class ListItemComponent implements OnInit {

  constructor(private renderer: Renderer) {
  }

  @Input()
  model: ListItem;

  @Output()
  public deleteItem: EventEmitter<ListItem> = new EventEmitter<ListItem>();

  @Output()
  public markAsCompleted: EventEmitter<ListItem> = new EventEmitter<ListItem>();

  @Output()
  public moveToTodoList: EventEmitter<ListItem> = new EventEmitter<ListItem>();

  @ViewChild('inp') inp: ElementRef;

  ngOnInit() {
    if (this.model.isUnderEdit) {
      this.renderer.invokeElementMethod(this.inp.nativeElement, 'focus');
    }
  }

  editField() {
    this.model.isUnderEdit = true;
    this.renderer.invokeElementMethod(this.inp.nativeElement, 'focus');
  }

  saveField() {
    this.model.isUnderEdit = false;
  }



}
