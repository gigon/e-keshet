import { Injectable } from '@angular/core';

declare const require: any;
const _testsData = require('assets/data.json');

@Injectable()
export class DataService {

  data: any = _testsData;
  schools: any[];

  constructor() {
  }

  public findTestResults(schoolName: string, className: string, studentName: string, testName: string): any {

    if (!this.schools)
      return null;
    let school = this.schools.find(school => school['schoolName'] == schoolName);
    let aclass = school['classes'].find(aclass => aclass.className == className);
    let test = aclass.tests.find(test => test.testName == testName);
    let testResults = test.results.find(result => result.studentName == studentName);
    return testResults;
  }
}
