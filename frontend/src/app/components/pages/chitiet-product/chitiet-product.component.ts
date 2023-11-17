import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-chitiet-product',
  templateUrl: './chitiet-product.component.html',
  styleUrls: ['./chitiet-product.component.css']
})
export class ChitietProductComponent implements OnInit {
  result: string = "";
  products: any;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params) => {
      if (params.productId) {
        this.result = params.productId;
        this.productService.getProductByID(params.productId).subscribe((products) => {
          this.products = products;
        });
      }
    });
  }

  ngOnInit(): void {
  
  }
}
