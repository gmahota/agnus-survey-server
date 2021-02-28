import jwt, { Secret, SignOptions } from "jsonwebtoken";
import config from "../../config/crypto";

const signOptions: SignOptions = {
  algorithm: "RS256",
  expiresIn: config.jwt.duration,
};

const sign = (payload: any) => jwt.sign(payload, config.jwt.privateKey);

const verify = (token: any) => {
  jwt.verify(
    token,
    config.jwt.publicKey,
  );
};

export default {
  sign,
  verify,
};
