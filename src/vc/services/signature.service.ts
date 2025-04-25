import { Injectable } from "@nestjs/common";
import { IVerifiableCredential } from "../dtos/verifiable-presentation.dto";
import { v4 as uuidv4 } from 'uuid';
import { DocumentLoaderService } from "./did-document-loader.service";
import * as vc from '@digitalcredentials/vc';
import { purposes } from 'jsonld-signatures';

@Injectable()
export class SignatureService {
    documentLoader: (url:string) => Promise<any>;

    constructor(
        private readonly documentLoaderService: DocumentLoaderService,
        private readonly trustServiceSuite: any,
      ) {
        
        this.documentLoader = this.documentLoaderService.loader;
      }

    async verifyCredential<VC>(credential: IVerifiableCredential<VC>) {
        return vc.verifyCredential({
            credential,
            challenge: uuidv4(),
            documentLoader: this.documentLoader,
            suite: this.trustServiceSuite,
            purpose: new purposes.AssertionProofPurpose(),
        })
    }
}