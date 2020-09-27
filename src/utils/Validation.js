import * as yup from 'yup';

const ValidationScheme = yup.object().shape({
  email: yup.string().required().email().label('Email'),
  password: yup.string().required().min(8).max(50).label('Password'),
});

export default ValidationScheme;
