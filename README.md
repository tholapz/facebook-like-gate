# POC Facebook Like-Gate handler

## Usage

Install: `npm install`

create ssl certificate using openssl and put it in sslcert/ [instruction here](https://devcenter.heroku.com/articles/ssl-certificate-self)

Run: `npm start`, you may need a root permission since it will fire up a HTTPS server at port 443

reference:
[signed_request verifier lib](http://stackoverflow.com/questions/11977989/get-signed-request-in-node-js-express-facebook-canvas-app)
