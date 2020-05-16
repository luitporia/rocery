import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
/*
import {
  MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatCheckboxModule, MatProgressBarModule,
  MatDividerModule, MatIconModule, MatMenuModule, MatCardModule, MatTabsModule, MatGridListModule, MatDatepickerModule,
  MatNativeDateModule, MatPaginatorModule, MatSortModule, MatTableModule
} from '@angular/material/form-field';*/
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrModule } from 'ngx-toastr';
import { CarouselModule  } from 'ngx-owl-carousel-o';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import 'hammerjs';

// DEFAULT MODULES
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// SHARED COMPONENTS
import {
  PublicComponent, AdminComponent, FooterComponent, ErrorComponent, SuccessComponent, ForbiddenComponent,
  HeaderComponent, PageNotFoundComponent, PrivacyPolicyComponent, TermsComponent
} from './index';
// ADMIN
import {
  AdminFooterComponent, AdminHeaderComponent, AdminLoginComponent, ProductComponent, PlacesComponent, LocalitiesComponent, LandmarksComponent, LookupsComponent, DashboardComponent
} from './index';
// WEBSITE
import {
  HomeComponent, LoginComponent, OrdersComponent, BannerComponent, ItemsComponent
} from './index';

@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    AdminComponent,
    FooterComponent,
    ErrorComponent,
    SuccessComponent,
    ForbiddenComponent,
    HeaderComponent,
    PageNotFoundComponent,
    SuccessComponent,
    PrivacyPolicyComponent,
    TermsComponent,
    LoginComponent,
    AdminLoginComponent,
    DashboardComponent,
    PlacesComponent,
    LocalitiesComponent,
    LandmarksComponent,
    LookupsComponent,
    HomeComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    ProductComponent,
    OrdersComponent,
    BannerComponent,
    ItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    CarouselModule ,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatCheckboxModule, MatProgressBarModule,
    MatDividerModule, MatIconModule, MatMenuModule, MatCardModule, MatTabsModule, MatGridListModule, MatDatepickerModule,
    MatPaginatorModule, MatSortModule, MatTableModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    CookieService,
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'in' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
