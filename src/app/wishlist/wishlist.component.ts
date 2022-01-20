import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { CommonService } from '../shared/common/common.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  // items = this.common.getList();
  items: any = [];
  constructor(private common: CommonService) {}

  ngOnInit(): void {
    if (localStorage.getItem('userFormValues') != null) {
      let productList = JSON.parse(localStorage.getItem('userFormValues')!);
      productList.forEach((product: Product) => {
        if (product.isInWish === true) this.items.push(product);
      });
    }
  }
}
