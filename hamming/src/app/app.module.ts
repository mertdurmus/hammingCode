import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SenDataComponent } from './sen-data/sen-data.component';
import { GetDataComponent } from './get-data/get-data.component';
import { HttpClientModule } from '@angular/common/http';
import { FlaskService } from './services/flask.service';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SenDataComponent,
    GetDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FlaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
