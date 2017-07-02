import { Inject, Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BackendUri } from './app-settings';
import { Product } from './product';
import { ProductFilter } from './product-filter';

@Injectable()
export class ProductService {

  constructor(
    private _http: Http,
    @Inject(BackendUri) private _backendUri) { }

  getProducts(filter: ProductFilter = undefined): Observable<Product[]> {
      let params = new URLSearchParams();
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Pink Path                                                        |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Pide al servidor que te retorne los productos ordenados de más   |
    | reciente a menos, teniendo en cuenta su fecha de publicación.    |
    |                                                                  |
    | En la documentación de 'JSON Server' tienes detallado cómo hacer |
    | la ordenación de los datos en tus peticiones, pero te ayudo      |
    | igualmente. La querystring debe tener estos parámetros:          |
    |                                                                  |
    |   _sort=publishedDate&_order=DESC                                |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Red y yellow Path                                                         |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    | Pide al servidor que te retorne los productos filtrados por      |
    | texto y/ por categoría.                                          |
    |                                                                  |
    | En la documentación de 'JSON Server' tienes detallado cómo       |
    | filtrar datos en tus peticiones, pero te ayudo igualmente. La    |
    | querystring debe tener estos parámetros:                         |
    |                                                                  |
    |   - Búsqueda por texto:                                          |
    |       q=x (siendo x el texto)                                    |
    |   - Búsqueda por categoría:                                      |
    |       category.id=x (siendo x el identificador de la categoría)  |
    |                                                                  |
    |   - Búsqueda por estado:                                         |
    |       state=x (siendo x el estado)                               |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

      // text ?: string;
      // category ?: string;
      // state ?: string;
      // priceMin ?: string;
      // priceMax ?: string;
      // order ?: string;
      // name ?: string;
    let filtro: any;
    let domain: any;
    console.log(filter);

    if (filter) {
      params.set('q', filter.text);
      if ((filter.category != "0") && (filter.category !== null)) {
        params.set('category.id', filter.category);
      }
      params.set('state', filter.state);

      // if (filter.priceMin && filter.priceMin != null && filter.priceMax === '') {
      //     params.set('price_gte', `${filter.priceMin}`);
      //     params.set('_order', 'ASC');
      //     params.set('_sort', 'price');
      // }

      // if (filter.priceMax && filter.priceMax != null && filter.priceMin === '') {
      //     params.set('price_lte', `${filter.priceMax}`);
      //     params.set('_order', 'ASC');
      //     params.set('_sort', 'price');
      // }

      // if (filter.priceMax && filter.priceMax != null && filter.priceMin && filter.priceMin != null) {
      //     params.set('price_gte', `${filter.priceMin}`);
      //     params.set('price_lte', `${filter.priceMax}`);
      //     params.set('_order', 'ASC');
      //     params.set('_sort', 'price');
      // }

      // if (filter.order && filter.order != null) {
      //     params.set('_order', 'ASC');
      //     params.set('_sort', filter.order);
      // }
    }

    let options = new RequestOptions();
    options.search = params;
    console.log('aa', options)
    params.set('_order', 'DESC');
    params.set('_sort', 'publishedDate');
    return this._http
      .get(`${this._backendUri}/products`, options)
      .map((data: Response): Product[] => Product.fromJsonToList(data.json()));
  }

  getProduct(productId: number): Observable<Product> {
    return this._http
      .get(`${this._backendUri}/products/${productId}`)
      .map((data: Response): Product => Product.fromJson(data.json()));
  }

  buyProduct(productId: number): Observable<Product> {
    const body: any = { 'state': 'sold' };
    return this._http
      .patch(`${this._backendUri}/products/${productId}`, body)
      .map((data: Response): Product => Product.fromJson(data.json()));
  }

  setProductAvailable(productId: number): Observable<Product> {
    const body: any = { 'state': 'selling' };
    return this._http
      .patch(`${this._backendUri}/products/${productId}`, body)
      .map((data: Response): Product => Product.fromJson(data.json()));
  }

}
