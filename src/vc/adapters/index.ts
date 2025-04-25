import { Controller, DidDocument, PublicKey } from "../..";

export abstract class AbstractDIDTrustServiceAdapter {
    abstract getParticipantPublicKey(participantDID: string): Promise<DidDocument<PublicKey>>;
    abstract isParticipantKeyDID(participantDID: string): Promise<boolean>;
    abstract getControllerDIDDocument(controllerDID: string): Promise<DidDocument<Controller>>;
    abstract isControllerDID(controllerDID: string): Promise<boolean>;
  }