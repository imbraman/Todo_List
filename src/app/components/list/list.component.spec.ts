import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListComponent} from './list.component';
import {ListService} from "../../services/list.service";
import {fakeBackendProvider} from "../../services/fake-backend";
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatTabsModule
} from "@angular/material";
import {ListItemComponent} from "./list-item/list-item.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {DragulaService} from "ng2-dragula";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent, ListItemComponent],
      imports: [
        HttpClientModule,
        MatIconModule,
        MatTabsModule,MatInputModule,
        MatRadioModule,
        MatButtonModule,
        BrowserModule,
        MatCardModule,
        MatIconModule,
        BrowserAnimationsModule,
        FormsModule],
      providers: [ListService, fakeBackendProvider, DragulaService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
