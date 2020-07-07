import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {DownloadPageComponent} from './download-page/download-page.component';
import {EditTablePageComponent} from './edit-table-page/edit-table-page.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from './state';
import {AddModalComponent} from './components/add-modal/add-modal.component';
import {EditModalComponent} from './components/edit-modal/edit-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    DownloadPageComponent,
    EditTablePageComponent,
    AddModalComponent,
    EditModalComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    StoreModule.forRoot(reducers),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
