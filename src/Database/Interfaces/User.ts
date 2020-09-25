//region Enums
export enum AddressTypes {
  HomeApartment,
  OrganCompany
}

//endregion

//region Interfaces
export interface IUser {
  _id?: string,
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
  role?: string,
  shoppingCartItems?: Array<IShoppingCartItem>,
  shippingAddresses?: Array<IShippingAddress>
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