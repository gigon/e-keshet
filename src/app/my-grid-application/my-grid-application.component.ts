import { Component,  Input } from "@angular/core";
import { RedComponentComponent } from "../red-component/red-component.component";

import { GridOptions } from "ag-grid/main";

declare const require: any;
let _testsData = require("assets/data.json")[0].classes[0].test1;

@Component({
    selector: 'app-my-grid-application',
    templateUrl: './my-grid-application.component.html'
})
export class MyGridApplicationComponent {
    @Input() test: any;
    
    gridOptions: GridOptions;
    columnDefs: any[]

    constructor() {
        this.gridOptions = <GridOptions>{};

        this.columnDefs = [
            { headerName: "שם התלמיד", field: "studentName" },
            { headerName: "תאריך המבדק", field: "testDate" },
            {
                headerName: "הכרת האלפבית",
                children: [
                    { headerName: "משימה 1 - קריאת שמות האותיות", field: "task1", cellRendererFramework: RedComponentComponent }
                ]
            },
            {
                headerName: "מודעות פונולוגית",
                children: [
                    { headerName: "משימה 2א - עיצור פותח", field: "task2a", cellRendererFramework: RedComponentComponent },
                    { headerName: "משימה 2ב - עיצור סוגר", field: "task2b", cellRendererFramework: RedComponentComponent }
                ]
            }
        ];
    }

    onGridReady(params) {
        params.api.sizeColumnsToFit();
    }

    selectAllRows() {
        this.gridOptions.api.selectAll();
    }
}

