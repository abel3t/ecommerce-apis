import crypto from 'crypto';

import { IUser } from 'Database/Interfaces';
import { User } from 'Database/Models';

interface IRegisterInput {
  name: string,
  userName: string
  email: string
  password: string
}

export async function register(_: any,
  { registerInput: { name, userName, email, password } }: { registerInput: IRegisterInput }
): Promise<IUser | null> {

  const salt: string = crypto.randomBytes(16).toString('hex');
  const hash: string = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
  const user: IUser = {
    name,
    userName,
    email,
    hash,
    salt
  };

  return await User.createUser(user);
}