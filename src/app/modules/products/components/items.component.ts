import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Order, OrderItems } from '../../order/models/order';
import { Util } from 'src/app/modules/shared/models/util';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styles: [
  ]
})
export class ItemsComponent implements OnInit {

  breakpoint: number;
  dataset: Product[];
  chicken_ds: Product[];
  mutton_ds: Product[];
  pork_ds: Product[];
  duck_ds: Product[];
  fish_ds: Product[];
  eggs_ds: Product[];
  dairy_ds: Product[];
  order: Order;
  orderItems: OrderItems[];

  constructor(private productService: ProductService) { 
    this.getProducts();
  }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 200) ? 1 : 3;
    this.order = new Order();
    this.orderItems = new Array<OrderItems>();
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 200) ? 1 : 3;
  }

  getProducts() {
    this.productService.getProducts().subscribe((resp) => {
      if (resp.status == 200) {
        this.dataset = new Array<Product>();
        this.chicken_ds = new Array<Product>();
        this.mutton_ds = new Array<Product>();
        this.pork_ds = new Array<Product>();
        this.duck_ds = new Array<Product>();
        this.fish_ds = new Array<Product>();
        this.eggs_ds = new Array<Product>();
        this.dairy_ds = new Array<Product>();
        this.dataset = resp.json();
        this.dataset.forEach(item => {
          switch (item["product_type_name"].toLowerCase()) {
            case "chicken":
              this.chicken_ds.push(item);
              break;
            case "mutton":
              this.mutton_ds.push(item);
              break;
            case "pork":
              this.pork_ds.push(item);
              break;
            case "duck":
              this.duck_ds.push(item);
              break;
            case "fish":
              this.fish_ds.push(item);
              break;
            case "egg":
              this.eggs_ds.push(item);
              break;
            case "dairy":
              this.dairy_ds.push(item);
              break;
          }
        });
      }
    });
  }

  addToCart(productId, price, discountedPrice, couponApplied) {
    let item = new OrderItems();
    item.product_id = productId;
    item.price = price;
    item.discounted_price = discountedPrice;
    item.coupon_applied = couponApplied;
    this.orderItems.push(item);
    
    let cart = localStorage.getItem("cart");
    if (!Util.stringIsNullEmptyOrUndefined(cart)) {
      let cartData = JSON.parse(cart);
      cartData.push(item);
      localStorage.setItem("cart", JSON.stringify(cartData));
    }
    else {
      localStorage.setItem("cart", JSON.stringify(this.orderItems));
    }
  }

  removeFromCart(productId, price, discountedPrice, couponApplied) {
    let item = new OrderItems();
    item.product_id = productId;
    item.price = price;
    item.discounted_price = discountedPrice;
    item.coupon_applied = couponApplied;

    let cart = localStorage.getItem("cart");
    if (!Util.stringIsNullEmptyOrUndefined(cart)) {
      let cartData = JSON.parse(cart);
      cartData.pop(item);
      localStorage.setItem("cart", JSON.stringify(cartData));
    }
  }

}
