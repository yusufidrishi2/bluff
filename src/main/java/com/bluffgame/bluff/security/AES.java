package com.bluffgame.bluff.security;

import java.util.Base64;
import java.util.Base64.Decoder;
 
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.crypto.spec.IvParameterSpec;
 
public class AES {
 
    public static String decrypt(String strToDecrypt) {
        try {
            String actualEncryption = strToDecrypt.replace("-101-", "/");
            String key = "1622968606593162";
            String iv  = "1622968606593162";

            Decoder decoder = Base64.getDecoder();
            byte[] encrypted1 = decoder.decode(actualEncryption);
            Cipher cipher = Cipher.getInstance("AES/CBC/NoPadding");
            SecretKeySpec keyspec = new SecretKeySpec(key.getBytes(), "AES");
            IvParameterSpec ivspec = new IvParameterSpec(iv.getBytes());

            cipher.init(Cipher.DECRYPT_MODE, keyspec, ivspec);

            byte[] original = cipher.doFinal(encrypted1);
            String originalString = new String(original).trim();
            return originalString;
            
        } catch (Exception e) {
            System.out.println("[ERROR] Error while encrypting: " + e.toString());
        }
        return null;
    }
}
