import * as yup from 'yup';

const LoginVS = yup.object().shape({
  email: yup.string().required().email().label('Email'),
  password: yup.string().required().min(8).max(50).label('Password'),
});

const SignUpVS = yup.object().shape({
  name: yup.string().required().max(50).label('Name'),
  email: yup.string().required().email().label('Email'),
  password: yup.string().required().min(8).max(50).label('Password'),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Password do not match')
    .min(8)
    .max(50)
    .label('Confirm Password'),
});

const ForgotPasswordVS = yup.object().shape({
  email: yup.string().required().email().label('Email'),
});

const CreatePlaylistVS = yup.object().shape({
  title: yup
    .string()
    .required('Playlist title cannot be empty')
    .label('Playlist'),
});

export { LoginVS, SignUpVS, ForgotPasswordVS, CreatePlaylistVS };
