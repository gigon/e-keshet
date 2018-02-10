import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-test-data',
  templateUrl: './test-data.component.html',
  styleUrls: ['./test-data.component.css']
})
export class TestDataComponent implements OnInit {
  data: any;
  schoolName: string;
  className: string = "none";
  studentName: string = "none";
  testName: string = "none";
  testResults: any;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.data = dataService.data;
  }

  ngOnInit() {
    this.getParams();
  }

  getParams(): void {
    this.schoolName = this.route.snapshot.paramMap.get('school');
    this.className = this.route.snapshot.paramMap.get('class');
    this.studentName = this.route.snapshot.paramMap.get('student');
    this.testName = this.route.snapshot.paramMap.get('test');

    let school = this.data.schools.find(school => school.schoolName == this.schoolName);
    let aclass = school.classes.find(aclass => aclass.className == this.className);
    let test = aclass.tests.find(test => test.testName == this.testName);
    this.testResults = test.results.find(result => result.studentName == this.studentName);
  }

}
