import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Util } from 'src/app/modules/shared/models/util';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

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

  /**
   * Place CRUD
   */

  createPlace(data) {
    let options = Util.getTokenOptions(this.token);
    return this.http.post(apiUrl + "CreatePlace", data, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  updatePlace(data) {
    let options = Util.getTokenOptions(this.token);
    return this.http.post(apiUrl + "UpdatePlace", data, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  deletePlace(data) {
    let options = Util.getTokenOptions(this.token);
    return this.http.post(apiUrl + "DeletePlace", data, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  getPlaces() {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(apiUrl + "GetPlaces", options).pipe(
        map((res: Response) => { 
          return res;
      }));
  }

  getPlace(id) {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(apiUrl + "GetPlace/" + id, options).pipe(
        map((res: Response) => { 
          return res;
      }));
  }

  /**
   * Localities CRUD
   */

  createLocality(data) {
    let options = Util.getTokenOptions(this.token);
    return this.http.post(apiUrl + "CreateLocality", data, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  updateLocality(data) {
    let options = Util.getTokenOptions(this.token);
    return this.http.post(apiUrl + "UpdateLocality", data, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  deleteLocality(data) {
    let options = Util.getTokenOptions(this.token);
    return this.http.post(apiUrl + "DeleteLocality", data, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  getLocalities() {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(apiUrl + "GetLocalities", options).pipe(
        map((res: Response) => { 
          return res;
      }));
  }

  getLocality(id) {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(apiUrl + "GetLocality/" + id, options).pipe(
        map((res: Response) => { 
          return res;
      }));
  }

  /**
   * Landmark CRUD
   */

  createLandmark(data) {
    let options = Util.getTokenOptions(this.token);
    return this.http.post(apiUrl + "CreateLandmark", data, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  updateLandmark(data) {
    let options = Util.getTokenOptions(this.token);
    return this.http.post(apiUrl + "UpdateLandmark", data, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  deleteLandmark(data) {
    let options = Util.getTokenOptions(this.token);
    return this.http.post(apiUrl + "DeleteLandmark", data, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  getLandmarks() {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(apiUrl + "GetLandmarks", options).pipe(
        map((res: Response) => { 
          return res;
      }));
  }

  getLandmark(id) {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(apiUrl + "GetLandmark/" + id, options).pipe(
        map((res: Response) => { 
          return res;
      }));
  }

  /**
   * Lookup CRUD
   */

  createLookup(data) {
    let options = Util.getTokenOptions(this.token);
    return this.http.post(apiUrl + "CreateLookup", data, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  updateLookup(data) {
    let options = Util.getTokenOptions(this.token);
    return this.http.post(apiUrl + "UpdateLookup", data, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  deleteLookup(data) {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.post(apiUrl + "DeleteLookup", data, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  getLookupByType(data) {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.post(apiUrl + "GetLookupByType", data, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  getLookupByTypeAndName(data) {
    let options = Util.getTokenOptions(this.token);
    return this.http.post(apiUrl + "GetLookupByTypeAndName", data, options).pipe(
      map((res: Response) => { 
        return res;
    }));
  }

  getLookups() {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(apiUrl + "GetLookups", options).pipe(
        map((res: Response) => { 
          return res;
      }));
  }

  getLookup(id) {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(apiUrl + "GetLookup/" + id, options).pipe(
        map((res: Response) => { 
          return res;
      }));
  }

}
