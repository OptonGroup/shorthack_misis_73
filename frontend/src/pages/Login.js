import './Login.css'
import React, {useState} from 'react';
import { useNavigate } from "react-router";
import { fetchToken, setToken, setUser } from "../Auth";
import axios from "axios";

export default function SignUp(){
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //check to see if the fields are not empty
    const login = () => {
        if ((username === "") & (password === "")) {
        return;
        } else {
        // make api call to our backend. we'll leave thisfor later
            axios.get('http://5.42.220.238:8000/login', {
                params: {
                    'username': username,
                    'password': password
                },
                headers: {
                    'accept': 'application/json'
                }
            })
            .then(function (response) {
                if (response.data.status !== 'ok'){
                    alert(response.data.message)
                }
                console.log(response.data);
                if (response.data.token) {
                    setToken(response.data.token);
                    setUser(response.data);
                    navigate("/profile");
                }
            })
            .catch(function (error) {
                console.log(error, "error");
            });
        }
    };


    return (
        <div className="let_login container-fluid align-items-center">
            <form id='login_form'>
                <p className='display-5 text-center wtext text-bold'>MindSpace</p>
                <p className='display-6 text-center wtext text-regular'>log in</p>
                <div className='container d-flex dct'>

                    <div className='place_to_text'>
                        <p className='wtext m-0 fs-5'>Username</p>
                        <input className='text_input' type='text' onChange={(e) => setUsername(e.target.value)}/>
                    </div>

                    <div className='place_to_text'>
                        <p className='wtext m-0 fs-5'>Password</p>
                        <input className='text_input' type='text' onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <input className='button fs-3' type='button' value='log in' onClick={login}/>
                    <a className='fs-4 mt-3' href='/signup'>SignUp</a>
                </div>
            </form>
        </div>
    )
}