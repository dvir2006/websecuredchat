import { Alert, Box, Button, Link, TextField } from "@mui/material";
import { RegisterProps } from "../../utils/types";
import { username, email, password, auth, error } from "../../utils/signals";
import { PostRequest, apiUrl } from "../../services/Server";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { effect } from "@preact/signals";

const Register: React.FC<RegisterProps> = () => { 
    const navigate = useNavigate();
    const [canDisplayError,setCanDisplayError] = useState(false);
    


    useEffect(() => {
        setCanDisplayError(false);
    }, []);


    const onSubmit = async (event:React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        setCanDisplayError(false);
        const response = await PostRequest(`${apiUrl}/auth/register`, {username: username.value, email: email.value, password:password.value});
        if(response.ok) {
            password.value = "";
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
                    value={username}
                    id="outlined-required"
                    label="Username"
                    onChange={(e) => username.value = e.target.value}
                />
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
                <Link href="/login">Already have an account, Click to login</Link>
                <Button variant="contained" type="submit">Submit</Button>
            </Box>
        </div>
    );
}

export default Register;
