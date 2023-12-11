
import { CommonModule } from '@angular/common'; 
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreComponent } from './store.component';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    StoreComponent,
  ],
  imports: [
    CommonModule, 
    NgbCarouselModule,
    MatIconModule,
    NgxPaginationModule
  ],
  exports: [
    StoreComponent,
  ],
})
export class StoreModule {
}
