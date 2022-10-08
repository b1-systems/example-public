var keycloak;
var loadData = function () {
  jQuery('#subject').html(keycloak.subject);

  if (keycloak.idToken) {
    jQuery('#profileType').html('IDToken');
    jQuery('#username').html(keycloak.idTokenParsed.preferred_username);
    jQuery('#email').html(keycloak.idTokenParsed.email);
    jQuery('#name').html(keycloak.idTokenParsed.name);
    jQuery('#givenName').html(keycloak.idTokenParsed.given_name);
    jQuery('#familyName').html(keycloak.idTokenParsed.family_name);
  } else {
    keycloak.loadUserProfile(function() {
      jQuery('#profileType').html('Account Service');
      jQuery('#username').html(keycloak.profile.username);
      jQuery('#email').html(keycloak.profile.email);
      jQuery('#name').html(keycloak.profile.firstName + ' ' + keycloak.profile.lastName);
      jQuery('#givenName').html(keycloak.profile.firstName);
      jQuery('#familyName').html(keycloak.profile.lastName);
    }, function() {
      jQuery('#profileType').html('Failed to retrieve user details. Please enable claims or account role');
    });
  }
};
var loadFailure = function () {
  jQuery('#customers').html('<b>Failed to load data.  Check console log</b>');
};
var reloadData = function () {
  keycloak.updateToken(10)
    .success(loadData)
    .error(function() {
      jQuery('#customers').html('<b>Failed to load data.  User is logged out.</b>');
    });
};
jQuery(function() {
  jQuery.getJSON("example-public.json", function(config) {
    require(
      config.keycloak_url + "/js/keycloak.js", function() {
        keycloak = Keycloak('keycloak.json');
        keycloak.init({ onLoad: 'login-required' }).success(reloadData);
    });
  });
});
