# example-public

## Installation

```bash
git clone https://github.com/b1-systems/example-public.git
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
2. Set Capabilty config  -> Client authentication to Off
3. Set Valid Redirect URIs to a wildcard below the publicly accessible URL of your installation of "example-public", for example https://www.example.test/example-public/*
4. In Keycloak, in client "example-public", ckick Action (upper right corner) -> Download client configuration in format "Keycloak JSON".
5. Copy `keycloak.json` to `/var/www/example-public`.
6. Create configuration file `example-public.json` as shown in example below:
   * `example_public_url`: Public URL of `example-public`. Should correspond to your setting of "Valid Redirect URIs" in step 1.
   * `keycloak_url`: URL of Keycloak, normally identical to the value of `auth-server-url` in `keycloak.json`.

```
{ "example_public_url": "https://www.example.test/example-public",
  "keycloak_url": "https://www.example.test/keycloak"}
```

## Author, Copyright and License

* Copyright: 2022 B1 Systems GmbH <info@b1-systems.de>
* Author: Tilman Kranz <tilman.kranz@b1-systems.de>
* License: MIT License <https://opensource.org/licenses/MIT>
