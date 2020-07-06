import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { DownloadPageComponent } from './download-page/download-page.component';
import { EditTablePageComponent } from './edit-table-page/edit-table-page.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from './state';


@NgModule({
  declarations: [
    AppComponent,
    DownloadPageComponent,
    EditTablePageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
