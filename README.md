
# Nestjs module that will validate Verifiable Credentials (https://www.w3.org/TR/vc-data-model/) signatures in GAIA-X namespace.

  Currently supports only ed25519 signature verification

## Open Items:
- DIDTrustServiceAdapter needs to be implemented
```
getParticipantPublicKey(participantDID: string): Promise<DidDocument<PublicKey>> // should adjust Trust Service Gateway response to DidDocument<PublicKey>

isParticipantKeyDID(participantDID: string) // should return true when specified did is a participant did

getControllerDIDDocument(controller: string): Promise<DidDocument<Controller>> // should return host's/current's verifier DID document

isControllerDID(controllerDID: string): Promise<boolean> // should return true when speficied controller's did

```
## Installation
```
npm install gaiax-vc
```
## Prerequisites
Host application should install peer dependencies
`class-transformer, @nestjs/common` - this module ships with `@Decorator` style validators and decorator metadata will not be shared with host application otherwise.
ED25519 Signature dependencies. (updating these versions will not work)
```
"@digitalbazaar/ed25519-signature-2018": "^2.1.0",

"@digitalbazaar/ed25519-verification-key-2018": "^3.2.0",

"@digitalcredentials/vc": "^4.1.1"
```
## Usage
```
#Setup
import { DIDTrustServiceGateway,  VerifiableCredentialModule } from  'gaiax-vc';
// module has dependency on DIDTrustServiceGateway interface that should be provider upon registration

VerifiableCredentialModule.registerAsync({
	imports: [AgreementModule],
	inject: [TrustServiceGateway],
	useFactory: (didTrustServiceGateway: DIDTrustServiceGateway) => {
	return { didTrustServiceGateway }
	}
});

#Exports - SignatureService
import { SignatureService } from  'gaiax-vc';

const { results, verified } = await  this.signatureService.verifyCredential(presentation.verifiableCredential[0]);

#Exports - DocumentLoaderService for resolving GAIA-X participants' public key did documents
import { DocumentLoaderService  as  GaiaxDocumentLoaderService } from  'gaiax-vc';
import { extendContextLoader } from  'jsonld-signatures';

@Injectable()
export  class  DocumentLoaderService {
protected  gaiaxDocumentLoader: (url:string)=>Promise<any>

constructor(documentLoaderService: GaiaxDocumentLoaderService) {
	this.gaiaxDocumentLoader = documentLoaderService.loader
}

get loader(): () => Promise<any> {
	return  extendContextLoader(async (url: string) => {
		// you custom loader here
		return  this.gaiaxDocumentLoader(url); // this will take care of GAIA-X participant did documents
		})
	}
}


```

## Local development

Use [yalc](https://github.com/wclr/yalc) instead of `npm link`

```
cd gaiax-vc
npm install yalc -g

# cd to your app
yalc add @gaia-x/gaia-x-vc

cd gaiax-vc
# make changes
yalc publish --push