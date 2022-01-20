import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Product } from '../product';
import { CommonService } from '../shared/common/common.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  items: any = [];
  totalPrice: number = 0;
  dataOfCart: any;
  constructor(private common: CommonService) {}

  ngOnInit(): void {
    if (localStorage.getItem('userFormValues') != null) {
      let productList = JSON.parse(localStorage.getItem('userFormValues')!);
      productList.forEach((product: Product) => {
        if (product.cartItem > 0) {
          this.items.push(product);
          this.totalPrice = this.totalPrice + product.cartItem * product.Price;
        }
      });
    }
  }
  add(e: any) {
    let data = e;
    if (localStorage.getItem('userFormValues') != null) {
      let productList = JSON.parse(localStorage.getItem('userFormValues')!);
      productList.forEach((product: any, i: number) => {
        if (
          product.id === data.id &&
          product['Quantity'] > product['cartItem']
        ) {
          product['cartItem']++;
        }
      });
      localStorage.setItem('userFormValues', JSON.stringify(productList));
      this.totalPrice = 0;
      this.items = [];
      productList.forEach((product: Product) => {
        if (product.cartItem > 0) {
          this.items.push(product);
          this.totalPrice = this.totalPrice + product.cartItem * product.Price;
        }
      });
    }

    // this.common.addItems(e, this.items);
    // this.items = this.common.getItems();
  }
  remove(e: any) {
    let data = e;
    if (localStorage.getItem('userFormValues') != null) {
      let productList = JSON.parse(localStorage.getItem('userFormValues')!);

      productList.forEach((product: any, i: number) => {
        if (
          product.id === data.id &&
          product['Quantity'] >= product['cartItem']
        ) {
          product['cartItem']--;

          if (product['cartItem'] == 0) {
            product['isInCart'] = false;
          }
        }
      });
      localStorage.setItem('userFormValues', JSON.stringify(productList));
      this.items = [];
      this.totalPrice = 0;
      productList.forEach((product: Product) => {
        if (product.cartItem > 0) {
          this.items.push(product);
          this.totalPrice = this.totalPrice + product.cartItem * product.Price;
        }
      });
    }
  }

  delet(e: any) {
    if (localStorage.getItem('userFormValues') != null) {
      let productList = JSON.parse(localStorage.getItem('userFormValues')!);
      productList.forEach((product: any, i: number) => {
        if (product.id === e.id) {
          product['cartItem'] = 0;
          product['isInCart'] = false;
        }
      });
      localStorage.setItem('userFormValues', JSON.stringify(productList));
      this.items = [];
      this.totalPrice = 0;
      productList.forEach((product: Product) => {
        if (product.cartItem > 0) {
          this.items.push(product);
          this.totalPrice = this.totalPrice + product.cartItem * product.Price;
        }
      });
    }
  }

  checkout() {
    var checkoutList: Product[] = [];
    if (localStorage.getItem('userFormValues') != null) {
      let productList = JSON.parse(localStorage.getItem('userFormValues')!);
      console.log('product in cart', productList);
      productList.forEach((product: Product) => {
        if (product.cartItem > 0) {
          product.Quantity -= product.cartItem;
          product.isInCart = false;
          checkoutList.push({
            Name: product.Name,
            Quantity: product.Quantity,
            Price: product.Price,
            Description: product.Description,
            id: product.id,
            cartItem: product.cartItem,
            isInCart: product.isInCart,
            isInWish: product.isInWish,
            isWished: product.isWished,
            Image: product.Image,
          });
          product.cartItem = 0;
          this.delet(product);
        }
      });
      localStorage.setItem('checkoutList', JSON.stringify(checkoutList));
      localStorage.setItem('userFormValues', JSON.stringify(productList));
      this.common.getList();
    }
    console.log('checkout list', checkoutList);
    Swal.fire('', 'Order Placed Successfully', 'success');
  }
}
