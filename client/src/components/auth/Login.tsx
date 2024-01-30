import React, { useState } from "react";
import { Box, Button, Link, TextField, IconButton, InputAdornment, Typography } from "@mui/material";
import { Alert } from "@mui/material";
import { LoginProps } from "../../utils/types";
import { email, error, password, username } from "../../utils/signals";
import { PostRequest, apiUrl } from "../../services/Server";
import { createRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from "../../context/AuthContext";
import { TwoFactorAuthForm } from './TwoFactorAuthForm';
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login: React.FC<LoginProps> = () => {
    const [canDisplayError, setCanDisplayError] = useState(false);
    const [require2FA, setRequire2FA] = useState(false);
    const [userId, setUserId] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const recaptchaRef = createRef<ReCAPTCHA>();

    const resetRequire2FA = () => {
        setRequire2FA(false);
    };

    const handleOtpDisplayed = () => {
        setRequire2FA(false);
    };

    useEffect(() => {
        setCanDisplayError(false);
    }, []);

    async function onCaptcha(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        const captchaValue = recaptchaRef.current?.getValue();

        if (!captchaValue) {
            alert("Please verify the reCAPTCHA!");
        } else {
            setCanDisplayError(false);
            const response = await PostRequest(`${apiUrl}/auth/login`, { email: email.value, password: password.value });
            if (response.ok) {
                password.value = "";
                const data = await response.json();
                if (data.require2FA) {
                    setRequire2FA(true);
                    setUserId(data.userId);
                    username.value = data.username;
                } else {
                    const token = data.token;
                    localStorage.setItem('jwtToken', token);
                    login(data.userId);
                }
            } else {
                error.value = (await response.json()).message;
                setCanDisplayError(true);
            }
        }
    }

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="auto"
            padding="5%"
        >
            {require2FA? <Typography variant="h4" gutterBottom>2FA</Typography> : <Typography variant="h4" gutterBottom>Login</Typography>}
            {!require2FA && (
                <Box
                    component="form"
                    onSubmit={onCaptcha}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    p={2}
                    maxWidth={400}
                    width="100%"
                >
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
                    <Box width="100%" display="flex" justifyContent="center" mb={2}>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                        />
                    </Box>
                    <Button variant="contained" type="submit" fullWidth>
                        Submit
                    </Button>
                </Box>
            )}
            {require2FA && <TwoFactorAuthForm userId={userId} onVerificationFail={resetRequire2FA} />}
            {require2FA && (
                <Box mt={2}>
                    <Link component="button" variant="body2" onClick={() => setRequire2FA(false)}>
                        Return to Login
                    </Link>
                </Box>
            )}
            {!require2FA && (
                <Box mt={2} alignItems="center">
                    <Link href="/register" variant="body2">
                        Don't have an account? Register here.
                    </Link>
                </Box>
            )}
        </Box>
    );
}

export default Login;
