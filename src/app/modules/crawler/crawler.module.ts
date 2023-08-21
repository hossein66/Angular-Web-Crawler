import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrawlerRoutingModule } from './crawler-routing.module';
import { SharedModule } from './shared/shared.module';
import { SearchUrlComponent } from './components/search-url/search-url.component';
import { CrawleredListComponent } from './components/crawlered-list/crawlered-list.component';
import { TreeComponentComponent } from './components/tree-component/tree-component.component';


@NgModule({
  declarations: [
    SearchUrlComponent,
    CrawleredListComponent,
    TreeComponentComponent
  ],
  imports: [
    CommonModule, 
    SharedModule,
    CrawlerRoutingModule
  ]
})
export class CrawlerModule { }
