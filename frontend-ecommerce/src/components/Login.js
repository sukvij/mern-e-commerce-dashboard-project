import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
    useEffect(()=>{
        const auth= localStorage.getItem("user");
        if(auth){
            navigate("/")
        }
    })
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const handleLogin = async ()=>{
        let result = await fetch('http://localhost:5000/login',{
            method:'post',
            body: JSON.stringify({email, password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        if(result.auth){
            localStorage.setItem("user", JSON.stringify(result.user))
            localStorage.setItem("token", JSON.stringify(result.auth))
            navigate("/")
        }
    }
    return (
        <div className="login">
            <input type="text" placeholder="enter email" className="inputBox"
             value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <input type="password" placeholder="enter password" className="inputBox"
             value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <button onClick={handleLogin} className="appButton">SignIn</button>
        </div>
    )
}

export default Login;