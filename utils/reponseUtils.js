exports.actionGetVerificationMethodResponse = function(type) {
    const publicKeyJwkTemplate = publicKeyJwkTemplateForType(type);
    console.log("publicKeyJwkTemplate for type " + type + ": " + JSON.stringify(publicKeyJwkTemplate));
    return {
        "jobId": null,
        "didState": {
            "state": "action",
            "action": "getVerificationMethod",
            "verificationMethodTemplate": [{
                "id": "#temp",
                "type": "JsonWebKey2020",
                "purpose": ["authentication"],
                "publicKeyJwk": publicKeyJwkTemplate
            }]
        }
    };
}

const publicKeyJwkTemplateForType = function(type) {
    if (type) type = type.toLowerCase();
    switch(type) {
        case 'secp256k1':
            return {
                "kty": "EC",
                "crv": "secp256k1"
            };
        case 'ed25519':
            return {
                "kty": "OKP",
                "crv": "Ed25519"
            };
        default:
            throw "Unknown key type: " + type;
    }
}
