import { Module } from "@nestjs/common";
import { DIDTrustServiceGateway } from "..";
import { DIDTrustServiceAdapter } from "./adapters/did-trust-service.adapter";
import { DocumentLoaderService } from "./services/did-document-loader.service";
import { SignatureService } from "./services/signature.service";
import { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } from "./vc.module-builder";

export interface VerifiableCredentialModuleOptions {
    didTrustServiceGateway: DIDTrustServiceGateway
}

@Module({
    providers: [
        DocumentLoaderService,
        {
            provide: DIDTrustServiceAdapter,
            inject: [MODULE_OPTIONS_TOKEN],
            useFactory: (moduleOptions: VerifiableCredentialModuleOptions) => {
                return new DIDTrustServiceAdapter(moduleOptions?.didTrustServiceGateway)
            }
        },
        {
            provide: SignatureService,
            useFactory: async (
                documentLoaderService: DocumentLoaderService,
            ) => {
                const { Ed25519Signature2018 } = await import('@digitalbazaar/ed25519-signature-2018');
                return new SignatureService(documentLoaderService, [
                    new Ed25519Signature2018(),
                ]);
            },
            inject: [DocumentLoaderService],
        }
    ],
    exports: [
        SignatureService, DocumentLoaderService
    ],

})
export class VerifiableCredentialModule extends ConfigurableModuleClass {
};