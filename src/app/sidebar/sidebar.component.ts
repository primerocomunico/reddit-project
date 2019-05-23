import { Component, OnInit } from '@angular/core';

//Routing
import { ActivatedRoute } from '@angular/router';

//Service DATA
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public _data:DataService, public _router:ActivatedRoute) { }

  ngOnInit() {
  }

}
