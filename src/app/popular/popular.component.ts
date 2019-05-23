import { Component, OnInit } from '@angular/core';

// Service DATA
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {

  constructor(public _data:DataService) { }

  ngOnInit() {
  }

}
