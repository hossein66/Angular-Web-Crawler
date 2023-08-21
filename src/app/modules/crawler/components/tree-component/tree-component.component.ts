import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { LinkCrawlered } from '../../models/link-crawlered';
import { LinkNode } from '../../models/link-node';
import { CrawlerService } from '../../services/crawler.service';

@Component({
  selector: 'app-tree-component',
  templateUrl: './tree-component.component.html',
  styleUrls: ['./tree-component.component.css']
})
export class TreeComponentComponent implements OnInit {
  curentCrawlerLink:LinkCrawlered;
  treeControl = new NestedTreeControl<LinkNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<LinkNode>();
   TREE_DATA: LinkNode[]
  constructor(private crawlerService:CrawlerService,private router:Router) {
    this.curentCrawlerLink=this.router.getCurrentNavigation()?.extras.state as LinkCrawlered;
  }

  hasChild = (_: number, node: LinkNode) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
    this.dataSource.data =this.crawlerService.getAllTreeNode(this.curentCrawlerLink.Url);

  }


}
