import { Component, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';

import { GridOptions, FrameworkComponentWrapper } from 'ag-grid/main';

import { resetFakeAsyncZone } from '@angular/core/testing';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { GridTestLinkRenderer } from "./grid-test-link-renderer.component";

declare const require: any;
const _localTranslate_he = require('assets/i18n/he.json'),
    _localTranslate_ar = require('assets/i18n/ar.json'),
    _localTranslate = { he: _localTranslate_he, ar: _localTranslate_ar };

const evalColors = { 'high': 'inherit', 'mid': 'brown', 'low': 'red' };

@Component({
    selector: 'app-my-grid-application',
    templateUrl: './my-grid-application.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush    
})
export class MyGridApplicationComponent {
    @Input() class: any;
    @Input() test: any;
    @Input() testParams: any;
    @Input() selLang: string;

    gridOptions: GridOptions;
    columnDefs: any[];
    localeText: any;
    columnsTexts: any;
    context: any;

    constructor(public translate: TranslateService) {
        this.gridOptions = <GridOptions>{};
        this.context = { componentParent: this };

        this.setColumns();

        this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.setColumns();
        });
    }

    get dict(): any {
        return _localTranslate[this.translate.currentLang || 'he'];
    }

    get testRows(): any {
        if (!this.class || !this.class.students) return [];
        else if (!this.test) {
            return this.class.students.map((student) => {
                return {
                    'studentName': student.studentName,
                    'testDate': this.dict.rows["notDoneYet"],
                    'task1': {
                        numCorrect: '',
                        eval: ''
                    },
                    'task2a': {
                        numCorrect: '',
                        eval: ''
                    },
                    'task2b': {
                        numCorrect: '',
                        eval: ''
                    }
                };
            });
        } else {
            return this.class.students.map((student) => {
                let result = this.test.results.find((result) => result.studentName === student.studentName);
                if (result) {
                    return {
                        'studentName': result.studentName,
                        'testDate': result.testDate,
                        'task1': {
                            numCorrect: result.task1,
                            eval: this.testParams['task1'].evals.find(range => range.from <= result.task1 && range.to >= result.task1)
                        },
                        'task2a': {
                            numCorrect: result.task2a,
                            eval: this.testParams['task2a'].evals.find(range => range.from <= result.task2a && range.to >= result.task2a)
                        },
                        'task2b': {
                            numCorrect: result.task2b,
                            eval: this.testParams['task2b'].evals.find(range => range.from <= result.task2b && range.to >= result.task2b)
                        }
                    };
                } else {
                    return {
                        'studentName': student.studentName,
                        'testDate': this.dict.rows["notDoneYet"],
                        'task1': {
                            numCorrect: '',
                            eval: ''
                        },
                        'task2a': {
                            numCorrect: '',
                            eval: ''
                        },
                        'task2b': {
                            numCorrect: '',
                            eval: ''
                        }
                    };
                }
            });
        }
    }

    onGridReady(params) {
        params.api.sizeColumnsToFit();
    }

    methodFromParent(cell) {
        alert("Parent Component Method from " + cell + "!");
    }

    selectAllRows() {
        this.gridOptions.api.selectAll();
    }

    setColumns() {
        this.localeText = _localTranslate_he.grid;
        this.columnsTexts = _localTranslate_he.columns;

        this.columnDefs = [
            { headerName: this.dict.columns['studentName'], field: 'studentName' },
            { headerName: this.dict.columns['testDate'], field: 'testDate' },
            { headerName: this.dict.columns['gotoTest'], field: 'testDate', cellRendererFramework: GridTestLinkRenderer },
            {
                headerName: this.dict.columns['knowABC'],
                children: [
                    {
                        headerName: this.dict.columns['readABC'],
                        children: [
                            { headerName: this.dict.columns['task1.numCorrect'], field: 'task1.numCorrect' },
                            {
                                headerName: this.dict.columns['task1.eval.text'],
                                field: 'task1.eval.text',
                                cellStyle: function (params) { return { color: evalColors[params.data.task1.eval.level] }; }
                            }
                        ]
                    }
                ]
            },
            {
                headerName: 'מודעות פונולוגית',
                children: [
                    {
                        headerName: 'משימה 2א - עיצור פותח',
                        children: [
                            { headerName: 'תשובות נכונות', field: 'task2a.numCorrect' },
                            {
                                headerName: 'הערכה',
                                field: 'task2a.eval.text',
                                cellStyle: function (params) {
                                    return { color: evalColors[params.data.task2a.eval.level] };
                                }
                            },
                        ]
                    },
                    {
                        headerName: 'משימה 2ב - עיצור סוגר',
                        children: [
                            { headerName: 'תשובות נכונות', field: 'task2b.numCorrect' },
                            {
                                headerName: 'הערכה',
                                field: 'task2b.eval.text',
                                cellStyle: function (params) {
                                    return { color: evalColors[params.data.task2b.eval.level] };
                                }
                            },
                        ]
                    }
                ]
            }
        ];
    }
}
