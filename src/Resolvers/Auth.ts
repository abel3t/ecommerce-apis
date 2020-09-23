import { register } from 'Controllers/Auth';

export default {
  Query: {
    hello
  },
  Mutation: {
    hello,
    register,
  },
  Subscription: {
    hello
  }
};

function hello() {
  return 'Hello World!';
}