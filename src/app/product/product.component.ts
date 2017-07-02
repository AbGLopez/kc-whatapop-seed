import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../product';
import { ProductDetailsResolveService } from '../product-details-resolve.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent {

  @Input() data: Product;

  @Output() clickProduct = new EventEmitter<Product>();


  onProduct(data: Product): void{
    this.clickProduct.emit(data);
  }
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
  | Green Path                                                       |
  |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
  | Expón un atributo de salida con el decorador correspondiente. El |
  | tipo de dicho atributo debe permitir la emisión de eventos; la   |
  | idea es enviar al componente padre el producto sobre el cuál se  |
  | ha hecho clic. Y puesto que dicho clic se realiza en el template |
  | de este componente, necesitas, además, un manejador para el      |
  | mismo.                                                           |
  |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

}
