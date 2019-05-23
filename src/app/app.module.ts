import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PopularComponent } from './popular/popular.component';
import { DetailComponent } from './detail/detail.component';

// Routing
import {Routes, RouterModule} from '@angular/router';
const misRutas: Routes = [
  {'path': 'home', 'component': PopularComponent},
  {'path': 'post/:id', 'component': DetailComponent},
  {'path': ' ', 'component': PopularComponent},
  {'path': '**', 'component': PopularComponent}
]

//Peticiones http
import {HttpClientModule} from '@angular/common/http';

// Service API
import {ApiService} from './services/api.service';
// Service DATA
import {DataService} from './services/data.service';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    PopularComponent,
    DetailComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(misRutas)
  ],
  providers: [ApiService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
