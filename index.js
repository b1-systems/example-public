/* author: B1 Systems GmbH
 * authoremail: info@b1-systems.de
 * license: MIT License <https://opensource.org/licenses/MIT>
 * summary: OpenID Connect example
 * */

var keycloak;
var loadData = function () {
  var date = Date();

  jQuery('.clientId').html(keycloak.clientId);
  jQuery('#subject').html(keycloak.subject);

  if (keycloak.idToken) {
    jQuery('#debug').html('Data loaded from ID token on ' + date + '.');
    jQuery('#username').html(keycloak.idTokenParsed.preferred_username);
    jQuery('#email').html(keycloak.idTokenParsed.email);
    jQuery('#name').html(keycloak.idTokenParsed.name);
    jQuery('#givenName').html(keycloak.idTokenParsed.given_name);
    jQuery('#familyName').html(keycloak.idTokenParsed.family_name);
    jQuery('#client_roles').html(keycloak.idTokenParsed.resource_access['example-public'].roles);
  } else {
    keycloak.loadUserProfile(function() {
    jQuery('#debug').html('Data loaded from user profile on ' + date + '.');
      jQuery('#username').html(keycloak.profile.username);
      jQuery('#email').html(keycloak.profile.email);
      jQuery('#name').html(keycloak.profile.firstName + ' ' + keycloak.profile.lastName);
      jQuery('#givenName').html(keycloak.profile.firstName);
      jQuery('#familyName').html(keycloak.profile.lastName);
    }, function() {
      jQuery('#profileType').html('failed');
    });
  }
};
var loadFailure = function () {
  jQuery('#debug').html('<b>Failed to load data.  Check console log</b>');
};
var reloadData = function () {
  keycloak.updateToken(10)
    .then(loadData)
    .catch(function() {
      jQuery('#debug').html('<b>Failed to load data.  User is logged out.</b>');
    });
};
jQuery(function() {
  jQuery.getJSON("example-public.json", function(config) {
    require(
      config.keycloak_url + "/js/keycloak.js", function() {
        keycloak = new Keycloak('keycloak.json');
        keycloak.init({
          onLoad: 'login-required',
          silentCheckSsoRedirectUri: config.example_public_url+'/silent-check-sso.html'
        }).then(reloadData);
    });
  });
});


