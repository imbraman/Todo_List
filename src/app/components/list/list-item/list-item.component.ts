import {Component, ElementRef, Input, OnInit, Renderer, ViewChild} from '@angular/core';
import {ListItem} from '../../../model/list-item';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html'
})
export class ListItemComponent implements OnInit {

  constructor(private renderer: Renderer) {
  }

  @Input()
  model: ListItem;


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
