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

  selectedSizePrice: number = 0; // Biến lưu trữ giá của size được chọn
  selectedToppingPrice: number = 0; // Biến lưu trữ giá của topping được chọn

  // Các hàm để cập nhật giá khi size hoặc topping được chọn
  selectSize(sizePrice: number) {
    this.selectedSizePrice = sizePrice;
  }

  selectTopping(toppingPrice: number) {
    this.selectedToppingPrice = toppingPrice;
  }

  showgiaSize(){
    return this.selectedSizePrice;
  }
  
  showgiaTopping(){
    return this.selectedToppingPrice;
  }

  // Hàm tính tổng giá
  calculateTotalPrice() {
    return this.selectedSizePrice + this.selectedToppingPrice;
  }
}
