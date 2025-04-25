import { Inject, Injectable } from "@nestjs/common";
import { AbstractDIDTrustServiceAdapter } from ".";
import { Controller, DidDocument, PublicKey, DIDTrustServiceGateway } from "../..";
import { VerifiableCredentialModuleOptions } from "../vc.module";
import { MODULE_OPTIONS_TOKEN } from "../vc.module-builder";



@Injectable()
export class DIDTrustServiceAdapter implements AbstractDIDTrustServiceAdapter {

    constructor(private readonly trustServiceGateway: DIDTrustServiceGateway) {
    }

    /**
   * Retrieve public keys of any Participant
   * @param participantDID
   * @returns
   */
    async getParticipantPublicKey(participantDID: string): Promise<DidDocument<PublicKey>> {
        const document = (await this.trustServiceGateway.getParticipantKey(participantDID)) as any;
        return {
            contextUrl: null,
            documentUrl: participantDID,
            document: {
                '@context': 'https://w3id.org/security/suites/ed25519-2018/v1',
                ...document,
            },
        };
    }

    /**
     * Verifies if participant match
     * @param participantDID
     * @returns
     */
    async isParticipantKeyDID(participantDID: string) {
        return participantDID.match(/^did:(provider|consumer):key:123/) !== null;
    }

    /**
     * Verifies if Document matches
     * @param controller
     * @returns
     */
    async getControllerDIDDocument(controller: string): Promise<DidDocument<Controller>> {
        const type = /did:(\w+):controller/gi.exec(controller)[1];
        return {
            contextUrl: null,
            documentUrl: controller,
            document: {
                '@context': 'https://w3id.org/security/v2',
                id: `did:${type}:controller`,
                assertionMethod: [`did:${type}:key:123`],
            },
        };
    }

    /**
     * Verifies if controllerDID matches
     * @param controllerDID
     * @returns
     */
    async isControllerDID(controllerDID: string): Promise<boolean> {
        return controllerDID.match(/^did:(provider|consumer):controller$/) !== null;
    }
}