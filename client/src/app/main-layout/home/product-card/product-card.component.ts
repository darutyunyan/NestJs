import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IProductNameItem } from 'src/app/store/models/client.model';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

    @Input()
    public productName: IProductNameItem;

    @Input()
    public typeName: string;

    constructor(private route: Router) { }

    public getIcon(): string {
        switch (this.typeName) {
            case 'Семена':
                return 'fa-leaf';

            case 'СЗР':
                return 'fa-shield';

            case 'Мин. удобрения':
                return 'fa-product-hunt';

            case 'Корма':
                return 'fa-product-hunt';
        }
    }

    public goToProduct(): void {
        this.route.navigate(['/products', this.productName._id]);
    }

}
