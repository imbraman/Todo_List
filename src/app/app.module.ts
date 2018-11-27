import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ListComponent} from './components/list/list.component';
import {HeaderComponent} from './components/header/header.component';
import {MatCardModule} from '@angular/material/card';
import {DragulaModule} from 'ng2-dragula';
import {MatIconModule} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {fakeBackendProvider} from './fake-backend';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import { ListItemComponent } from './components/list/list-item/list-item.component';
import {FormsModule} from '@angular/forms';

@NgModule({
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
    MatButtonModule,
    DragulaModule.forRoot()
  ],
  providers: [fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}
