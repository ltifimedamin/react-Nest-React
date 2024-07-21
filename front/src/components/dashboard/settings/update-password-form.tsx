// 'use client';

// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardHeader from '@mui/material/CardHeader';
// import Divider from '@mui/material/Divider';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Stack from '@mui/material/Stack';

// export function UpdatePasswordForm(): React.JSX.Element {
//   return (
//     <form
//       onSubmit={(event) => {
//         event.preventDefault();
//       }}
//     >
//       <Card>
//         <CardHeader subheader="Update password" title="Password" />
//         <Divider />
//         <CardContent>
//           <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
//             <FormControl fullWidth>
//               <InputLabel>Password</InputLabel>
//               <OutlinedInput label="Password" name="password" type="password" />
//             </FormControl>
//             <FormControl fullWidth>
//               <InputLabel>Confirm password</InputLabel>
//               <OutlinedInput label="Confirm password" name="confirmPassword" type="password" />
//             </FormControl>
//           </Stack>
//         </CardContent>
//         <Divider />
//         <CardActions sx={{ justifyContent: 'flex-end' }}>
//           <Button variant="contained">Update</Button>
//         </CardActions>
//       </Card>
//     </form>
//   );
// }
'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

export function UpdatePasswordForm(): React.JSX.Element {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const userId = localStorage.getItem('userId');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!userId) {
      alert('User ID not found');
      return;
    }

    const response = await fetch('http://localhost:3000/auth/change-password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        oldPassword,
        newPassword,
      }),
    });

    if (response.ok) {
      alert('Password updated successfully');
    } else {
      const errorData = await response.json();
      console.error('Failed to update password', errorData);
      alert(`Failed to update password: ${errorData.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
            <FormControl fullWidth>
              <InputLabel>Old Password</InputLabel>
              <OutlinedInput
                label="Old Password"
                name="oldPassword"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>New Password</InputLabel>
              <OutlinedInput
                label="New Password"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormControl>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">Update</Button>
        </CardActions>
      </Card>
    </form>
  );
}
