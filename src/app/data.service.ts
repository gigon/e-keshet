import { Injectable } from '@angular/core';

declare const require: any;
const _testsData = require('assets/data.json');

@Injectable()
export class DataService {

  data: any = _testsData;

  constructor() { }

}
