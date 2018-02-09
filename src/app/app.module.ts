import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { AgGridModule } from 'ag-grid-angular/main';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent }   from './not-found.component';
import { ClassTestComponent } from './class-test.component';
import { GridTestLinkRenderer } from './my-grid-application/grid-test-link-renderer.component';
import { MyGridApplicationComponent } from './my-grid-application/my-grid-application.component';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { DashboardComponent } from './dashboard/dashboard.component';
//import { Observable } from "rxjs/Observable"; 

// declare const require: any;
// const _localTranslate_he = require('assets/i18n/he.json'),
//       _localTranslate_ar = require('assets/i18n/ar.json'),
//       _locals = { he: _localTranslate_he, ar: _localTranslate_ar };

export function createHomeTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// class CustomLoader implements TranslateLoader {
//     getTranslation(lang: string): any {
//         return Observable.of(_locals['he']);
//     }
// }

const appRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent }, 
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },      
    { path: 'test', component: PageNotFoundComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    declarations: [
        PageNotFoundComponent,
        AppComponent,
        ClassTestComponent,
        GridTestLinkRenderer,
        MyGridApplicationComponent,
        DashboardComponent
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // <-- debugging purposes only
        ),
        BrowserModule,
        FormsModule,
        HttpModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createHomeTranslateLoader,
                deps: [Http]
            }
        }),
        AgGridModule.withComponents(
            [GridTestLinkRenderer]
        )
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule {
}
