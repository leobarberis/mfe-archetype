import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';

const routes: Routes = [
  {
    path: '<%= route %>/page',
    component: PageComponent,
  },
  {
    path: '<%= route %>',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: '**',
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
