import { Component } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

import { PhotosService } from '../core/photos/photos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  image: SafeResourceUrl;

  constructor(private photos: PhotosService) {}

  async takePicture(): Promise<void> {
    this.image = await this.photos.takePicture();
  }
}
