import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { IBrand } from '../shared/models/brand';
import { ShopService } from './shop.service';
import { ShopParams } from '../shared/models/shopParams';

@Component({
selector: 'app-shop',
templateUrl: './shop.component.html',
styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
@ViewChild('search', {static: false}) searchTerm: ElementRef;
products: IProduct[];
brands: IBrand[];
types: IType[];
shopParams = new ShopParams();
totalCount: number;
sortOptions = [
  { name: 'Alphabetical', value: 'name' },
  { name: 'Low to High', value: 'priceAsc' },
  { name: 'High to Low', value: 'priceDesc' },
];

constructor(private shopService: ShopService) {}

ngOnInit(): void {
  this.getProduts();
  this.getBrands();
  this.getTypes();
}

getProduts(): void {
  this.shopService
    .getProducts(this.shopParams)
    .subscribe(
      (response) => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      (error) => {
        console.log(error);
      }
    );
}

getBrands(): void {
  this.shopService.getBrands().subscribe(
    (response) => {
      this.brands = [{ id: 0, name: 'All' }, ...response];
    },
    (error) => {
      console.log(error);
    }
  );
}

getTypes(): void {
  this.shopService.getTypes().subscribe(
    (response) => {
      this.types = [{ id: 0, name: 'All' }, ...response];
    },
    (error) => {
      console.log(error);
    }
  );
}

onBrandSelected(brandId: number): void {
  this.shopParams.brandId = brandId;
  this.shopParams.pageNumber = 1;
  this.getProduts();
}

onTypeSelected(typeId: number): void {
  this.shopParams.typeId = typeId;
  this.shopParams.pageNumber = 1;
  this.getProduts();
}

onSortSelected(sort: string): void{
this.shopParams.sort = sort;
this.getProduts();
}

onPageChanged(event: any): void{
  if (this.shopParams.pageNumber !== event  ){
    this.shopParams.pageNumber = event;
    this.getProduts();
  }

}

onSearch(): void{
  this.shopParams.search = this.searchTerm.nativeElement.value;
  this.shopParams.pageNumber = 1;
  this.getProduts();
}

onReset(): void{
  this.searchTerm.nativeElement.value = '';
  this.shopParams = new ShopParams();
  this.getProduts();
}
}
