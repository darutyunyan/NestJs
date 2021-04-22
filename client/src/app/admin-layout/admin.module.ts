import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AddColumnTypeComponent } from './add-column-type/add-column-type.component';
import { AddProductNameComponent } from './add-product-name/add-product-name.component';
import { AddProductTypeComponent } from './add-product-type/add-product-type.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { LoaderComponent } from './shared/templates/loader/loader.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { EditProductComponent } from './dashboard/table-product/edit-product/edit-product.component';
import { LogComponent } from './log/log.component';
import { TableProductComponent } from './dashboard/table-product/table-product.component';
import { AuthService } from './shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ProductService } from './shared/services/product.service';
import { MyCookieService } from './shared/services/cookie.service';
import { LogService } from './shared/services/log.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';
import { SearchPipe } from './shared/search.pipe';
import { environment } from 'src/environments/environment';
import { adminReducers } from '../store/reducers/admin';
import { adminEffects } from '../store/effects/admin';
import { AlertInfoComponent } from './shared/templates/alert-info/alert-info.component';

@NgModule({
    declarations: [
        AdminLayoutComponent,
        LoginComponent,
        DashboardComponent,
        AddProductComponent,
        AddColumnTypeComponent,
        AddProductNameComponent,
        AddProductTypeComponent,
        LoaderComponent,
        SearchPipe,
        TableProductComponent,
        AddLocationComponent,
        EditProductComponent,
        LogComponent,
        AlertInfoComponent
    ],
    imports: [
        SharedModule,
        AdminRoutingModule,
        StoreModule.forFeature('adminState', adminReducers),
        EffectsModule.forFeature(adminEffects),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: AuthInterceptor
        },
        CookieService,
        MyCookieService,
        AuthService,
        ProductService,
        LogService
    ]
})

export class AdminModule {
}
