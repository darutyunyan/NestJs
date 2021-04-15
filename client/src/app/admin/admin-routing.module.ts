import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AddColumnTypeComponent } from './admin-layout/add-column-type/add-column-type.component';
import { AddProductNameComponent } from './admin-layout/add-product-name/add-product-name.component';
import { AddProductTypeComponent } from './admin-layout/add-product-type/add-product-type.component';
import { AddProductComponent } from './admin-layout/add-product/add-product.component';
import { DashboardComponent } from './admin-layout/dashboard/dashboard.component';
import { LoginComponent } from './admin-layout/login/login.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AuthGuard } from './shared/auth.guard';
import { AddLocationComponent } from './admin-layout/add-location/add-location.component';

const routes: Route[] = [
    {
        path: '', component: AdminLayoutComponent, children: [
            { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'add-product-name', component: AddProductNameComponent, canActivate: [AuthGuard] },
            { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard] },
            { path: 'add-column-type', component: AddColumnTypeComponent, canActivate: [AuthGuard] },
            { path: 'add-product-type', component: AddProductTypeComponent, canActivate: [AuthGuard] },
            { path: 'add-location', component: AddLocationComponent, canActivate: [AuthGuard] }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AdminRoutingModule { }
