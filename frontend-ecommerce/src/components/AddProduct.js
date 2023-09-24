import React, { useState, } from "react";
import {useNavigate } from "react-router-dom";

const AddProduct = ()=>{
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [company, setCompany] = useState("")
    const [error, setError] = useState(false)
    const navigate = useNavigate();
    const addProductFunction =async ()=>{
        if(!name || !price || !category || !company){
            setError(true)
            return false;
        }


    const userId = JSON.parse(localStorage.getItem("user"))._id;
        let result = await fetch('http://localhost:5000/add-product',{
            method:'post',
            body: JSON.stringify({name, price, category, company, userId}),
            headers:{
                'Content-Type':'application/json',
                Authorization:`bearer: ${JSON.parse(localStorage.getItem("token"))}`
            },
        });
        result = await result.json();
        console.log(result);
        navigate("/")
    }
    return (
        <div className="addProduct">
            <h1>Add Product</h1>
            <input placeholder="Enter Name" className="inputBox" onChange={(e)=>setName(e.target.value)}></input>
            {error && !name && <span className="invalidInput">Enter valid Name</span>}
            <input placeholder="Enter Price" className="inputBox" onChange={(e)=>setPrice(e.target.value)}></input>
            {error && !price && <span className="invalidInput">Enter valid price</span>}
            <input placeholder="Enter Category" className="inputBox" onChange={(e)=>setCategory(e.target.value)}></input>
            {error && !category && <span className="invalidInput">Enter valid category</span>}
            <input placeholder="Enter Company" className="inputBox" onChange={(e)=>setCompany(e.target.value)}></input>
            {error && !company && <span className="invalidInput">Enter valid company</span>}
            <button className="appButton" onClick={addProductFunction}>Add product</button>
        </div>
    )
}

export default AddProduct;