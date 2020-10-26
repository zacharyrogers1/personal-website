// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: 'local',
  awsConfig: {
    Auth: {
      identityPoolId: 'us-east-1:e0e9ebb6-21c3-4330-b8b9-d4c2f307275c',
      region: 'us-east-1',
      userPoolId: 'us-east-1_bRAPsGeo2',
      userPoolWebClientId: '7isv2q0ebte5e73ri63ih408rl'
    }
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
