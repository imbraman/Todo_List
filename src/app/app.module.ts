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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {ListItemComponent} from './components/list/list-item/list-item.component';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {WarningDialogComponent} from './components/list/dialogs/warning-dialog/warning-dialog.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {RequestInterceptor} from './services/request-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    HeaderComponent,
    WarningDialogComponent,
    ListItemComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
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
    MatDialogModule,
    MatTooltipModule,
    DragulaModule.forRoot()
  ],
  entryComponents: [WarningDialogComponent],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
