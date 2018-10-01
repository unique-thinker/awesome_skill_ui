import BaseValidation from '@/mixins/validations/Base';
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';

export default {
  mixins: [BaseValidation],
  validations: {
    username: {
      required,
      minLen: minLength(3),
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLen: minLength(6),
    },
    passwordConfirmation: {
      required,
      minLen: minLength(6),
      sameAs: sameAs('password'),
    },
  },
};
