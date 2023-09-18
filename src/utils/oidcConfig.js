// oidcConfig.js
import Oidc from 'oidc-client';

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.DEBUG;

const config = {
    production: false,
    base_url: 'https://test.softrig.com/api/',
    authority: 'https://test-login.softrig.com',
    client_id: '496e3ac8-e77c-432c-83e6-e4de524d9b4d',
    redirect_uri: window.location.origin + '/callback',
    automaticSilentRenew: true,
    response_type: 'code',
    scope: 'openid profile AppFramework',
    filterProtocolClaims: true, // prevents protocol level claims such as nbf, iss, at_hash, and nonce from being extracted from the identity token as profile data
    loadUserInfo: true
};

const userManager = new Oidc.UserManager(config);

let currentUser = null;

userManager.events.addUserLoaded((user) => {
  currentUser = user;
});

const getAccessToken = () => currentUser?.access_token;

export { userManager, getAccessToken };
