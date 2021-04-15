import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  public options: ymaps.IMapOptions;
  public state: ymaps.IMapState;

  constructor() { }

  public ngOnInit(): void {

    this.options = {
      restrictMapArea: true,
      copyrightLogoVisible: false,
      copyrightProvidersVisible: false,
      copyrightUaVisible: false,
    };

    this.state = {
      controls: []
    };
  }
}
