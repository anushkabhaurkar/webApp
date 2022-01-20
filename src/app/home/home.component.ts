import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common/common.service';
import { MatDialog } from '@angular/material/dialog';
import { CartComponent } from '../cart/cart.component';
import { ContactComponent } from '../contact/contact.component';
import { AboutComponent } from '../about/about.component';
import { AddProductComponent } from '../product/add-product/add-product.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  control = new FormControl();
  types: string[] = ['Products', 'Contact', 'Logout'];
  showFiller = false;
  ImagePath: string;
  constructor(
    public common: CommonService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.ImagePath = '/assets/images/home.jpg';
  }

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(CartComponent);
  }

  logout() {
    this.common.logout();
  }
  product() {
    this.router.navigate(['/product']);
  }
  addProduct() {
    this.dialog.open(AddProductComponent, {
      width: '40%',
      minHeight: 'calc(100vh - 90px)',
      height: '60%',
    });

    // this.router.navigate(['/add-product']);
  }

  call() {
    this.dialog.open(ContactComponent);
  }

  about() {
    this.dialog.open(AboutComponent);
  }
}
