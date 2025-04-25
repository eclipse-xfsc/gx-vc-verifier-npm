import { ConfigurableModuleBuilder } from '@nestjs/common';
import { VerifiableCredentialModuleOptions } from './vc.module';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, ASYNC_OPTIONS_TYPE } =
    new ConfigurableModuleBuilder<VerifiableCredentialModuleOptions>().build();