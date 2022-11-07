export interface MobileUser {
  email: string; // 'eddyverbruggen@gmail.com'
  userId: string; // user id
  displayName: string; // 'Eddy Verbruggen'
  familyName: string; // 'Verbruggen'
  givenName: string; // 'Eddy'
  imageUrl: string; // 'http://link-to-my-profilepic.google.com'
  idToken: any; // idToken that can be exchanged to verify user identity.
  serverAuthCode: any; // Auth code that can be exchanged for an access token and refresh token for offline access
  accessToken: any; // OAuth2 access token
}
