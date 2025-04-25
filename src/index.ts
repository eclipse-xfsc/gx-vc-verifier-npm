
export {
    Proof,
    VerifiablePresentation,
    IVerifiableCredential,
    VerifiableCredential
} from './vc/dtos/verifiable-presentation.dto';

export {
    Arrayify
} from './vc/decorators/arrayify.decorator';

export {
    AbstractDIDTrustServiceAdapter
} from './vc/adapters'

export {
    VerifiableCredentialModule
} from './vc/vc.module';

export {
    DocumentLoaderService
} from './vc/services/did-document-loader.service'

export {
    SignatureService
} from './vc/services/signature.service';

export type DidDocument<T> = {
    contextUrl: string | null;
    documentUrl: string;
    document: T;
};

export type PublicKey = {
    '@context': string;
    id: string;
    type: string;
    controller: string;
    publicKeyBase58: string;
};

export type Controller = {
    '@context': 'https://w3id.org/security/v2';
    id: string;
    assertionMethod: string[];
};

export interface DIDTrustServiceGateway {
    getParticipantKey(participantDID: string): Promise<any>
}
