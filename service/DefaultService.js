'use strict';

const didKeyDriver = require('did-method-key').driver();

/**
 * Creates a DID.
 *
 * body CreateRequest  (optional)
 * returns CreateState
 **/
exports.create = function(body) {
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
              "keys" : [ ]
            }
          }
        };
        Object.keys(didDocument.keys).map(function(key, index) {
          var didDocumentKey = didDocument.keys[key];
          didDocumentKey.id = key;
          response.didState.secret.keys.push(didDocumentKey);
        });
        response.didState.secret.keys[0].purpose = ["authentication","assertionMethod","capabilityDelegation","capabilityInvocation"];
        response.didState.secret.keys[1].purpose = ["keyAgreement"];
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
