import { Alert, Box, Button, Link, TextField } from "@mui/material";
import { LoginProps } from "../../utils/types";
import { auth, email, error, password, username } from "../../utils/signals";
import { useNavigate } from "react-router-dom";
import { PostRequest, apiUrl } from "../../services/Server";
import { createRef, useEffect, useRef, useState } from "react";
import { effect } from "@preact/signals";
import { useAuth } from "../../context/AuthContext";
import ReCAPTCHA from "react-google-recaptcha";
import { TwoFactorAuthForm } from './TwoFactorAuthForm';


const Login: React.FC<LoginProps> = () => {
    const navigate = useNavigate();

    const [canDisplayError,setCanDisplayError] = useState(false);
    const [require2FA, setRequire2FA] = useState(false);
    const [userId, setUserId] = useState("");
    
    const {login} = useAuth();
    const recaptchaRef = createRef<ReCAPTCHA>();


    useEffect(() => {
        setCanDisplayError(false);
    }, []);


    const onSubmit = async (event:React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        
        
        setCanDisplayError(false);
        const response = await PostRequest(`${apiUrl}/auth/login`, {email: email.value, password:password.value});
        if(response.ok) {
            password.value = "";
            const data = await response.json();
            username.value = data.username;
            if (require2FA) {
                setRequire2FA(false);
                setUserId(data.userId);
            } 
            else{
                const token = data.token;
                localStorage.setItem('jwtToken', token);
                login(data.userId);
                navigate('/'); 
            }
        }
        else{
            error.value =  (await response.json()).message;
            setCanDisplayError(true);
        }
    }
    async function onCaptcha(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        const captchaValue = recaptchaRef.current?.getValue();

        if (!captchaValue) {

            alert("Please verify the reCAPTCHA!");

        } else {
            setCanDisplayError(false);
            const response = await PostRequest(`${apiUrl}/auth/login`, {email: email.value, password:password.value});
            if(response.ok) {
                password.value = "";
                const data = await response.json();
                const token = data.token;
                username.value = data.username;
                localStorage.setItem('jwtToken', token);
                login(data.userId);
                navigate('/'); 
            }
            else{
                error.value =  (await response.json()).message;
                setCanDisplayError(true);
            }
        }
    }

    return (
        <div>
            <Box component="form" onSubmit={onCaptcha}>
                <TextField
                    required
                    value={email}
                    id="outlined-required"
                    type="email"
                    label="Email Address"
                    onChange={(e) => email.value = e.target.value}
                />
                <TextField
                    required
                    value={password}
                    id="outlined-required"
                    label="Password"
                    type="password"
                    onChange={(e) => password.value = e.target.value}
                />
                {canDisplayError &&<Alert severity="error">{error.value}</Alert>}
                <Link href="/register">Don't have an account, Click to Register</Link>
                <Button variant="contained" type="submit">Submit</Button>
                <ReCAPTCHA ref={recaptchaRef} sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" />
                {require2FA && <TwoFactorAuthForm userId={ userId } />}
            </Box>
        </div>
    );
}

export default Login;
