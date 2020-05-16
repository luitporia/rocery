import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Util } from '../../../../app/modules/shared/models/util';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private token = null;
  private headers = null;
  private options = null;

  constructor(private http: Http) {
    this.token = localStorage.getItem('jwtToken');
    this.headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  /**
   * Product CRUD
   */

  createProduct(data) {
    let options = Util.getTokenOptions(this.token);
    return this.http.post(apiUrl + "CreateProduct", data, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  updateProduct(data) {
    let options = Util.getTokenOptions(this.token);
    return this.http.post(apiUrl + "UpdateProduct", data, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  deleteProduct(data) {
    let options = Util.getTokenOptions(this.token);
    return this.http.post(apiUrl + "DeleteProduct", data, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  getProducts() {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(apiUrl + "GetProducts", options).pipe(
        map((res: Response) => { 
          return res;
      }));
  }

  getProduct(id) {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(apiUrl + "GetProduct/" + id, options).pipe(
        map((res: Response) => { 
          return res;
      }));
  }
}
