import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from '../../product';
import Swal from 'sweetalert2';
declare let window: any;

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  addForm!: FormGroup;
  imageList: any = [];
  base64textString: any = [];
  url: any;
  msg = '';
  frame: any;
  quantity = '^[1-9][0-9]*(.[0-9]+)?|0+.[0-9]*[1-9][0-9]*$';
  name = '^[a-zA-Z].*';
  isSave: any = 'Submit';
  addProduct: any = 'Add Product';
  arrayImage: any = [];
  constructor(
    private dialogRef: MatDialogRef<AddProductComponent>,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  ngOnInit(): void {
    this.init();
    console.log('update data', this.data);
    if (this.data) {
      this.isSave = 'Update';
      this.addProduct = 'Update Product';
      this.imageList = this.data.Image;
      console.log('imageList', this.imageList);
      this.addForm.patchValue({
        Name: this.data.Name,
        Quantity: this.data.Quantity,
        Price: this.data.Price,
        Description: this.data.Description,
        id: this.data.id,
        cartItem: this.data.cartItem,
        isInCart: this.data.isInCart,
        isInWish: this.data.isInWish,
        isWished: this.data.isWished,
      });
    }
  }

  init() {
    this.addForm = new FormGroup({
      id: new FormControl(''),
      Name: new FormControl('', [
        Validators.required,
        Validators.pattern(this.name),
      ]),
      Quantity: new FormControl('', [
        Validators.required,
        Validators.pattern(this.quantity),
      ]),
      Price: new FormControl('', [
        Validators.required,
        Validators.pattern(this.quantity),
      ]),
      Description: new FormControl('', [
        Validators.required,
        Validators.pattern(this.name),
      ]),
      Image: new FormControl('', [Validators.required]),
      isWished: new FormControl('darkgray'),
      cartItem: new FormControl(0),
      isInCart: new FormControl(false),
      isInWish: new FormControl(false),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addForm.controls[controlName].hasError(errorName);
  };

  selectFile(event: any) {
    //Angular 11, for stricter type

    var files = event.target.files;
    console.log('dhsj', files);
    this.base64textString = [];
    for (let i = 0; i <= files.length; i++) {
      var file = files[i];

      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.base64textString.push(btoa(binaryString));
    console.log(btoa(binaryString));
  }

  addRecord(productList: any) {
    this.addForm.controls['Image'].setValue(this.base64textString);
    var length = productList.length + 1;

    this.addForm.controls['id'].setValue(length);
    productList.push(this.addForm.value);
    localStorage.setItem('userFormValues', JSON.stringify(productList));
    Swal.fire('', 'Product added Successfully', 'success');
    this.closeMe();
    this.router.navigate(['/product']);
  }

  submit() {
    var productList = [];

    productList = JSON.parse(localStorage.getItem('userFormValues') || '[]');
    if (this.data) {
      this.editRecord(productList);
    } else {
      this.addRecord(productList);
    }
  }

  editRecord(productList: any) {
    productList.forEach((record: any, i: number) => {
      if (record.id === this.addForm.value.id) {
        console.log('product list', productList[i]);

        productList[i] = {
          Name: this.addForm.value.Name,
          Quantity: this.addForm.value.Quantity,
          Price: this.addForm.value.Price,
          Description: this.addForm.value.Description,
          Image: this.addForm.value.Image
            ? this.addForm.value.Image
            : this.imageList,
          id: record.id,
          cartItem: this.addForm.value.cartItem,
          isInCart: this.addForm.value.isInCart,
          isInWish: this.addForm.value.isInWish,
          isWished: this.addForm.value.isWished,
        };
      }
    });
    localStorage.setItem('userFormValues', JSON.stringify(productList));
    Swal.fire('', 'Product updated Successfully', 'success');
    this.closeMe();
    this.router.navigate(['/product']);
  }

  public closeMe() {
    this.dialogRef.close();
  }
}
