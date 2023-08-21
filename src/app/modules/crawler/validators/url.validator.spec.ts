import { TestBed } from "@angular/core/testing";
import { CrawlerService } from "../services/crawler.service";


describe('UrlValidator', () => {
    let service: CrawlerService;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CrawlerService);
      });
    it('https://google.com must return true ', () => {
        expect(service.isValidURL('https://google.com')).toBe(true);
    });
    it('https://google must return false ', () => {
        expect(service.isValidURL('https://google.com')).toBe(false);
    });

});