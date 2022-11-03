import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [state,setState]=useState({email:'',password:''})
  let navigate=useNavigate()
  const{email,password}=state;
  const handleSubmit= async(e)=>{
    e.preventDefault();
    //console.log(email,password);
    const url = 'http://localhost:5000/api/auth/login';
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",

      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({email,password})
    });
    const json = await response.json();

   //console.log(json);
   if(json.success===true){
    // save the token  and redirect
    localStorage.setItem('token',json.authtowken);
    navigate('/');

   }
   else{
    // alert or something
    alert("Invalid credentials");

   }

  }
  return (
    <div className=" d-flex  justify-content-center" >
      <div className="card bg-info">
        <div className="card-body" style={{height:"18rem",width:"18rem"}}>
          <form   onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                name='email'
                value={email}
                onChange={(e) => {
                  setState({ ...state, email: e.target.value });
                }}
                
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name='password'
                value={password}
                onChange={(e) => {
                  setState({ ...state, password: e.target.value });
                }}
              />
            </div>

            <button  type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
