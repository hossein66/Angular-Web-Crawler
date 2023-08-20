import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchUrlComponent } from './components/search-url/search-url.component';

const routes: Routes = [

  {
    path: 'search',
    component: SearchUrlComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrawlerRoutingModule { }
