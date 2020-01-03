import { Component, OnInit } from '@angular/core';
import { FlaskService } from '../services/flask.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sen-data',
  templateUrl: './sen-data.component.html',
  styleUrls: ['./sen-data.component.css']
})
export class SenDataComponent implements OnInit {

  constructor(private service: FlaskService, private formBuilder: FormBuilder, private router: Router) { }
  text: string;
  textForm: FormGroup;
  showMsg;

  createForm() {

    this.textForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }


  add() {
    this.text = Object.assign({}, this.textForm.value);
    this.service.addText(this.text).subscribe(
      data => {
        console.log(data);
        this.showMsg = true;
        this.createForm();
        setTimeout(() => {this.showMsg = false; this.router.navigate(['get']); }, 2500);
      },
      error => console.log(error));
  }
  ngOnInit() {
    this.createForm();
  }

}
