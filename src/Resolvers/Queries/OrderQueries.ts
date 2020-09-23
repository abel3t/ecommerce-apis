import { Order, IOrder } from 'Database/Models';
//
// interface IUser {
//   name: string,
//   age: number
// }

export default {
  getOrder: async (_a: any, args: IOrder): Promise<IOrder | null> => {
    return Order.findOneByName(args.name);
  },
  createOrder: async () => {
    const order: IOrder = {
      name: 'ABV'
    };
    await Order.createOrder(order);
    return 'OK';
  },
  getHello: async () => 'Hello World'
};