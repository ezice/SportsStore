import { Injectable } from "@angular/core";

@Injectable()
export class Cart {
    public lines: CartLine[] = [];
    public itemCount = 0;
    public cartPrice = 0;

    addLine(product: Product, quantity: number = 1) {
        let line = this.lines.find(line => line.product.id == product.id);
    }
}