import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
    selector: 'child-cell',
    template: `<a class="btn" *ngIf="this.params.value==true" (click)="invokeParentMethod()" [translate]="'columns.toResults'">לתוצאות</a>
        <a class="btn" *ngIf="!this.params.value" (click)="invokeParentMethod()" [translate]="'columns.start'">התחל</a>`,
    styles: [
        `.btn {
            line-height: 0.5;
            font-weight: bold;
        }`
    ]
})
export class GridTestLinkRenderer implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    public invokeParentMethod() {
        console.log('invokeParentMethod ' + `Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`);
        this.params.context.componentParent.onTestClicked(this.params.data);        
    }

    refresh(): boolean {
        return false;
    }
}
