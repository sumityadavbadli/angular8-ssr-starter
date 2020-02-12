import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {TestComponent} from './test/test.component';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'test',
    component: TestComponent,
  },

];


@NgModule({
    imports: [RouterModule.forRoot(routes)

    ],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule {
}
