import * as vc from '@digitalcredentials/vc';
import { Injectable } from "@nestjs/common";
import { extendContextLoader } from 'jsonld-signatures';
import { DIDTrustServiceAdapter } from '../adapters/did-trust-service.adapter';

@Injectable()
export class DocumentLoaderService {

    constructor(private readonly trustServiceAdapter: DIDTrustServiceAdapter) { }

    get loader(): () => Promise<any> {
        return extendContextLoader(async (url: string) => {
            if (await this.trustServiceAdapter.isControllerDID(url)) {
                return this.trustServiceAdapter.getControllerDIDDocument(url);
            }
            if (await this.trustServiceAdapter.isParticipantKeyDID(url)) {
                return this.trustServiceAdapter.getParticipantPublicKey(url);
            }
            return vc.defaultDocumentLoader(url);
        })
    }
}