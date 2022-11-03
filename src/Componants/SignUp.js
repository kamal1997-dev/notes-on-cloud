import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



const SignUp = () => {
  const[state,setState]=useState({name:'',email:'',password:'',cpassword:''});
  const {name,email,password,cpassword}=state;
  const navigate=useNavigate();
  const handleSubmit= async(e)=>{
    e.preventDefault();
    //console.log({state});
    
    const url = 'http://localhost:5000/api/auth/createuser';
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",

      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({name,email,password,cpassword})
    });
    const json = await response.json();
    //console.log(json);
    
    if(json.success){
      localStorage.setItem('token',json.authtowken)
      navigate('/')
    }
    else{

    }
    

  }
  return (
    <div className=" d-flex  justify-content-center" >
      <div className="card bg-info">
        <div className="card-body" style={{width:"18rem"}}>
          <form    onSubmit={handleSubmit}>
          <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="Name"
                aria-describedby="emailHelp"
                name='name'
                value={name}
                onChange={(e) => {
                  setState({ ...state, name: e.target.value });
                }}
                
                
              />
            </div>
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
                required
                minLength={5}
                
                
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                 Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="cpassword"
                name='cpassword'
              
                value={cpassword}
                onChange={(e) => {
                  setState({ ...state, cpassword: e.target.value });
                }}
                
                
              />
            </div>

            <button  type="submit" className="btn btn-primary">
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp