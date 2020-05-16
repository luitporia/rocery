export class Order { 
    address_id: string;
    delivery_type: string;
    payment_status: string;
    order_items: OrderItems;
}

export class OrderItems { 
    product_id: string;
    price: number;
    units: number;
    discounted_price: number;
    coupon_applied: string;
}