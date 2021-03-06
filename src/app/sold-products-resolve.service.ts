import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ProductFilter } from './product-filter';

import { Product } from './product';
import { ProductService } from './product.service';

@Injectable()
export class SoldProductsResolveService implements Resolve<Product[]> {


        /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
        | Yellow Path                                                      |
        |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
        | Aquí toca hacer varias cosas:                                    |
        |                                                                  |
        | 1. Necesitamos obtener aquellos productos que están vendidos; es |
        |    decir, aquellos cuyo 'state' es 'sold'. Quizá te ayude el     |
        |    modelo 'ProductFilter'.                                       |
        |                                                                  |
        | 2. Debemos retornar el observable que contiene la colección de   |
        |    productos vendidos. Toca ir a servidor a través del servicio  |
        |    ProductService, que tendrás que inyectar como dependencia.    |
        |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    constructor(private _productService: ProductService){}

    resolve(route: ActivatedRouteSnapshot): Observable <Product[]> {
            let filter: ProductFilter={
                state: "sold"
            }

            return this._productService.getProducts(filter);
        }
    }
