import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndividualProductComponent } from './components/individualProduct/individualProduct.component';
import { HomeComponent } from './shared/home/home.component';

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
