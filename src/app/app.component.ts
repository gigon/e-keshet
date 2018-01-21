import { Injectable, Component } from '@angular/core';

declare const require: any;
let _testsData = require("assets/data.json");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = "אלף בית לבית הספר";
  appVersion:string =  "1.0.0";
  schools:any = _testsData;
  selectedSchool:any = null;
  selectedClass:any = null;
  selectedTest:any = null;

  constructor() {
    this.selectedSchool = this.schools[0];
    this.selectedClass = this.selectedSchool.classes[0];
    this.selectedTest = this.selectedClass.tests[0];
  }
}
