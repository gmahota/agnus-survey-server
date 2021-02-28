
import bcrypt from "bcrypt";

import config from "../../config/crypto";

const hash = (value:any) =>
  bcrypt
    .hash(value, config.hashSaltRounds)

const compare = (value:any, hash:any) =>
  bcrypt.compare(value, hash)

export default{
  hash,
  compare,
}