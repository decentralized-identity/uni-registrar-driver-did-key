'use strict';

const didKeyDriver = require('@transmute/did-key.js');
const responseUtils = require('../utils/reponseUtils.js');
const crypto = require('crypto');

const purposes = [
    'authentication',
    'assertionMethod',
    'capabilityInvocation',
    'capabilityDelegation',
    'keyAgreement'
]

/**
 * Creates a DID.
 *
 * body CreateRequest  (optional)
 * returns CreateState
 **/
exports.create = function (body) {
    const clientSecretMode = body.options.clientSecretMode;
    let type = body.options.keyType || 'ed25519';
    const seed = body.secret.seed;
    return new Promise(function (resolve, reject) {
        try {
            if (clientSecretMode === true) {
                if (! type) type = "Ed25519";

                const response = responseUtils.actionGetVerificationMethodResponse(type);
                resolve(response);
                return;
            }
            const generateOptions = {
                secureRandom: () => {
                    if (seed)
                        return Buffer.from(seed);
                    else
                        return crypto.randomBytes(32);
                }
            };
            const resolutionOptions = {
                accept: 'application/did+json'  // the did-key.js library returns different verification methods depending on media type...
            };
            didKeyDriver.generate(type, generateOptions, resolutionOptions)
                .then(function (response) {
                    console.log(JSON.stringify(response));
                    const didDocument = response.didDocument;
                    const keys = response.keys;
                    if (didDocument) {
                        var response = {
                            "jobId": null,
                            "didState": {
                                "did": didDocument.id,
                                "state": "finished",
                                "secret": {
                                    "verificationMethod": []
                                }
                            }
                        };
                        keys.map(function (key, index) {
                            key.publicKeyJwk = undefined;
                            key.purpose = [];
                            purposes.forEach(purpose => {
                                if (didDocument[purpose] && didDocument[purpose].includes(key.id)) {
                                    key.purpose.push(purpose);
                                }
                            });
                            response.didState.secret.verificationMethod.push(key);
                        });
                        resolve(response);
                    } else {
                        resolve(404);
                    }
                })
                .catch(function (response) {
                    console.log("CATCH: " + response);
                    resolve({code: 500, payload: '' + response});
                });
        } catch (e) {
            console.log("ERROR: " + e);
            resolve({code: 500, payload: '' + e});
        }
    });
}

/**
 * Updates a DID.
 *
 * body UpdateRequest  (optional)
 * returns UpdateState
 **/
exports.update = function (body) {
    return new Promise(function (resolve, reject) {
        reject("Not implemented");
    });
}

/**
 * Deactivates a DID.
 *
 * body DeactivateRequest  (optional)
 * returns DeactivateState
 **/
exports.deactivate = function (body) {
    return new Promise(function (resolve, reject) {
        reject("Not implemented");
    });
}
