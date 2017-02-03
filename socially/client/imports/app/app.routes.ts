import {Route} from '@angular/router';
import {Meteor} from 'meteor/meteor';

import {PartiesListComponent} from './parties/parties-list.component';
import {PartyDetailsComponent} from './parties/party-details.component';
import {SignupComponent} from './auth/signup.component';
import {RecoverComponent} from './auth/recover.component';
import {LoginComponent} from './auth/login.component.web';

export const routes: Route[] = [
  { path: '', component: PartiesListComponent },
  { path: 'party/:partyId', component: PartyDetailsComponent, canActivate: ['canActivateForLoggedIn'] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'recover', component: RecoverComponent }
];

export function isLoggedIn(): boolean {
  return !! Meteor.userId();
}

export const ROUTES_PROVIDERS = [{
  provide: 'canActivateForLoggedIn',
  useValue: isLoggedIn
}];
