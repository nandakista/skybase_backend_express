/**
 * AES-GCM Encryption Utility
 * 
 * Handles encryption and decryption of session data using AES-256-GCM algorithm.
 * Compatible with the encryption format used by other services.
 * 
 * How to Use:
 * Encryption Data:
 * const encryptedPayload = encryptor.encrypt(payload)
 * 
 * Decryption Data:
 * const decryptedSymbol = encryptor.decrypt<string>(encryptedPayload);
 */

import crypto from 'crypto';

export class EncryptionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EncryptionError';
  }
}

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

export class AesGcmEncryptor {
  private readonly key: Buffer;

  constructor(encryptionKey: string) {
    if (!encryptionKey) {
      throw new EncryptionError('Encryption key is required');
    }
    this.key = this.resolveKey(encryptionKey);
  }

  encrypt<T>(data: T): string {
    try {
      const iv = crypto.randomBytes(IV_LENGTH);
      const cipher = crypto.createCipheriv(ALGORITHM, this.key, iv);

      const serialized = Buffer.from(JSON.stringify(data), 'utf8');
      const encrypted = Buffer.concat([cipher.update(serialized), cipher.final()]);
      const authTag = cipher.getAuthTag();

      const payload = Buffer.concat([iv, authTag, encrypted]);
      return payload.toString('base64');
    } catch (error) {
      throw new EncryptionError(
        error instanceof Error ? error.message : 'Failed to encrypt payload',
      );
    }
  }

  decrypt<T>(payload: string): T {
    try {
      const buffer = Buffer.from(payload, 'base64');

      const iv = buffer.subarray(0, IV_LENGTH);
      const authTag = buffer.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
      const ciphertext = buffer.subarray(IV_LENGTH + AUTH_TAG_LENGTH);

      const decipher = crypto.createDecipheriv(ALGORITHM, this.key, iv);
      decipher.setAuthTag(authTag);

      const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
      return JSON.parse(decrypted.toString('utf8')) as T;
    } catch (error) {
      throw new EncryptionError(
        error instanceof Error ? error.message : 'Failed to decrypt payload',
      );
    }
  }

  private resolveKey(encryptionKey: string): Buffer {
    const trimmed = encryptionKey.trim();
    const candidates: Buffer[] = [];

    if (this.isBase64(trimmed)) {
      candidates.push(Buffer.from(trimmed, 'base64'));
    }

    if (this.isHex(trimmed)) {
      candidates.push(Buffer.from(trimmed, 'hex'));
    }

    candidates.push(Buffer.from(trimmed, 'utf8'));

    const keyBuffer = candidates.find((candidate) => candidate.length === 32);
    if (!keyBuffer) {
      throw new EncryptionError('Encryption key must resolve to 32 bytes for AES-256 encryption');
    }

    return keyBuffer;
  }

  private isBase64(value: string): boolean {
    if (value.length % 4 !== 0) {
      return false;
    }

    return /^[A-Za-z0-9+/=]+$/.test(value);
  }

  private isHex(value: string): boolean {
    return value.length % 2 === 0 && /^[0-9a-fA-F]+$/.test(value);
  }
}

