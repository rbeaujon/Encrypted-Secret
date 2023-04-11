import CryptoJS from 'crypto-js';

export function generateSecret(length) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let secret = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    secret += charset[randomIndex];
  }
  return secret;
}

export function encryptSecret(secretToCrypt, password) {
  const secretCrypto = CryptoJS.AES.encrypt(secretToCrypt, password).toString();
  return secretCrypto;
}

export function decryptSecret(secret, password) {
  try {
    const bytes = CryptoJS.AES.decrypt(secret, password);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
  } catch (e) {
    console.error(e);
    return null;
  }
}
