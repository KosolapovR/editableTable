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
import { EditCellComponent } from './components/edit-cell/edit-cell.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    DownloadPageComponent,
    EditTablePageComponent,
    AddModalComponent,
    EditModalComponent,
    EditCellComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    StoreModule.forRoot(reducers),
    FormsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
