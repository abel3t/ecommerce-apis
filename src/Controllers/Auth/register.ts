import User, { IUser } from 'Database/Models/User';

interface IRegisterInput {
  name: string,
  userName: string
  email: string
  password: string
}

export async function register(_: any,
  { registerInput: { name, userName, email, password } }: { registerInput: IRegisterInput }
): Promise<IUser | null> {
  const user: IUser = {
    name,
    userName,
    email,
    hash: '12367',
    salt: '234567890'
  };
  console.log(password);

  return await User.createUser(user);
}