import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, retry } from 'rxjs';
import { LinkCrawlered } from '../models/link-crawlered';
import { LinkNode } from '../models/link-node';
@Injectable({
  providedIn: 'root'
})

export class CrawlerService {
  getDomains(): LinkCrawlered[] {
   return this.linkCrawleredList.filter(s=>s.Deep==0 && s.Parent_url==null);
  }
  corsProxyServer: string = "https://corsproxy.io/?";
  linkCrawleredList: LinkCrawlered[] = [];
  linkTreeList: LinkNode[] = [];
  maxDeep!: number;
  constructor(private httpClient: HttpClient) { }

  search(url: string, deep: number) {
    this.linkCrawleredList = [];
    this.maxDeep = deep;
    this.crawler(url, deep);

  }
  crawler(url: string, deep: number) {
    const deepLevel = this.maxDeep - deep;
    this.getHtmlFromUrl(url).subscribe(
      htmlContent => {
        let documentFragment = new DOMParser().parseFromString(htmlContent, "text/html");
        this.createNode(deepLevel, null, documentFragment.title, url);
        let links = documentFragment.getElementsByTagName('a');
        for (let index = 0; index < links.length; index++) {
          const linkTitle = links[index].text.trim();
          const linkHref = links[index].getAttribute("href") || '';
          if (this.isValidURL(linkHref) && linkHref.search('141.ir') < 0) {
            this.createNode(deepLevel, url, linkTitle, linkHref)
          }
        }
        const childNode = this.linkCrawleredList.filter(s => s.Parent_url == url && !this.isCircleLink(s.Url, s.Parent_url));
        for (let index = 0; index < childNode.length; index++) {
          const element = childNode[index]?.Url;
          if (deep > 0 && element != undefined) {
            this.crawler(element, deep - 1);
          }
          else {
            return;
          }
        }
        console.log('ss', this.linkCrawleredList);
      }
    );
  }
  createNode(deepLevel: number, parent: string | null, title: string, url: string, linkStatus: string = 'success') {
    const node: LinkCrawlered = { Deep: deepLevel, Parent_url: parent, Title: title, Url: url, LinkStatus: linkStatus }
    this.linkCrawleredList.push(node);
  }
  isCircleLink(url: string, parent_url: string | null): boolean {
    url = url.replace(/\/$/, "");
    var oldParent = this.linkCrawleredList.find(s => s.Parent_url?.replace(/\/$/, "") == url || s.Parent_url?.replace('https', 'http') == url);
    if (url == parent_url || oldParent) {
      return true;
    }
    return false;
  }
  isValidURL(urlInput: string | null) {
    var res = urlInput?.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };

  getHtmlFromUrl(url: string): Observable<any> {
    try {
      return this.httpClient.get(this.corsProxyServer + url, { responseType: "text" }).pipe(catchError(this.handleError(url)));

    } catch (error) {
      console.log('error')
      return of(null);
    }
  }
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead
      this.logErrorInUrl(operation, error.message);
      // TODO: better job of transforming error for user consumption
      // console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  logErrorInUrl(operation: string, message: any) {
    this.linkCrawleredList.filter(s => s.Url == operation).forEach(element => {
      element.LinkStatus = message;
    })
  }
  getTreeDate(){
    const parentLevel1=this.linkCrawleredList.filter(s=>s.Deep==0 && s.Parent_url == null);
    for (let index = 0; index < parentLevel1.length; index++) {
      const node = parentLevel1[index];
      this.getChild(node);
    }
  }
  getChild(node: LinkCrawlered):LinkNode[] {
   
    console.log('dsdsd',node.Url)

    // for (let index = 0; index < child.length; index++) {
    //   const element = child[index];
    //   this.getChild(element);
    // }
    this.linkTreeList=this.getChild2(node.Url);
    console.log('this.linkTreeList',this.linkTreeList);
     return this.linkTreeList;
  }
  getChild2( parent:string):LinkNode[] {
    const child=this.linkCrawleredList.filter(s=>s.Parent_url != null && s.Parent_url==parent)
    if (!child ) {
      return  [{name:parent,children:undefined}] as LinkNode[];
    }
    else{
      if (child && child.length>0) {
        for (let index = 0; index < child.length; index++) {
          const element = child[index];
          return [{name:parent,children:this.getChild2(element.Url)}] as LinkNode[];     
        }
      }
      return [{name:parent,children:undefined}] as LinkNode[];;

  }
  }


}
