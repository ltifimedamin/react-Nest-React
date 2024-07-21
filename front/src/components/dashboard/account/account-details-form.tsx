'use client';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Divider, FormControl, Grid, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import axios from 'axios';

const AccountForm: React.FC = () => {
  const [user, setUser] = useState({
    nom: '',
    prenom: '',
    role: '',
    tel: '',
    ddn: '',
    genre: '',
    image: '',
    address: '',
  });

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios.get(`/auth/getUserById/${userId}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the user data!', error);
      });
  }, [userId]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.put(`/auth/edit/${userId}`, user)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error)
        console.error('There was an error updating the profile!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>First Name</InputLabel>
                <OutlinedInput name="nom" value={user.nom} onChange={handleChange} label="First Name" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Last Name</InputLabel>
                <OutlinedInput name="prenom" value={user.prenom} onChange={handleChange} label="Last Name" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <OutlinedInput name="role" value={user.role} onChange={handleChange} label="Role" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Phone</InputLabel>
                <OutlinedInput name="tel" value={user.tel} onChange={handleChange} label="Phone" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Date of Birth</InputLabel>
                <OutlinedInput name="ddn" value={user.ddn} onChange={handleChange} label="Date of Birth" type="date" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <OutlinedInput name="genre" value={user.genre} onChange={handleChange} label="Gender" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Image URL</InputLabel>
                <OutlinedInput name="image" value={user.image} onChange={handleChange} label="Image URL" />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Address</InputLabel>
                <OutlinedInput name="address" value={user.address} onChange={handleChange} label="Address" />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">Save details</Button>
        </CardActions>
      </Card>
    </form>
  );
};

export function AccountDetailsForm(): React.JSX.Element {
  return <AccountForm />;
}
