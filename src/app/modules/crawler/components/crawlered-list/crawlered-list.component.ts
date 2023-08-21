import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LinkCrawlered } from '../../models/link-crawlered';
import { CrawlerService } from '../../services/crawler.service';

@Component({
  selector: 'app-crawlered-list',
  templateUrl: './crawlered-list.component.html',
  styleUrls: ['./crawlered-list.component.css']
})
export class CrawleredListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('select') select: MatSelect;
  allSelected = false;
  value='';
  dataSource = new MatTableDataSource<LinkCrawlered>();

  visibleColumns = [

    {
      columnDef: 'Title',
      header: 'Title',
      cell: (element: any) => `${element.Title}`,
      show: true,
    },
    {
      columnDef: 'Url',
      header: 'Url',
      cell: (element: any) => `${element.Url}`,
      show: true,
    },
    {
      columnDef: 'Deep',
      header: 'Deep',
      cell: (element: any) => `${element.Deep}`,
      show: false,
    },
    {
      columnDef: 'action',
      header: 'Add',
      cell: (element: any) =>`ds`,
      show: true,
    },

  ];
  get columns() {
    return this.visibleColumns;
  }

  get displayedColumns(): string[] {
    return this.visibleColumns.map((c) => c.columnDef);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  constructor(private crawlerService:CrawlerService) { }

  ngOnInit() {

    this.dataSource.data = this.crawlerService.getDomains();

}

ngAfterViewInit() {
this.dataSource.paginator = this.paginator;
this.dataSource.sort = this.sort;
}

}
