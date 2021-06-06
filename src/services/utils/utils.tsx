import * as CryptoJS from'crypto-js';

export class Utils {

    static encryptData(data: string): string {
        let key  = CryptoJS.enc.Latin1.parse('1622968606593162');
        let iv   = CryptoJS.enc.Latin1.parse('1622968606593162');

        let encryptedPlayerId = CryptoJS.AES.encrypt(
            data,
            key,
            {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding:CryptoJS.pad.ZeroPadding
            }
        ).toString().replace('/', '-101-');
        return encryptedPlayerId;    
    }

    static decryptData(encryptedData: string) {
        let key  = CryptoJS.enc.Latin1.parse('1622968606593162');
        let iv   = CryptoJS.enc.Latin1.parse('1622968606593162');

        let actualEncryptedData = encryptedData.replace('-101-', '/');
        let decrypted = CryptoJS.AES.decrypt(
            actualEncryptedData,
            key,
            {
                iv: iv,
                padding: CryptoJS.pad.ZeroPadding
            }
        ).toString(CryptoJS.enc.Utf8);
        return decrypted;
    }
}