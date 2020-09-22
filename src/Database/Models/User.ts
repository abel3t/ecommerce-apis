import { model, Schema, Document } from 'mongoose';

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'users';

interface IRole {
  name: string,
  freeShipping: boolean,
  taxExempt: boolean,
  active: boolean,
  minOrderAmount: number,
  maxOrderAmount: number
}

enum AddressType {
  HomeApartment,
  OrganCompany
}

interface IShoppingCartItem {
  productId: string,
  quantity: number,
  createdAt: Date
}

class ShippingAddress {
  address: string;
  districtTown: string;
  name: string;
  phone: string;
  provinceCity: string;
  type: AddressType;
  wardCommune: string;
}

export default interface User extends Document {
  name: string,
  userName: string,
  email: string,
  hash: string,
  salt: string,
  profilePictureUrl: string,
  deleted?: boolean,
  active?: boolean,
  lastLogin?: Date,
  lastActivity?: Date,
  createdAt?: Date,
  UpdatedAt?: Date,
  roles: Array<IRole>,
  shoppingCartItems: Array<IShoppingCartItem>,
  shippingAddresses: Array<ShippingAddress>
}

const schema = new Schema({
  name: {
    type: Schema.Types.String,
    trim: true,
    required: true
  },
  userName: {
    type: Schema.Types.String,
    trim: true,
    required: true
  },
  email: {
    type: Schema.Types.String,
    trim: true,
    required: true
  },
  hash: {
    type: Schema.Types.String,
    trim: true,
    required: true
  },
  salt: {
    type: Schema.Types.String,
    trim: true,
    required: true
  },
  profilePictureUrl: {
    type: Schema.Types.String,
    trim: true,
    required: true
  },
  deleted: {
    type: Schema.Types.Boolean,
    default: false
  },
  active: {
    type: Schema.Types.Boolean,
    default: true
  },
  lastLogin: {
    type: Schema.Types.Date
  },
  lastActivity: {
    type: Schema.Types.Date
  },
  createdAt: {
    type: Schema.Types.Date
  },
  UpdatedAt: {
    type: Schema.Types.Date
  },
  shoppingCartItems: [
    {
      productId: {
        type: Schema.Types.String,
        required: true,
        ref: 'Product'
      }
    }
  ],
  shippingAddresses: [
    {
      type: ShippingAddress
    }
  ]
});

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);