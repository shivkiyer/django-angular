import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NewCompanyComponent } from './new-company/new-company.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/new-company', pathMatch: 'full' },
  { path: 'new-company', component: NewCompanyComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
