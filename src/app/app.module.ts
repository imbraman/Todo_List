import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ListComponent} from './components/list/list.component';
import {HeaderComponent} from './components/header/header.component';
import {MatCardModule} from '@angular/material/card';
import {DragulaModule} from 'ng2-dragula';
import {MatIconModule} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {fakeBackendProvider} from './fake-backend';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    HeaderComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    DragulaModule.forRoot()
  ],
  providers: [fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}
