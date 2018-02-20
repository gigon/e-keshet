import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-test-data',
  templateUrl: './test-data.component.html',
  styleUrls: ['./test-data.component.css']
})
export class TestDataComponent implements OnInit {
  allData$: Observable<any[]>;
  data: any[];

  schoolName: string;
  className: string = "none";
  studentName: string = "none";
  testName: string = "none";
  testResults: Observable<any>;

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getParams();

    this.allData$ = this.db.list('/schools').snapshotChanges();
    this.allData$.subscribe(queriedItems => {
      console.log(queriedItems);  
      let school = queriedItems.find(i => i.payload.toJSON()['schoolName'] == this.schoolName).payload.toJSON();
      this.testResults = this.findTestResults(school, this.className, this.studentName,this.testName);
    });
  }

  getParams(): void {
    this.schoolName = this.route.snapshot.paramMap.get('school');
    this.className = this.route.snapshot.paramMap.get('class');
    this.studentName = this.route.snapshot.paramMap.get('student');
    this.testName = this.route.snapshot.paramMap.get('test');
  }
  
  private obj2Array(obj) {
    return Object.entries(obj).map(e => Object.assign(e[1], { key: e[0] }));
  }

  public findTestResults(school: any, className: string, studentName: string, testName: string): any {
    if (!school)
      return null;
    let aclass = this.obj2Array(school.classes).find(aclass => aclass.className == className);
    let test = this.obj2Array(aclass.tests).find(test => test.testName == testName);
    let testResults = this.obj2Array(test.results).find(result => result.studentName == studentName);

    testResults.task1.wrong = this.obj2Array(testResults.task1.wrong);
    testResults.task2a.wrong = this.obj2Array(testResults.task2a.wrong);
    testResults.task2b.wrong = this.obj2Array(testResults.task2b.wrong);

    return testResults;
  }

}
