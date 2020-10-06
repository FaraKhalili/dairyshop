import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: IProduct;
  constructor(private shopService: ShopService, private activateRout: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    this.shopService.getProduct(+this.activateRout.snapshot.paramMap.get('id')).subscribe((product) => {
      this.product = product;
    }, error => console.log('error'));
  }
}
