import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { RouterModule } from '@angular/router';
import { Globals } from './globals';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PagesModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}