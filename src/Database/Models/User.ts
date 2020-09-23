import { model, Schema } from 'mongoose';

//region Enums
export enum AddressTypes {
  HomeApartment,
  OrganCompany
}

//endregion

//region Interfaces
export interface IUser {
  name: string,
  userName: string,
  email: string,
  hash: string,
  salt: string,
  profilePictureUrl?: string,
  deleted?: boolean,
  active?: boolean,
  lastLogin?: Date,
  lastActivity?: Date,
  createdAt?: Date,
  UpdatedAt?: Date,
  roles?: Array<IRole>,
  shoppingCartItems?: Array<IShoppingCartItem>,
  shippingAddresses?: Array<IShippingAddress>
}

interface IRole {
  name: string,
  freeShipping?: boolean,
  taxExempt?: boolean,
  active?: boolean,
  minOrderAmount?: number,
  maxOrderAmount?: number
}

interface IShoppingCartItem {
  productId: string,
  quantity: number,
  createdAt?: Date
}

export interface IShippingAddress {
  address: string;
  districtTown: string;
  name: string;
  phone: string;
  provinceCity: string;
  type: AddressTypes;
  wardCommune: string;
}

//endregion

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
  shoppingCartItems: [
    {
      productId: {
        type: Schema.Types.String,
        trim: true,
        required: true,
        ref: 'Product'
      }
    }
  ],
  shippingAddresses: [
    {
      address: { type: Schema.Types.String, trim: true },
      districtTown: { type: Schema.Types.String, trim: true },
      name: { type: Schema.Types.String, trim: true },
      phone: { type: Schema.Types.String, trim: true },
      provinceCity: { type: Schema.Types.String, trim: true },
      type: { type: Schema.Types.String, enum: [ 0, 1 ] },
      wardCommune: { type: Schema.Types.String, trim: true }
    }
  ]
});

export default class User {
  protected static readonly _schema = model('User', schema, 'Users');

  public static async createUser(user: IUser): Promise<IUser | null> {
    const existedUser = await this._schema.findOne({
      email: user.email,
      active: true
    });

    if (existedUser) {
      throw new Error('User is existed!');
    }

    let result: any;
    await this.save(user)
      .then(data => result = data as IUser)
      .catch(error => {
        console.log(error);
        throw new Error('Save user error!');
      });

    return result;
  }

  private static save(user: IUser): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      const userModel = new this._schema(user);
      userModel.save()
        .then((data: any) => resolve(data))
        .catch(error => reject(error));
    });
  }

  public static async findOneByEmail(email: string): Promise<IUser | null> {
    return await this._schema.findOne({
      email,
      active: true
    }) as IUser | null;
  }
}