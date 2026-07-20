import { env } from "../../config/env";
import { AesGcmEncryptor } from "./encryption";

export const encryptor = new AesGcmEncryptor(
  env.security.cacheEncryptionKey
);