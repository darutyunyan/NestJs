import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ILocation } from 'src/app/store/models/location.module';
import { IClientState } from 'src/app/store/reducers/client';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    @Input()
    public zoom: number;

    @Input()
    public options: ymaps.IMapOptions;

    @Input()
    public state: ymaps.IMapState;

    @Input()
    public mapSize: string;

    public location$: Observable<ILocation>;

    constructor(private store: Store<IClientState>) { }

    public ngOnInit(): void {
        this.location$ = this.store.select(s => s.locationState.location);
    }

    public getMapSize(): string {
        return this.mapSize;
    }
}
