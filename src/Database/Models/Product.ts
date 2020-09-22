import { Document } from 'mongoose';

export interface IProduct extends Document {
  name: string,
  type: string,
  shortDescription: string,
  fullDescription: string,
  vendorId: string,
  keywords: string,
  isTaxExempt: boolean,
  price: number,
  oldPrice: number,
  catalogPrice: number,
  weight: number,
  length: number,
  width: number,
  height: number,
  createdAt: Date,
  updatedAt: Date,
  published: boolean,
  sold: number,
  viewed: number,
  onSale: number,
  pictures: Array<string>
}