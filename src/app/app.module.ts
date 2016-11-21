import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyBDkGuewuKMeGXNBeVEGREjvpgQ7mxsXWI",
  authDomain: "dbsp-firebase-angular2-sample.firebaseapp.com",
  databaseURL: "https://dbsp-firebase-angular2-sample.firebaseio.com",
  storageBucket: "dbsp-firebase-angular2-sample.appspot.com"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
