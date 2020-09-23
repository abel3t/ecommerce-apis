import { Order } from '../../Database/Models';

export default {
  createUser: async () => {
    (<any>Order).createOrder({ name: 'test' });
    return 'OK';
  }
};