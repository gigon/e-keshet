import { Injectable, Component, SimpleChanges } from '@angular/core';
import { environment } from '../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public appVersion: string = environment.version;

  constructor(public translate: TranslateService) {

    translate.addLangs(['ar','he']);
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('he');
    
    this.changeLang('he');

    var res = this.translate.instant('HOME.HELLO', {value: 'world'});
    console.log('changeLang: ' + res);
  }

  changeLang(lang: string) {
    this.translate.use(lang);
    var res = this.translate.instant('HOME.HELLO', {value: 'world'});
    console.log('changeLang: ' + res);
  }
}