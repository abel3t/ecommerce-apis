import { model, Schema } from 'mongoose';

import { IUser } from 'Database/Interfaces';
import logger from 'Core/Logger';
import { SAVE_USER_ERROR, USER_EXISTED, WRONG_EMAIL_PASSWORD } from 'Core/Constant';

const schema = new Schema<IUser>({
  name: { type: Schema.Types.String, trim: true, required: true },
  userName: { type: Schema.Types.String, trim: true, required: true },
  email: { type: Schema.Types.String, trim: true, required: true },
  hash: { type: Schema.Types.String, trim: true, required: true },
  salt: { type: Schema.Types.String, trim: true, required: true },
  profilePictureUrl: { type: Schema.Types.String, trim: true },
  deleted: { type: Schema.Types.Boolean, default: false },
  active: { type: Schema.Types.Boolean, default: true },
  lastLogin: { type: Schema.Types.Date },
  lastActivity: { type: Schema.Types.Date },
  createdAt: { type: Schema.Types.Date },
  UpdatedAt: { type: Schema.Types.Date },
  role: { type: Schema.Types.String },
  shoppingCartItems: [
    {
      productId: {
        type: Schema.Types.String, trim: true, required: true, ref: 'Product',
      },
    } ],
  shippingAddresses: [
    {
      address: { type: Schema.Types.String, trim: true },
      districtTown: { type: Schema.Types.String, trim: true },
      name: { type: Schema.Types.String, trim: true },
      phone: { type: Schema.Types.String, trim: true },
      provinceCity: { type: Schema.Types.String, trim: true },
      type: { type: Schema.Types.String, enum: [ 0, 1 ] },
      wardCommune: { type: Schema.Types.String, trim: true },
    } ],
});

export default class User {
  protected static readonly _schema = model('User', schema, 'Users');

  public static async createUser(user: IUser): Promise<IUser> {
    const existedUser = await this._schema.findOne({
      email: user.email, active: true,
    });

    if (existedUser) {
      throw new Error(USER_EXISTED);
    }

    let result: any;
    await this.save(user)
      .then(data => result = data as IUser)
      .catch(error => {
        logger.info(error);
        throw new Error(SAVE_USER_ERROR);
      });

    return result;
  }

  public static async signInWithEmailAndPassword(email: string): Promise<IUser> {
    const existedUser = await this._schema.findOne({
      email,
      active: true,
    }) as IUser | null;
    if (!existedUser) {
      throw Error(WRONG_EMAIL_PASSWORD);
    }
    return existedUser;
  }

  private static save(user: IUser): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      const userModel = new this._schema(user);
      userModel.save()
        .then((data: any) => resolve(data))
        .catch(error => reject(error));
    });
  }
}