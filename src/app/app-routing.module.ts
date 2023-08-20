import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: "home" , component: AppComponent},
  {
    path: "crawler",
    loadChildren: () =>
    import("./modules/crawler/crawler.module").then(
      (m) => m.CrawlerModule
    ),

  },
  { path: "", redirectTo: "crawler", pathMatch: "full" },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
