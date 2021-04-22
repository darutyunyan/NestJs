import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { AddColumnTypeComponent } from './add-column-type/add-column-type.component';
import { AddProductNameComponent } from './add-product-name/add-product-name.component';
import { AddProductTypeComponent } from './add-product-type/add-product-type.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { LogComponent } from './log/log.component';

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
            { path: 'add-location', component: AddLocationComponent, canActivate: [AuthGuard] },
            { path: 'log', component: LogComponent, canActivate: [AuthGuard] }
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
