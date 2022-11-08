const crypto = require("crypto");

const algorithm = process.env.ALGORITHM ?? "aes-256-ctr";
const secretKey = process.env.SECRETKEY ?? "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";

/**
 * this should return an object of iv and content
 * iv : 16 generated random bytes
 * content : encrypted text
 * @param text
 * @returns { Object }
 */
const encrypt = (text) => {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
};

/**
 * this should return an string of decrypted text
 * @param hash
 * @returns { String }
 */
const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, "hex")
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);

  return decrpyted.toString();
};

module.exports = {
  encrypt,
  decrypt,
};
