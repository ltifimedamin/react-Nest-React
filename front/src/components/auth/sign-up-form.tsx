// 'use client';

// import * as React from 'react';
// import RouterLink from 'next/link';
// import { useRouter } from 'next/navigation';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import Alert from '@mui/material/Alert';
// import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Link from '@mui/material/Link';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import { MenuItem, Select } from '@mui/material';
// import { parseISO } from 'date-fns';

// import { paths } from '@/paths';
// import { authClient } from '@/lib/auth/client';
// import { useUser } from '@/hooks/use-user';

// const validationSchema = Yup.object({
//   email: Yup.string().email('Invalid email address').required('Email is required'),
//   password: Yup.string().min(6, 'Password should be at least 6 characters').required('Password is required'),
//   terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions').required('You must accept the terms and conditions'),
//   nom: Yup.string().required('Nom is required'),
//   prenom: Yup.string().required('Prenom is required'),
//   role: Yup.string().required('Role is required'),
//   tel: Yup.string().matches(/^[0-9]{8}$/, 'The phone number must be exactly 8 digits long').required('Tel is required'),
//   ddn: Yup.date().required('Date of birth is required'),
//   genre: Yup.string().required('Genre is required'),
//   image: Yup.string().required('Image is required'),
//   address: Yup.string().required('Address is required'),
// });

// const defaultValues = {
//   email: '',
//   password: '',
//   terms: false,
//   nom: '',
//   prenom: '',
//   role: '',
//   tel: '',
//   ddn: '', // Default to empty string for Formik's initial value
//   genre: '',
//   image: '',
//   address: '',
// };

// const genderOptions = [
//   { value: 'female', label: 'Femme' },
//   { value: 'male', label: 'Homme' },
// ];

// export function SignUpForm(): React.JSX.Element {
//   const router = useRouter();
//   const { checkSession } = useUser();
//   const [isPending, setIsPending] = React.useState<boolean>(false);
//   const [serverError, setServerError] = React.useState<string | null>(null);

//   const onSubmit = async (values, { setSubmitting, setErrors }) => {
//     setIsPending(true);
//     setServerError(null);

//     values.ddn = parseISO(values.ddn); // Parse date string to Date object

//     const { error } = await authClient.signUp(values);

//     if (error) {
//       setServerError(error);
//       setIsPending(false);
//       setSubmitting(false);
//       return;
//     }

//     await checkSession?.();
//     router.refresh();
//   };

//   return (
//     <Stack spacing={3}>
//       <Stack spacing={1}>
//         <Typography variant="h4">Sign up</Typography>
//         <Typography color="text.secondary" variant="body2">
//           Already have an account?{' '}
//           <Link component={RouterLink} href={paths.auth.signIn} underline="hover" variant="subtitle2">
//             Sign in
//           </Link>
//         </Typography>
//       </Stack>
//       <Formik
//         initialValues={defaultValues}
//         validationSchema={validationSchema}
//         onSubmit={onSubmit}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <Stack spacing={2}>
//               <div>
//                 <Field name="email" type="email" placeholder="Email Address" />
//                 <ErrorMessage name="email" component="div" />
//               </div>
//               <div>
//                 <Field name="password" type="password" placeholder="Password" />
//                 <ErrorMessage name="password" component="div" />
//               </div>
//               <div>
//                 <FormControlLabel
//                   control={<Field name="terms" type="checkbox" as={Checkbox} />}
//                   label={
//                     <React.Fragment>
//                       I have read the <Link>terms and conditions</Link>
//                     </React.Fragment>
//                   }
//                 />
//                 <ErrorMessage name="terms" component="div" />
//               </div>
//               <div>
//                 <Field name="nom" type="text" placeholder="Nom" />
//                 <ErrorMessage name="nom" component="div" />
//               </div>
//               <div>
//                 <Field name="prenom" type="text" placeholder="Prenom" />
//                 <ErrorMessage name="prenom" component="div" />
//               </div>
//               {/* <div>
//                 <Field name="role" type="text" placeholder="Role" />
//                 <ErrorMessage name="role" component="div" />
//               </div> */}
//               <div>
//                 <Field name="role" as="select" placeholder="Role">
//                   <option value="" label="Select role" />
//                   <option value="radiothérapeute">Radiothérapeute</option>
//                   <option value="chirurgien">Chirurgien</option>
//                   <option value="chimiothérapeute">Chimiothérapeute</option>
//                   <option value="technicien">Technicien</option>
//                   <option value="physicien">Physicien</option>
//                 </Field>
//                 <ErrorMessage name="role" component="div" />
//               </div>
//               <div>
//                 <Field name="tel" type="text" placeholder="Tel" />
//                 <ErrorMessage name="tel" component="div" />
//               </div>
//               <div>
//                 <Field name="ddn" type="date" placeholder="Date of Birth" />
//                 <ErrorMessage name="ddn" component="div" />
//               </div>
//               <div>
//                 <Field name="genre" as="select">
//                   <option value="" label="Select gender" />
//                   {genderOptions.map(option => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </Field>
//                 <ErrorMessage name="genre" component="div" />
//               </div>
//               <div>
//                 <Field name="image" type="text" placeholder="Image" />
//                 <ErrorMessage name="image" component="div" />
//               </div>
//               <div>
//                 <Field name="address" type="text" placeholder="Address" />
//                 <ErrorMessage name="address" component="div" />
//               </div>
//               {serverError && <Alert severity="error">{serverError}</Alert>}
//               <Button disabled={isSubmitting || isPending} type="submit" variant="contained">
//                 Sign up
//               </Button>
//             </Stack>
//           </Form>
//         )}
//       </Formik>
//       <Alert color="warning">Created users are not persisted</Alert>
//     </Stack>
//   );
// }




