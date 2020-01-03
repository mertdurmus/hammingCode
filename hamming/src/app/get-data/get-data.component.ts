import { Component, OnInit } from '@angular/core';
import { FlaskService } from '../services/flask.service';
import { Data } from '../models/data.model';


@Component({
  selector: 'app-get-data',
  templateUrl: './get-data.component.html',
  styleUrls: ['./get-data.component.css']
})
export class GetDataComponent implements OnInit {

  constructor(private service: FlaskService) { }

  brokenList: any;
  normalList: any;
  index: any;
  index2: any;
  text: string;

  array: object;

  ngOnInit() {
  }
  getHammingList() {
    this.service.getHam().subscribe(data => {
      this.brokenList = data;
      console.log(data);
    });

    this.service.getNormal().subscribe(data => {
      this.normalList = data;
      console.log(data);
    });


    this.service.getIndex().subscribe(data => {
      this.index = data;
      console.log(this.index);
    });
    // console.log(JSON.stringify(this.index));
    // this.index2 = JSON.stringify(this.index);
    }

    getTexxt() {
      this.service.getText().subscribe(data => {
        this.text = data;
        console.log(this.text.toString);
      });
    }
}
/*
    <ul>
      <li *ngFor="let number of index">{{number}}</li>
    </ul>
    */
