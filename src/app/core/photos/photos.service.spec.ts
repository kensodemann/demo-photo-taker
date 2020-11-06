import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { Plugins } from '@capacitor/core';

import { PhotosService } from './photos.service';

describe('PhotosService', () => {
  let originalCamera;
  let sanitizer;

  beforeEach(() => {
    originalCamera = Plugins.Camera;
    Plugins.Camera = jasmine.createSpyObj('Camera', {
      getPhoto: Promise.resolve({ dataUrl: '1234ABC88495' })
    });
    sanitizer = jasmine.createSpyObj('DomSanitizer', {
      bypassSecurityTrustResourceUrl: 'this-is-a-safe-value'
    });
    TestBed.configureTestingModule({
      providers: [{ provide: DomSanitizer, useValue: sanitizer }]
    });
  });

  afterEach(() => {
    Plugins.Camera = originalCamera;
  });

  it('should be created', () => {
    const service: PhotosService = TestBed.get(PhotosService);
    expect(service).toBeTruthy();
  });

  describe('takePicture', () => {
    let photos: PhotosService;
    beforeEach(() => {
      photos = TestBed.get(PhotosService);
    });

    it('gets the photo from the camera', () => {
      photos.takePicture();
      expect(Plugins.Camera.getPhoto).toHaveBeenCalledTimes(1);
    });

    it('sanitizes the data', async () => {
      await photos.takePicture();
      expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledTimes(1);
      expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
        '1234ABC88495'
      );
    });

    it('resolves the sanitized image', async () => {
      const image = await photos.takePicture();
      expect(image).toEqual('this-is-a-safe-value');
    });
  });
});
