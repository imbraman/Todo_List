import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';
import {MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatRadioModule} from "@angular/material";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItemComponent ],
      imports:[ MatInputModule,
        MatRadioModule,
        MatButtonModule,
        BrowserModule,
        MatCardModule,
        MatIconModule,
        FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
