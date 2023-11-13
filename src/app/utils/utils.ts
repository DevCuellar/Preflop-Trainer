import * as CryptoJS from 'crypto-js';

export function dameAleatorio(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// ---------------------------------------------------------------------------------------------------
// -- ENCRIPTACION
// ---------------------------------------------------------------------------------------------------
const FRASE_SECRETA =
  'QSB9sgUaWokJcAl532kksUh91MppKVUzEAfYkG3BT3VXWAOlCPS4LP2vzWaUl4vKvn0r1FsJdZ8WaB3b';

export function encriptar(texto: string) {
  const encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(texto.toString()),
    FRASE_SECRETA,
    {
      keySize: 128 / 8,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }
  );

  return encrypted.toString();
}

export function desencriptar(texto: string) {
  try{
    const decrypted = CryptoJS.AES.decrypt(texto, FRASE_SECRETA, {
      keySize: 128 / 8,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  
    return decrypted.toString(CryptoJS.enc.Utf8);
  }catch(ex){
    return ''
  }
}

// ---------------------------------------------------------------------------------------------------
// -- LOCAL STORAGE
// ---------------------------------------------------------------------------------------------------
export function grabarLocalStorage(key: string, valor: string) {
  let valorEncriptado = encriptar(valor);
  localStorage.setItem(key, valorEncriptado);
}

export function leerLocalStorage(key: string): string {
  return desencriptar(localStorage.getItem(key));
}

export function existeLocalStorage(key: string): boolean {
  return localStorage.getItem(key) !== null;
}

export function eliminarLocalStorage(key: string) {
  localStorage.removeItem(key);
}

// ---------------------------------------------------------------------------------------------------
// -- DELAY...
// ---------------------------------------------------------------------------------------------------
export function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
