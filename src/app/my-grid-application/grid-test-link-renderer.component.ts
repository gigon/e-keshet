import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
    selector: 'child-cell',
//    template: `<a href="http://www.ynet.co.il">{{ params.value }}</a>`,
    template: `<span><button style="height: 18px" (click)="invokeParentMethod()" class="btn btn-info">{{ params.value }}</button></span>`,
    styles: [
        `.btn {
            line-height: 0.5
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
        this.params.context.componentParent.methodFromParent(`Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`)
    }

    refresh(): boolean {
        return false;
    }
}
