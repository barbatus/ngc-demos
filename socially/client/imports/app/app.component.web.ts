import {Component} from '@angular/core';
import {InjectUser} from 'angular2-meteor-accounts-ui';

import {style} from './app.component.scss';
import {template} from './app.component.web.html';

import {User} from 'both/collections/users.collection';

@Component({
  selector: 'app',
  template: template,
  styles: [style]
})
@InjectUser('user')
export class AppComponent {
  user: User;

  logout() {
    Meteor.logout();
  }
}
