import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DownloadPageComponent } from './download-page/download-page.component';
import { EditTablePageComponent } from './edit-table-page/edit-table-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DownloadPageComponent,
    EditTablePageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
