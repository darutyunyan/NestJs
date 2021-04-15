import { Component, Input } from '@angular/core';
import { IGetProductByIdResponse } from 'src/app/store/models/client.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input()
  public product: IGetProductByIdResponse | null;
}
