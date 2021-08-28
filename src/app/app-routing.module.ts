import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import { SelectionComponent } from './selection/selection.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';

const routes: Routes = [
  {
    path: '',
    component: WatchListComponent,
  },
  {
    path: 'catalog/:movieId',
    component: CatalogComponent,
  },
  {
    path: 'selection',
    component: SelectionComponent,
  },
  {
    path: 'coming-soon',
    component: ComingSoonComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
