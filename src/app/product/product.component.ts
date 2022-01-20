import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartComponent } from '../cart/cart.component';
import { CommonService } from '../shared/common/common.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from './add-product/add-product.component';
import { ConnectableObservable } from 'rxjs';
import { InputModalityDetector } from '@angular/cdk/a11y';
import { User } from 'src/models/user';
import { Product } from '../product';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { ViewProductComponent } from './view-product/view-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productList: any;
  isWished: any = 'darkgray';
  isAdmin: any = false;
  value: any;
  wishlistList: any = [];
  @Input() products: any = [];
  constructor(
    public common: CommonService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.isAdmin = localStorage.getItem('isAdmin');
    console.log(this.isAdmin);
  }

  ngOnInit(): void {
    this._getProducts();
    if (localStorage.getItem('userFormValues') != null) {
      this.productList = JSON.parse(localStorage.getItem('userFormValues')!);
    }
  }
  displayedColumns: string[] = [];

  applyFilter(event: any) {
    var search = event.target.value;

    this.productList =
      search == ''
        ? (this.productList = JSON.parse(
            localStorage.getItem('userFormValues') || '{}'
          ))
        : this.productList.filter((product: any) => {
            return product.Name.toLocaleLowerCase().match(
              search.toLocaleLowerCase()
            );
          });
  }
  private _getProducts() {
    this.productList = JSON.parse(
      localStorage.getItem('userFormValues') || '{}'
    );
  }

  addCart(product: Product) {
    this.common.addToCart(product);
    Swal.fire('', 'Your product has been added to CART..!', 'success');
  }

  wishlist(product: any) {
    console.log('product', product);
    // this.common.addToWishList(product);
    if (localStorage.getItem('userFormValues') != null) {
      let productList = JSON.parse(localStorage.getItem('userFormValues')!);
      // Swal.fire('', 'Your product has been added to Wislist..!', 'success');
      productList.find((record: any, j: number) => {
        if (record.id === product.id) {
          record['isWished'] =
            record['isWished'] == 'darkgray' ? 'red' : 'darkgray';
          record['isInWish'] = record['isInWish'] == false ? true : false;
          // console.log('line 80', product['isInWish']);
        }
      });
      localStorage.setItem('userFormValues', JSON.stringify(productList));
      this.wishlistList = this.common.addWishlist(productList);
      this.productList = productList;
      // Swal.fire('', 'Your product has been added to Wislist..!', 'success');
    }
  }

  orders() {
    this.router.navigate(['/order']);
  }

  openWishlist() {
    this.dialog.open(WishlistComponent);
  }

  openModel(product: any) {
    this.dialog.open(ViewProductComponent, {
      width: '30%',
      minHeight: 'calc(100vh - 90px)',
      data: product,
    });
  }

  updateProduct(value: any) {
    this.dialog.open(AddProductComponent, {
      width: '40%',
      minHeight: 'calc(100vh - 90px)',
      height: 'auto',
      data: value,
    });
  }
  deleteProduct(id: any) {
    console.log(id);

    let index = this.productList.findIndex((e: any) => e.id === id);
    console.log(index);
    if (index !== -1) {
      this.productList.splice(index, 1);
    }
    localStorage.setItem('userFormValues', JSON.stringify(this.productList));
  }
  openDialog() {
    this.dialog.open(CartComponent);
  }
}
