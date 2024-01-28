import React, { useState } from "react";
import { Alert, Box, Button, Link, TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { RegisterProps } from "../../utils/types";
import { username, email, password, error } from "../../utils/signals";
import { PostRequest, apiUrl } from "../../services/Server";
import { useNavigate } from 'react-router-dom';

const Register: React.FC<RegisterProps> = () => {
    const navigate = useNavigate();
    const [canDisplayError, setCanDisplayError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setCanDisplayError(false);
        const response = await PostRequest(`${apiUrl}/auth/register`, { username: username.value, email: email.value, password: password.value });
        if (response.ok) {
            password.value = "";
            navigate('/');
        } else {
            error.value = (await response.json()).message;
            setCanDisplayError(true);
        }
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="auto"
        >
            <Box
                component="form"
                onSubmit={onSubmit}
                display="flex"
                flexDirection="column"
                alignItems="center"
                p={2}
                maxWidth={400}
                width="100%"
            >
                <TextField
                    required
                    value={username}
                    id="outlined-required"
                    label="Username"
                    onChange={(e) => (username.value = e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    required
                    value={email}
                    id="outlined-required"
                    type="email"
                    label="Email Address"
                    onChange={(e) => (email.value = e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    required
                    value={password}
                    id="outlined-required"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => (password.value = e.target.value)}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    onClick={handleTogglePasswordVisibility}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    sx={{ mb: 2 }}
                />
                {canDisplayError && <Alert severity="error">{error.value}</Alert>}
                <Link href="/login" variant="body2">Already have an account? Click here to login.</Link>
                <Button variant="contained" type="submit" fullWidth>Submit</Button>
            </Box>
        </Box>
    );
}

export default Register;
