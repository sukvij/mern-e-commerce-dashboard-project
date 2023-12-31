import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = ()=>{
    const[products, setProducts] = useState([])
    useEffect(()=>{
        getProducts();
    },[])

    const getProducts =async ()=>{
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                Authorization:`bearer: ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result = await result.json();
        setProducts(result)
    }

    const deleteProduct =async (id)=>{
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method:'delete',
            Authorization:`bearer: ${JSON.parse(localStorage.getItem("token"))}`
        });
        result =await result.json()
        if(result){
            getProducts()
        }
    }
    const searchHandle = async (event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/product/search/${key}`,{
                headers:{
                    Authorization:`bearer: ${JSON.parse(localStorage.getItem("token"))}`
                }
            })
            result = await result.json();
            if(result){
                setProducts(result)
            }
        }else{
            getProducts();
        }
    }
    return(
        <div className="product-list">
            <h1>Product list</h1>
            <input type="text" placeholder="Search Product" className="search-product-box"
                onChange={searchHandle}></input>
            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                products.length>0?products.map((item, index)=>
                <ul key={item._id}>
                    <li>{index+1}</li>
                    <li>{item.name}</li>
                    <li>Rs. {item.price}</li>
                    <li>{item.category}</li>
                    <li>{item.company}</li>
                    <li><button onClick={()=>deleteProduct(item._id)}>delete</button>
                        <Link to={"/update/"+item._id}> Update</Link>
                    </li>
                </ul>
                ):<h1>No record found</h1>
            }
        </div>
    )
}

export default ProductList;