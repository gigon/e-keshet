import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-data',
  templateUrl: './test-data.component.html',
  styleUrls: ['./test-data.component.css']
})
export class TestDataComponent implements OnInit {
  schoolName: string;
  className: string = "none";
  studentName: string = "none";
  testName: string = "none";
  test: any;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getParams();
  }

  getParams(): void {
    this.schoolName = this.route.snapshot.paramMap.get('school');
    this.className = this.route.snapshot.paramMap.get('class');
    this.studentName = this.route.snapshot.paramMap.get('student');
    this.testName = this.route.snapshot.paramMap.get('test');
  }

}
