import { Component, OnInit } from '@angular/core';

//Routing
import { ActivatedRoute } from '@angular/router';

// Service DATA
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  id:number;
  sub: any;

  constructor(public _data:DataService, public _router:ActivatedRoute) { }

  ngOnInit() {
    this.sub = this._router.params.subscribe(
       (params) => {this.id = params['id']}
     );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
