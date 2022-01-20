import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/product';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  items: Product[] = [];
  item: Product[] = [];
  private isloggedIn: boolean;
  constructor(private http: HttpClient, private router: Router) {
    this.isloggedIn = false;
  }
  login(data: any): Observable<any> {
    this.isloggedIn = true;
    console.log(data);
    return this.http.post(`${baseUrl}users/login`, data);
  }
  logout() {
    this.isloggedIn = false;
    localStorage.removeItem('Token');
    this.router.navigate(['/']);
  }

  isAdminUser(): boolean {
    let isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin == 'true') {
      return true;
    }
    return false;
  }

  registration(data: any) {
    console.log('data', data);
    return this.http.post(`${baseUrl}users/post`, data);
  }

  getUser() {
    return this.http.get(`${baseUrl}users/`);
  }
  isUserLoggedIn(): boolean {
    return this.isloggedIn;
  }
  // getProducts() {
  //   return this.http.get(`${baseUrl}/products`);
  // }

  // createProduct(productData: FormData) {
  //   return this.http.post(`${baseUrl}/products`, productData);
  // }

  // getProduct(productId: string) {
  //   return this.http.get(`${baseUrl}/${productId}`);
  // }

  // updateProduct(productData: FormData, productid: string) {
  //   return this.http.put(`${baseUrl}/${productid}`, productData);
  // }

  // deleteProduct(productId: string): Observable<any> {
  //   return this.http.delete<any>(`${baseUrl}/${productId}`);
  // }

  addToCart(data: any) {
    if (localStorage.getItem('userFormValues') != null) {
      let productList = JSON.parse(localStorage.getItem('userFormValues')!);
      productList.forEach((product: any, i: number) => {
        if (product.id == data.id) {
          if (productList[i]['Quantity'] > productList[i]['cartItem']) {
            productList[i]['cartItem'] = 1;
            productList[i]['isInCart'] = true;
          }
        }
      });
      localStorage.setItem('userFormValues', JSON.stringify(productList));
      this.items = productList.filter((product: any) => {
        return product.cartItem > 0;
      });
    }
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  addWishlist(productList: any) {
    this.items = productList.filter((product: any) => {
      return product.isWished.toLocaleLowerCase().match('red');
    });
  }

  getList() {
    return this.items;
  }

  clearList() {
    this.items = [];
    return this.items;
  }
}
