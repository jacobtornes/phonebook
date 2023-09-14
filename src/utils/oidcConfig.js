// oidcConfig.js
import Oidc from 'oidc-client';

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.DEBUG;

const config = {
    production: false,
    base_url: 'https://test.softrig.com/api/',
    authority: 'https://test-login.softrig.com',
    client_id: '631c2c2c-8832-4146-a220-ed1eced95203',
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
