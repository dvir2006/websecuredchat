import { Alert, Box, Button, Link, TextField } from "@mui/material";
import { RegisterProps } from "../../utils/types";
import { username, email, password, auth, error } from "../../utils/signals";
import { PostRequest, apiUrl } from "../../services/Server";
import { useHistory } from 'react-router-dom';
import { useEffect } from "react";

const Register: React.FC<RegisterProps> = () => { 
    const history = useHistory();

    useEffect(() => {
        error.value = "";
    }, []);

    const onSubmit = async () =>{
        error.value = "";
        const response = await PostRequest(`${apiUrl}/auth/register`, {username: username.value, email: email.value, password:password.value});
        if(response.ok) {
            password.value = "";
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
                    value={username.value}
                    id="outlined-required"
                    label="Username"
                />
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
                <Link href="/login">Already have an account, Click to login</Link>
                <Button variant="contained" type="submit">Submit</Button>
            </Box>
        </div>
    );
}

export default Register;
