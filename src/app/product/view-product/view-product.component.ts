import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/product';
import { CommonService } from 'src/app/shared/common/common.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit {
  interval: any;
  isAdmin: any = false;
  productList: any;
  active = 0;
  imageArray: Array<object> = [];
  constructor(
    public common: CommonService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.isAdmin = localStorage.getItem('isAdmin');
    console.log(this.isAdmin);
  }

  ngOnInit(): void {
    if (this.data) {
      console.log('popup data', this.data);
      this.data.Image.map((image: any) => {
        //this.imageArray.push(image);
        let imgObj = {
          image: 'data:image/JPEG;base64,' + image,
          thumbImage: 'data:image/JPEG;base64,' + image,
        };

        this.imageArray.push(imgObj);
        console.log(image);
      });
    }
  }

  onTabChange(e: any) {
    console.log(e);
  }
  addCart(product: Product) {
    this.common.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }
}
