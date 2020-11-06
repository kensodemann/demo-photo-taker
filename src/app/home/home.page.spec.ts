import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';
import { PhotosService } from '../core/photos/photos.service';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let photos: PhotosService;

  beforeEach(async(() => {
    photos = jasmine.createSpyObj('PhotoService', {
      takePicture: Promise.resolve('this-is-the-resolved-image')
    });
    TestBed.configureTestingModule({
      declarations: [HomePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: PhotosService, useValue: photos }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('takePicture', () => {
    it('takes a picture', () => {
      component.takePicture();
      expect(photos.takePicture).toHaveBeenCalledTimes(1);
    });

    it('assigns the resolved image', async () => {
      await component.takePicture();
      expect(component.image).toEqual('this-is-the-resolved-image');
    });
  });
});
