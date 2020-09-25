import { register } from 'Controllers/Auth';
import { signIn } from 'Controllers/Auth';

export default {
  Query: {
    hello
  },
  Mutation: {
    hello,
    register,
    signIn
  },
  Subscription: {
    hello
  }
};

function hello() {
  return 'Hello World!';
}