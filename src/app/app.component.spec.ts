import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {ListComponent} from "./components/list/list.component";
import {HeaderComponent} from "./components/header/header.component";
import {ListItemComponent} from "./components/list/list-item/list-item.component";
import {ListService} from "./services/list.service";
import {fakeBackendProvider} from "./services/fake-backend";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {MatTooltipModule} from '@angular/material/tooltip';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatTabsModule
} from "@angular/material";
import {DragulaModule} from "ng2-dragula";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ListComponent,
        HeaderComponent,
        ListItemComponent
      ],
      imports: [
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        BrowserModule,
        MatCardModule,
        MatIconModule,
        MatTabsModule,
        MatInputModule,
        MatRadioModule,
        MatButtonModule,
        MatTooltipModule,
        MatDialogModule,
        MatTooltipModule,
        DragulaModule.forRoot()
      ],
      providers: [ListService, fakeBackendProvider],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
