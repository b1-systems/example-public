# example-public

## Installation

```bash
git clone https://tk-sls.de/gitlab/golang-oidc/example-public.git
cd example-public
sudo mkdir /var/www/example-public
sudo cp \
    index.css \
    index.html \
    index.js \
    jquery.*.js \
    require.js \
    silent-check-sso.html \
    /var/www/example-public
```

## Configuration

1. Create public client application "example-public" in Keycloak.
   * Set access type to "public".
   * Set Valid Redirect URIs to a wildcard below the publicly accessible URL of your installation of "example-public", for example "https://www.example.test/example-public/*"
2. In Keycloak, in client "example-public", switch to tab "Installation".
3. Download client configuration in format "Keycloak JSON".
4. Copy `keycloak.json` to `/var/www/example-public`.
5. Create configuration file `example-public.json` as shown in example below:
   * `example_public_url`: Public URL of `example-public`. Should correspond to your setting of "Valid Redirect URIs" in step 1.
   * `keycloak_url`: URL of Keycloak, normally identical to the value of `auth-server-url` in `keycloak.json`.

```
{ "example_public_url": "https://www.example.test/example-public",
  "keycloak_url": "https://www.example.test/keycloak"}
```

