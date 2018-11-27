import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer, ViewChild} from '@angular/core';
import {ListItemModel, ListType} from '../../../model/list-item.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html'
})
export class ListItemComponent implements OnInit {

  constructor(private renderer: Renderer) {
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

  @ViewChild('inp') inp: ElementRef;

  ngOnInit() {
    if (this.model.isUnderEdit) {
      this.renderer.invokeElementMethod(this.inp.nativeElement, 'focus');
    }
  }

  editField() {
    this.model.isUnderEdit = true;
    // for some reason it stopped working without using setTimeout, so I've putted it to the end of actions stack
    setTimeout(() => this.renderer.invokeElementMethod(this.inp.nativeElement, 'focus'), );
  }

  saveField() {
    this.model.isUnderEdit = false;
    this.saveItem.emit(this.model);
  }


}
