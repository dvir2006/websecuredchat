import { Alert, Box, Button, Link, TextField } from "@mui/material";
import { LoginProps } from "../../utils/types";
import { auth, email, error, password } from "../../utils/signals";
import { useNavigate } from "react-router-dom";
import { PostRequest, apiUrl } from "../../services/Server";
import { useEffect, useState } from "react";
import { effect } from "@preact/signals";
import { useAuth } from "../../context/AuthContext";

const Login: React.FC<LoginProps> = () => {
    const navigate = useNavigate();

    const [canDisplayError,setCanDisplayError] = useState(false);
    
    const {login} = useAuth();

    useEffect(() => {
        setCanDisplayError(false);
    }, []);
    

    const onSubmit = async (event:React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        setCanDisplayError(false);
        const response = await PostRequest(`${apiUrl}/auth/login`, {email: email.value, password:password.value});
        if(response.ok) {
            password.value = "";
            const token = (await response.json()).token;
            localStorage.setItem('jwtToken', token);
            login();
            navigate('/'); 
        }
        else{
            error.value =  (await response.json()).message;
            setCanDisplayError(true);
        }
    }
    return (
        <div>
            <Box component="form" onSubmit={onSubmit}>
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
            </Box>
        </div>
    );
}

export default Login;
