import {Pipe, PipeTransform} from '@angular/core';
import {Meteor} from 'meteor/meteor';

import {Images} from 'both/collections/images.collection';
import {Party} from 'both/models/party.model';

@Pipe({
  name: 'displayMainImage'
})
export class DisplayMainImagePipe implements PipeTransform {
  transform(party: Party) {
    if (!party) {
      return;
    }

    let imageUrl: string;
    let imageId: string = (party.images || [])[0];

    const found = Images.findOne(imageId);

    if (found) {
      if (!Meteor.isCordova) {
        imageUrl = found.url;
      } else {
        const path = `ufs/${found.store}/${found._id}/${found.name}`;
        imageUrl = Meteor.absoluteUrl(path);
      }
    }

    return imageUrl;
  }
}
