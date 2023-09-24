import React, { useEffect, useState, } from "react";
import {useNavigate, useParams } from "react-router-dom";

const UpdateProduct = ()=>{
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [company, setCompany] = useState("")
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getResult();
    }, [])
    const getResult = async()=>{
        let result =await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                Authorization:`bearer: ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result =await result.json();
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }
    const updateProductFunction = async()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method:'put',
            body: JSON.stringify({name, price, category, company}),
            headers:{
                'Content-Type':'application/json',
                Authorization:`bearer: ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        navigate("/")
    }
    return (
        <div className="addProduct">
            <h1>Update Product</h1>
            <input value={name} placeholder="Enter Name" className="inputBox" onChange={(e)=>setName(e.target.value)}></input>
            <input value={price} placeholder="Enter Price" className="inputBox" onChange={(e)=>setPrice(e.target.value)}></input>
            <input value={category} placeholder="Enter Category" className="inputBox" onChange={(e)=>setCategory(e.target.value)}></input>
            <input value={company} placeholder="Enter Company" className="inputBox" onChange={(e)=>setCompany(e.target.value)}></input>
            <button className="appButton" onClick={updateProductFunction}>Update product</button>
        </div>
    )
}

export default UpdateProduct;