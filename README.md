![DIF Logo](https://raw.githubusercontent.com/decentralized-identity/universal-registrar/master/docs/logo-dif.png)

# Universal Registrar Driver: key

This is a [Universal Registrar](https://github.com/decentralized-identity/universal-registrar/) driver for **did:key** identifiers.

## Specifications

* [Decentralized Identifiers](https://w3c.github.io/did-core/)
* [DID Method Specification](https://w3c-ccg.github.io/did-method-v1/)

## Build and Run (Docker)

```
docker build -f ./docker/Dockerfile . -t universalregistrar/driver-did-key
docker run -p 9080:9080 universalregistrar/driver-did-key
```

## Driver Environment Variables

* `(none)`

## Driver Input Options

```
{
    "keyType": "Ed25519VerificationKey2018"
}
```

* `keyType`: The type of key to generate. Values: `Ed25519VerificationKey2018`, `EcdsaSecp256k1VerificationKey2019`, `Bls12381G1Key2020`, `Bls12381G2Key2020`

## Driver Output Metadata

```
(none)
```
