import { Alert, Box, Button, Link, TextField } from "@mui/material";
import { LoginProps } from "../../utils/types";
import { auth, email, error, password } from "../../utils/signals";
import { useHistory } from "react-router-dom";
import { PostRequest, apiUrl } from "../../services/Server";
import { useEffect } from "react";

const Login: React.FC<LoginProps> = () => {
    const history = useHistory();

    useEffect(() => {
        error.value = "";
    }, []);

    const onSubmit = async () =>{
        error.value = "";
        const response = await PostRequest(`${apiUrl}/auth/login`, {email: email.value, password:password.value});
        if(response.ok) {
            password.value = "";
            const jsonBody = await response.json();
            localStorage.setItem('jwtToken', jsonBody.token);
            auth.value.isLoggedIn = true;
            history.push('/'); 
        }
        else{
            error.value =  await response.text();
        }
    }
    return (
        <div>
            <Box component="form" onSubmit={onSubmit}>
                <TextField
                    required
                    value={email.value}
                    id="outlined-required"
                    type="email"
                    label="Email Address"
                />
                <TextField
                    required
                    value={password.value}
                    id="outlined-required"
                    label="Password"
                    type="password"
                />
                <Alert severity="error" hidden={error.value===''}>{error.value}</Alert>
                <Link href="/register">Don't have an account, Click to Register</Link>
                <Button variant="contained" type="submit">Submit</Button>
            </Box>
        </div>
    );
}

export default Login;
