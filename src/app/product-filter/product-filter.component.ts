import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { SelectItem } from 'primeng/primeng';

import { Category } from '../category';
import { CategoryService } from '../category.service';
import { ProductFilter } from '../product-filter';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnDestroy, OnInit {

  @Output() onSearch: EventEmitter<ProductFilter> = new EventEmitter();

  // productFilter: ProductFilter = {};
  productFilter: ProductFilter = { text: '' };
  categories: Category[];
  private _categoriesSubscription: Subscription;
  order: SelectItem[];

  constructor(private _categoryService: CategoryService) {
    this.order = [];
    this.order.push({ label: 'Precio', value: 'price' });
    this.order.push({ label: 'Nombre', value: 'name' });
  }

  ngOnInit(): void {
    this._categoriesSubscription = this._categoryService
      .getCategories()
      .subscribe((data: Category[]) => this.categories = data);
  }

  ngOnDestroy(): void {
    this._categoriesSubscription.unsubscribe();
  }

  notifyHost(): void {
    this.onSearch.emit(this.productFilter);
  }

  handleChange(switchValue) {
    this.productFilter.state = switchValue.checked ? 'selling' : 'sold';
  }


}
