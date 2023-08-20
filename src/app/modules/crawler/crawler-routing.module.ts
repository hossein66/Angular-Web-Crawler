import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrawleredListComponent } from './components/crawlered-list/crawlered-list.component';
import { SearchUrlComponent } from './components/search-url/search-url.component';
import { TreeComponentComponent } from './components/tree-component/tree-component.component';

const routes: Routes = [
  {
    path: '',
    component: CrawleredListComponent
  },
  {
    path: 'search',
    component: SearchUrlComponent
  },
  {
    path: 'tree',
    component: TreeComponentComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrawlerRoutingModule { }
