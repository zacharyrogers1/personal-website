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
    },
    iot: {
      endpoint: 'a1n8ytbh0zio90-ats.iot.us-east-1.amazonaws.com'
    }
  }
};

// Amplify.configure({
//   Auth: {

//       // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
//       identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',

//       // REQUIRED - Amazon Cognito Region
//       region: 'XX-XXXX-X',

//       // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
//       // Required only if it's different from Amazon Cognito Region
//       identityPoolRegion: 'XX-XXXX-X',

//       // OPTIONAL - Amazon Cognito User Pool ID
//       userPoolId: 'XX-XXXX-X_abcd1234',

//       // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
//       userPoolWebClientId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3',

//       // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
//       mandatorySignIn: false,

//       // OPTIONAL - Configuration for cookie storage
//       // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
//       cookieStorage: {
//       // REQUIRED - Cookie domain (only required if cookieStorage is provided)
//           domain: '.yourdomain.com',
//       // OPTIONAL - Cookie path
//           path: '/',
//       // OPTIONAL - Cookie expiration in days
//           expires: 365,
//       // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
//           sameSite: "strict" | "lax",
//       // OPTIONAL - Cookie secure flag
//       // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
//           secure: true
//       },

//       // OPTIONAL - customized storage object
//       storage: MyStorage,

//       // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
//       authenticationFlowType: 'USER_PASSWORD_AUTH',

//       // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
//       clientMetadata: { myCustomKey: 'myCustomValue' },

//        // OPTIONAL - Hosted UI configuration
//       oauth: {
//           domain: 'your_cognito_domain',
//           scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
//           redirectSignIn: 'http://localhost:3000/',
//           redirectSignOut: 'http://localhost:3000/',
//           responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
//       }
//   }
// });


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
