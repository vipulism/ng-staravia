import { BlogComponent } from './blog/blog.component';
import { ProductComponent } from './product/product.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'about', component:AboutComponent},
  {path:'contact', component:ContactComponent},
  {path:'product-and-services', component:ProductComponent},
  {path:'blog', component:BlogComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false
  })
  ],
  declarations: [],
  exports:[RouterModule]
})
export class AppRoutingModule { }
