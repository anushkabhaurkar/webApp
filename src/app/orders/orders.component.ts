import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { CommonService } from '../shared/common/common.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orderList: any = [];
  totalPrice!: any;
  constructor(public common: CommonService) {}

  ngOnInit(): void {
    this._getOrders();
  }
  private _getOrders() {
    this.orderList = JSON.parse(localStorage.getItem('checkoutList') || '{}');
    this.orderList.forEach((product: Product) => {
      //this.items.push(product);
      this.totalPrice = product.cartItem * product.Price;
      console.log('price', this.totalPrice);
    });
  }
}
