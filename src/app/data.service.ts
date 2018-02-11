import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/find';

declare const require: any;
const _testsData = require('assets/data.json');

@Injectable()
export class DataService {

  data: any = _testsData;
  schools: any[];

  allSchools: AngularFirestoreCollection<any>;

  constructor(db: AngularFirestore) {
    //    this.schools = db.collection('schools').valueChanges();

    this.allSchools = db.collection("schools");
    db.collection("schools").ref.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
      });
    });

    this.allSchools.valueChanges().subscribe(list => {
      this.schools = list
    });
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
