import { TestBed } from '@angular/core/testing';

import { CrawlerService } from './crawler.service';
const mock = {
  domainWithAtleast20Node:'https://emdadsaipa.ir',

};
describe('CrawlerService', () => {
  let service: CrawlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrawlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
