'use strict';

const didKeyDriver = require('did-method-key').driver();

/**
 * Deactivates a DID.
 *
 * body DeactivateRequest  (optional)
 * returns DeactivateState
 **/
exports.deactivate = function(body) {
  return new Promise(function(resolve, reject) {
    reject("Not implemented");
  });
}


/**
 * Registers a DID.
 *
 * body RegisterRequest  (optional)
 * returns RegisterState
 **/
exports.register = function(body) {
  return new Promise(function(resolve, reject) {
    didKeyDriver.generate()
    .then(function(didDocument) {
      if (didDocument) {
        var response = {
          "jobId" : null,
          "didState" : {
            "identifier" : didDocument.id,
            "state" : "finished",
            "secret" : {
              "keys" : [ didDocument.keys ]
            }
          }
        };
        resolve(response);
      } else {
        resolve(404);
      }
    })
    .catch(function (response) {
      resolve({code:500, payload:''+response});
    });
  });
}


/**
 * Updates a DID.
 *
 * body UpdateRequest  (optional)
 * returns UpdateState
 **/
exports.update = function(body) {
  return new Promise(function(resolve, reject) {
    reject("Not implemented");
  });
}

