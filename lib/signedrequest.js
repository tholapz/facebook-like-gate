var crypto = require('crypto');

SignedRequest = (function() {

  function SignedRequest(secret, request) {
    this.secret = secret;
    this.request = request;
    this.verify = this.verify.bind(this);

    var parts = this.request.split('.');
    this.encodedSignature = parts[0];
    this.encoded = parts[1];
    this.signature = this.base64decode(this.encodedSignature);
    this.decoded = this.base64decode(this.encoded);
    this.data = JSON.parse(this.decoded);
  }

  SignedRequest.prototype.verify = function() {
    if (this.data.algorithm !== 'HMAC-SHA256') {
      return false;
    }
    var hmac = crypto.createHmac('SHA256', this.secret);
    hmac.update(this.encoded);
    var result = hmac.digest('base64').replace(/\//g, '_').replace(/\+/g, '-').replace(/\=/g, '');
    return result === this.encodedSignature;
  };

  SignedRequest.prototype.base64encode = function(data) {
    return new Buffer(data, 'utf8').toString('base64').replace(/\//g, '_').replace(/\+/g, '-').replace(/\=/g, '');
  };

  SignedRequest.prototype.base64decode = function(data) {
    while (data.length % 4 !== 0) {
      data += '=';
    }
    data = data.replace(/-/g, '+').replace(/_/g, '/');
    return new Buffer(data, 'base64').toString('utf-8');
  };

  return SignedRequest;

})();

module.exports = SignedRequest;