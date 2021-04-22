import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-alert-info',
    templateUrl: './alert-info.component.html',
    styleUrls: ['./alert-info.component.css']
})
export class AlertInfoComponent {
    @Input()
    public message: string;

    @Input()
    public link: string;
}
