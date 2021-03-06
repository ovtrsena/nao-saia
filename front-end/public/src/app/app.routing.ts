import { ContributorsComponent } from "./landing/contributors/contributors.component";
import { EstablishmentsComponent } from "./establishments/establishments.component";
import { LandingComponent } from "./landing/landing.component";
import { LoginComponent } from "./login/login.component";
import { MerchantComponent } from "./merchant/merchant.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterGuardService } from './services/registerguard.service';
import { Routes } from "@angular/router";
import { SignupComponent } from "./signup/signup.component";
import { SupportUsComponent } from "./landing/support-us/support-us.component";

export const ROUTES: Routes = [
  // { path: 'home',             component: HomeComponent },
  { path: "home", component: LandingComponent },
  { path: "merchant/:id", component: ProfileComponent },
  { path: "register", component: SignupComponent, canActivate: [RegisterGuardService] },
  { path: "landing", component: LandingComponent },
  { path: "login", component: LoginComponent },
  { path: "contributors", component: ContributorsComponent },
  { path: "support-us", component: SupportUsComponent },
  { path: "merchant/:id", component: ProfileComponent },
  { path: "merchant-register/:userId", component: MerchantComponent },
  { path: "merchants", component: EstablishmentsComponent },
  { path: "", redirectTo: "landing", pathMatch: "full" }
];
