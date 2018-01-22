import { Component, Input } from '@angular/core';

import { GridOptions } from 'ag-grid/main';
import { resetFakeAsyncZone } from '@angular/core/testing';

const evalColors = { 'high': 'inherit', 'mid': 'brown', 'low': 'red' };

@Component({
    selector: 'app-my-grid-application',
    templateUrl: './my-grid-application.component.html'
})
export class MyGridApplicationComponent {
    @Input() test: any;
    @Input() testParams: any;

    gridOptions: GridOptions;
    columnDefs: any[];

    // evals = [
    //     { from: 18, to: 1000, text: "(18-22) תקין", level: "high" },
    //     { from: 11, to: 17, text: "(11-17) דורש מעקב", level: "mid" },
    //     { from: 0, to: 10, text: "(18-16) לא תקין", level: "low" },
    // ];

    constructor() {
        this.gridOptions = <GridOptions>{};

        this.columnDefs = [
            { headerName: 'שם התלמיד', field: 'studentName' },
            { headerName: 'תאריך המבדק', field: 'testDate' },
            {
                headerName: 'הכרת האלפבית',
                children: [
                    {
                        headerName: 'משימה 1 - קריאת שמות האותיות',
                        children: [
                            { headerName: 'תשובות נכונות', field: 'task1.numCorrect' },
                            {
                                headerName: 'הערכה',
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
                                    return { color: evalColors[params.data.task2a.eval.level] }; }
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
                                    return { color: evalColors[params.data.task2b.eval.level] }; }
                            },
                        ]
                    }
                ]
            }
        ];
    }

    get testRows(): any {
        return this.test ? this.test.results.map((result) => {
            return {
                'studentName': result.studentName,
                'testDate': result.testDate,
                'task1': { numCorrect: result.task1,
                    eval: this.testParams['task1'].evals.find(range => range.from <= result.task1 && range.to >= result.task1) },
                'task2a': { numCorrect: result.task2a,
                    eval: this.testParams['task2a'].evals.find(range => range.from <= result.task2a && range.to >= result.task2a) },
                'task2b': { numCorrect: result.task2b,
                    eval: this.testParams['task2b'].evals.find(range => range.from <= result.task2b && range.to >= result.task2b) }
            };
        }) : [];
    }

    onGridReady(params) {
        params.api.sizeColumnsToFit();
    }

    selectAllRows() {
        this.gridOptions.api.selectAll();
    }
}

