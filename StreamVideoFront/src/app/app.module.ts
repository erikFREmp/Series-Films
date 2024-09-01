import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './components/aboutUs/aboutUs.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CookiesPolicyComponent } from './components/cookiesPolicy/cookiesPolicy.component';
import { FilmPageComponent } from './components/filmPage/filmPage.component';
import { ForumComponent } from './components/forum/forum.component';
import { GenreComponent } from './components/genre/genre.component';
import { HomePageComponent } from './components/homepage/homepage.component';
import { IndividualGenreComponent } from './components/individualGenre/individualGenre.component';
import { IndividualProductComponent } from './components/individualProduct/individualProduct.component';
import { PrivacyPolicyComponent } from './components/privacyPolicy/privacyPolicy.component';
import { PurchaseModalComponent } from './components/purchaseModal/purchaseModal.component';
import { SeriePageComponent } from './components/seriePage/seriePage.component';
import { SubscriptionContractComponent } from './components/subscriptionContract/subscriptionContract.component';
import { UseThermsComponent } from './components/useTherms/useTherms.component';
import { AuthInterceptorService } from './interceptor/authInterceptor.service';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './shared/home/home.component';
import { ModalLoginComponent } from './shared/modalLogin/modalLogin.component';
import { ModalRegisterComponent } from './shared/modalRegister/modalRegister.component';
import { PasswordRecoveryComponent } from './shared/passwordRecovery/passwordRecovery.component';
import { AuthGuard } from './services/auth.guard';
import { SearchComponent } from './components/search/search.component';
import { CartComponent } from './components/cart/cart.component';
import { PurchaseService } from './services/purchase.service';
import { AuthService } from './services/auth.service';
import { MiCuentaComponent } from './components/account/mi-cuenta.component';
import { RoleContentComponent } from './components/role-content/role-content.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CoinPurchaseComponent } from './components/coin-purchase/coin-purchase.component';


const routes: Routes = [

  { path: '', redirectTo: '/home/es', pathMatch: 'full' },
  { path: 'home/:language', component: HomeComponent },
  { path: 'films/:language', component: FilmPageComponent },
  { path: 'series/:language', component: SeriePageComponent },
  { path: 'movie/:language/:id', component: IndividualProductComponent },
  { path: 'privacyPolicy/:language', component: PrivacyPolicyComponent },
  { path: 'useTherms/:language', component: UseThermsComponent },
  { path: 'cookiesPolicy/:language', component: CookiesPolicyComponent },
  { path: 'subscriptionContract/:language', component: SubscriptionContractComponent },
  { path: 'aboutUs/:language', component: AboutUsComponent },
  { path: 'series/:language/:id', component: IndividualProductComponent },
  { path: 'categorias/:language', component: CategoriesComponent },
  { path: 'categorias/movies/:language/:id', component: GenreComponent },
  { path: 'categorias/series/:language/:id', component: GenreComponent },
  { path: 'generos/:language', component: GenreComponent },
  { path: 'buscar/:language', component: SearchComponent },
  { path: 'admin/:language', component: UserDetailsComponent },
  { path: 'cart/:language', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'mi-cuenta/:language', component: MiCuentaComponent },
  { path: 'favoritos/:language', component: FavoritesComponent }
]

@NgModule({
  declarations: [
    SeriePageComponent,
    FilmPageComponent,
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ModalLoginComponent,
    ModalRegisterComponent,
    IndividualProductComponent,
    HomePageComponent,
    ForumComponent,
    CategoriesComponent,
    GenreComponent,
    IndividualGenreComponent,
    PasswordRecoveryComponent,
    PurchaseModalComponent,
    PrivacyPolicyComponent,
    UseThermsComponent,
    CookiesPolicyComponent,
    SubscriptionContractComponent,
    AboutUsComponent,
    SearchComponent,
    CartComponent,
    RoleContentComponent,
    UserDetailsComponent,
    MiCuentaComponent,
    FavoritesComponent,
    CoinPurchaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],

  providers: [
    AuthService,
    PurchaseService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
