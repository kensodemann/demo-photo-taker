# Demo Photo Taker

This demo application shows how to create an application using Ionic and Capacitor that run as both a hybrid native environment and as a PWA.

## Running

- clone this repo
- `cd demo-photo-taker`
- `npm i`
- `npm run build`
- `npx cap sync` - this may take a while
- `npm start` - to run in the browser
- `npx cap open ios`

**Note**: If you want to deploy this, you will need to modify the firebase bits.

You can check out the PWA via https://kws-playground.firebaseapp.com

## Quirks

On both Android and iOS, if you are using the "selfie" camera, the resulting image will be reversed.

On both Android and iOS, the picture taken in a web context may be smaller than the picture taken when running in a hybrid native context.

### iOS

Native build works great.

iOS is still quirky in its support of PWAs, including not allowing access to the camera, so you may want to do some work to detect the platform and tell iOS users to use the native build or disable features or whatever.

Also, iOS will not ask to install the app on the desktop. Users must do that themselves.  This, and other quirkiness is all simply a fact of life for iOS when it comes to PWA. Here is a good article that covers the current state of things: https://medium.com/@firt/whats-new-on-ios-12-2-for-progressive-web-apps-75c348f8e945

**Note:** This lack of camera support is only when the app is installed in desktop mode. When run in Safari in "web" mode, the camera access works great.

### Android

This application works great on Android devices with as a hybrid mobile application and as a PWA.

One quirk I have noticed on some android devices any picture taken when running in PWA mode will actually be displayed rotated 90 degrees. This is only on some devices, however...

## Generation from Scratch

If you were to generate an application like this from scratch, follow these steps:

- `ionic start demo-photo-taker blank --type=angular --capacitor`
- `npm run build`
- `npx cap add ios`
- `npx cap add android`
- `npx cap open ios` - build and test
- `npx cap open android` - build and test
- remove the `@ionic/native` wrappers
- modify the `app.component.ts` initialization to use Capacitor API calls
- add https://capacitor.ionicframework.com/docs/getting-started/pwa-elements/

Now you are ready to start coding the app...
