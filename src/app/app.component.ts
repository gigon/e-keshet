import { Injectable, Component, SimpleChanges } from '@angular/core';
import { environment } from '../environments/environment';
import { TranslateService } from '@ngx-translate/core';

declare const require: any;
const _testsData = require('assets/data.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public appVersion: string = environment.version;

  schools: any = _testsData.schools;
  testsParams: any = _testsData.testsParams;

  selectedSchool_: any = null;
  selectedClass_: any = null;
  selectedTest_: any = null;

  selectedTestParams: any = null;
  selLang: string = 'he';

  constructor(public translate: TranslateService) {

    translate.addLangs(['ar','he']);
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('he');
    
    this.changeLang('he');

    var res = this.translate.instant('HOME.HELLO', {value: 'world'});
    console.log('changeLang: ' + res);

    this.selectedSchool = this.schools[0];
  }

  changeLang(lang: string) {
    this.translate.use(lang);
    var res = this.translate.instant('HOME.HELLO', {value: 'world'});
    console.log('changeLang: ' + res);
    this.selLang = lang;
  }

  get selectedSchool(): any {
    return this.selectedSchool_;
  }

  set selectedSchool(val: any) {
    if (val !== this.selectedSchool_) {
      this.selectedSchool_ = val;

      if (this.selectedSchool_ && this.selectedSchool_.classes && this.selectedSchool_.classes.length) {
        this.selectedClass = this.selectedSchool_.classes[0];
      } else {
        this.selectedClass = null;
      }
    }
  }

  get selectedClass(): any {
    return this.selectedClass_;
  }

  set selectedClass(val: any) {
    if (val !== this.selectedClass_) {
      this.selectedClass_ = val;
      if (this.selectedClass_ && this.selectedClass_.tests && this.selectedClass_.tests.length) {
        this.selectedTest = this.selectedClass_.tests[0];
      } else {
        this.selectedTest = null;
      }
    }
  }

  get selectedTest(): any {
    return this.selectedTest_;
  }

  set selectedTest(val: any) {
    if (val !== this.selectedTest_) {
      this.selectedTest_ = val;

      if (this.selectedTest_) {
        this.selectedTestParams = this.testsParams.find(item => item.testName === this.selectedTest_.testName);
      } else {
        this.selectedTestParams = null;
      }
    }
  }

}
