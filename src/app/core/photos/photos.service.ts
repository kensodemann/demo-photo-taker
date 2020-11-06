import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  CameraResultType,
  CameraSource,
  Plugins,
  CameraPhoto
} from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  constructor(private sanitizer: DomSanitizer) {}

  async takePicture(): Promise<SafeResourceUrl> {
    const { Camera } = Plugins;

    const image: CameraPhoto = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      image && image.dataUrl
    );
  }
}
