import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrawlerRoutingModule } from './crawler-routing.module';
import { SharedModule } from './shared/shared.module';
import { SearchUrlComponent } from './components/search-url/search-url.component';
import { CrawleredListComponent } from './components/crawlered-list/crawlered-list.component';


@NgModule({
  declarations: [
    SearchUrlComponent,
    CrawleredListComponent
  ],
  imports: [
    CommonModule, 
    SharedModule,
    CrawlerRoutingModule
  ]
})
export class CrawlerModule { }
