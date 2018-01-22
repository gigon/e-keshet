import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AgGridModule} from 'ag-grid-angular/main';
import {AppComponent} from './app.component';
import {MyGridApplicationComponent} from './my-grid-application/my-grid-application.component';

@NgModule({
    declarations: [
        AppComponent,
        MyGridApplicationComponent        
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AgGridModule.withComponents(
            []
        )
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
