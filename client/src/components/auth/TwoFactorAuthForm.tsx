import React, { useState } from 'react';
import { Box, Button, TextField, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PostRequest, apiUrl } from '../../services/Server';
import { error, otp } from '../../utils/signals';
import { TwoFactorAuthFormProps } from '../../utils/types'
import { useAuth } from '../../context/AuthContext';

export const TwoFactorAuthForm: React.FC<TwoFactorAuthFormProps> = ({ userId, onVerificationFail }) => {
  const navigate = useNavigate();
  const [canDisplayError, setCanDisplayError] = useState(false);
  const {login} = useAuth();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setCanDisplayError(false);
      const response = await PostRequest(`${apiUrl}/auth/verify-otp`, {
        userId,
        otp: otp.value,
      });

      if (response.ok) {
        otp.value = '';
        const data =await response.json();
        localStorage.setItem('jwtToken', data.token);
        login(data.userId);
        navigate('/');
      } else {
        error.value = (await response.json()).message;
        setCanDisplayError(true);
        onVerificationFail();
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      otp.value = '';
      setCanDisplayError(true);
    }
  };

  return (
    <div>
      <Box component="form" onSubmit={onSubmit}>
        <TextField
          required
          value={otp}
          id="outlined-required"
          label="One-Time Password (OTP)"
          type="text"
          onChange={(e) => (otp.value = e.target.value)}
        />
        {canDisplayError && <Alert severity="error">{error.value}</Alert>}
        <Button variant="contained" type="submit">
          Verify OTP
        </Button>
      </Box>
    </div>
  );
};
