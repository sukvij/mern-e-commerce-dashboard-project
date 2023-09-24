import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ()=>{

    useEffect(()=>{
        const auth= localStorage.getItem("user");
        if(auth){
            navigate("/")
        }
    })

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const collectData=async()=>{
        let result = await fetch('http://localhost:5000/register',{
            method:'post',
            body: JSON.stringify({name, email, password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        if(result){
            localStorage.setItem("user", JSON.stringify(result.result))
            localStorage.setItem("token", JSON.stringify(result.auth))
            navigate("/")
        }
    }
    return (
        <div className="signUp">
            <h1>SignUp Page</h1>
            <input className="inputBox" type="text" placeholder="Enter Name" 
                value={name} onChange={(e)=>setName(e.target.value)} ></input>
            <input className="inputBox" type="text" placeholder="Enter Email"
              value={email} onChange={(e)=>setEmail(e.target.value)} ></input>
            <input className="inputBox" type="password" placeholder="Enter Password"
               value={password} onChange={(e)=>setPassword(e.target.value)} ></input>
            <button className="appButton" onClick={collectData}>SignUp</button>
        </div>
    )
}

export default SignUp;