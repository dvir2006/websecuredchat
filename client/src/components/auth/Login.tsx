import React from "react";
import { Box, Button, Link, TextField } from "@mui/material";
import { Alert } from "@mui/material";
import { LoginProps } from "../../utils/types";
import { email, error, password } from "../../utils/signals";
import { PostRequest, apiUrl } from "../../services/Server";
import { createRef, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from "../../context/AuthContext";
import { TwoFactorAuthForm } from './TwoFactorAuthForm';

const Login: React.FC<LoginProps> = () => {
    const [canDisplayError, setCanDisplayError] = useState(false);
    const [require2FA, setRequire2FA] = useState(false);
    const [userId, setUserId] = useState("");
    const { login } = useAuth();
    const recaptchaRef = createRef<ReCAPTCHA>();

    const resetRequire2FA = () => {
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
                />
                <Box mb={2} />
                <TextField
                    required
                    value={password}
                    id="outlined-required"
                    label="Password"
                    type="password"
                    onChange={(e) => (password.value = e.target.value)}
                    fullWidth
                />
                <Box mb={2} />
                {canDisplayError && <Alert severity="error">{error.value}</Alert>}
                <ReCAPTCHA ref={recaptchaRef} sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" />
                <Button variant="contained" type="submit" fullWidth>
                    Submit
                </Button>
            </Box>
            {require2FA && <TwoFactorAuthForm userId={userId} onVerificationFail={resetRequire2FA} />}
            <Box mt={2}>
                <Link href="/register" variant="body2">
                    Don't have an account? Register here.
                </Link>
            </Box>
        </Box>
    );
}

export default Login;