'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MenuItem, Select } from '@mui/material';
import { parseISO } from 'date-fns';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password should be at least 6 characters').required('Password is required'),
  terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions').required('You must accept the terms and conditions'),
  nom: Yup.string().required('Nom is required'),
  prenom: Yup.string().required('Prenom is required'),
  role: Yup.string().required('Role is required'),
  tel: Yup.string().matches(/^[0-9]{8}$/, 'The phone number must be exactly 8 digits long').required('Tel is required'),
  ddn: Yup.date().required('Date of birth is required'),
  genre: Yup.string().required('Genre is required'),
  image: Yup.string(),
  address: Yup.string().required('Address is required'),
});

const defaultValues = {
  email: '',
  password: '',
  terms: false,
  nom: '',
  prenom: '',
  role: '',
  tel: '',
  ddn: '', // Default to empty string for Formik's initial value
  genre: '',
  image: '',
  address: '',
};

const genderOptions = [
  { value: 'female', label: 'Femme' },
  { value: 'male', label: 'Homme' },
];

export function SignUpForm(): React.JSX.Element {
  const router = useRouter();
  const { checkSession } = useUser();
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    setIsPending(true);
    setServerError(null);

    values.ddn = parseISO(values.ddn); // Parse date string to Date object

    const { error } = await authClient.signUp({ ...values, image: imageUrl });

    if (error) {
      setServerError(error);
      setIsPending(false);
      setSubmitting(false);
      return;
    }

    await checkSession?.();
    router.refresh();
  };

  const handleImageUpload = (event) => {
    const file = event.currentTarget.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign up</Typography>
        <Typography color="text.secondary" variant="body2">
          Already have an account?{' '}
          <Link component={RouterLink} href={paths.auth.signIn} underline="hover" variant="subtitle2">
            Sign in
          </Link>
        </Typography>
      </Stack>
      <Formik
        initialValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing={2}>
              <div>
                <Field name="email" type="email" placeholder="Email Address" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <Field name="password" type="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" />
              </div>
              <div>
                <FormControlLabel
                  control={<Field name="terms" type="checkbox" as={Checkbox} />}
                  label={
                    <React.Fragment>
                      I have read the <Link>terms and conditions</Link>
                    </React.Fragment>
                  }
                />
                <ErrorMessage name="terms" component="div" />
              </div>
              <div>
                <Field name="nom" type="text" placeholder="Nom" />
                <ErrorMessage name="nom" component="div" />
              </div>
              <div>
                <Field name="prenom" type="text" placeholder="Prenom" />
                <ErrorMessage name="prenom" component="div" />
              </div>
              <div>
                <Field name="role" as="select" placeholder="Role">
                  <option value="" label="Select role" />
                  <option value="radiothérapeute">Radiothérapeute</option>
                  <option value="chirurgien">Chirurgien</option>
                  <option value="chimiothérapeute">Chimiothérapeute</option>
                  <option value="technicien">Technicien</option>
                  <option value="physicien">Physicien</option>
                </Field>
                <ErrorMessage name="role" component="div" />
              </div>
              <div>
                <Field name="tel" type="text" placeholder="Tel" />
                <ErrorMessage name="tel" component="div" />
              </div>
              <div>
                <Field name="ddn" type="date" placeholder="Date of Birth" />
                <ErrorMessage name="ddn" component="div" />
              </div>
              <div>
                <Field name="genre" as="select">
                  <option value="" label="Select gender" />
                  {genderOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="genre" component="div" />
              </div>
              <div>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <ErrorMessage name="image" component="div" />
              </div>
              <div>
                <Field name="address" type="text" placeholder="Address" />
                <ErrorMessage name="address" component="div" />
              </div>
              {/* {serverError && <Alert severity="error">{serverError}</Alert>} */}
              <Button disabled={isSubmitting || isPending} type="submit" variant="contained">
                Sign up
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
      <Alert color="warning">Created users are not persisted</Alert>
    </Stack>
  );
}


