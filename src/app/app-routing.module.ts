import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
// SHARED
import {
  ForbiddenComponent, PageNotFoundComponent, SuccessComponent, ErrorComponent, PrivacyPolicyComponent, TermsComponent
} from './index';
// ADMIN
import {
  AdminLoginComponent, PlacesComponent, LocalitiesComponent, LandmarksComponent, LookupsComponent, DashboardComponent
} from './index';
// WEBSITE
import {
  HomeComponent
} from './index';
import { ProductComponent } from './modules/admin/components/master-data/product.component';

const routes: Routes = [
  { path: 'quality-meat-and-fish-guaranteed', component: HomeComponent },

  // ADMMIN
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/analytics/dashboard', component: DashboardComponent },
  { path: 'admin/master-data/inventory', component: ProductComponent },
  { path: 'admin/master-data/places', component: PlacesComponent },
  { path: 'admin/master-data/localities', component: LocalitiesComponent },
  { path: 'admin/master-data/landmarks', component: LandmarksComponent },
  { path: 'admin/master-data/lookups', component: LookupsComponent },
  // SHARED
  { path: 'success', component: SuccessComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms', component: TermsComponent },
  { path: '', redirectTo: '/quality-meat-and-fish-guaranteed', pathMatch: 'full' },
  { path: 'admin', redirectTo: '/admin/login', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
  { path: '403', component: ForbiddenComponent },
  { path: '404', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }