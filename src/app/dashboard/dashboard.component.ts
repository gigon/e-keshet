import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DataService } from '../data.service';

declare const require: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selLang: string = 'he';

  schools: any;
  testsParams: any;

  selectedSchool_: any = null;
  selectedClass_: any = null;
  selectedTest_: any = null;

  selectedTestParams: any = null;

  constructor(private dataService: DataService, public translate: TranslateService) {
    this.schools = dataService.data.schools;
    this.testsParams = dataService.data.testsParams;

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.selLang = event.lang;
    });
    this.selectedSchool = this.schools[0];
  }

  ngOnInit() {
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
