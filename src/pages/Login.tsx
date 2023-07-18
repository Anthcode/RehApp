import * as React from 'react';

export default function Login() {
  return (

   
    <div className="login">

     
        <form className="form-login">
        <div className="login-header">
          <h2>Login</h2>
      
          </div>
         
          <div className="input-div">
            <input
              type="email"
              placeholder="your@email.com"
              name="email"
            />
            <input
              type="password"
              placeholder="passwd"
              name="passwd"
            />
          </div>
          <button className="btn-google">
            <div className="login-header">
            &nbsp;Sign in with Google
            </div>
          </button>
          <button
            className="btn-login"
          >
          </button>
          <button className="btn-register">
            Register
          </button>
        </form>

    </div>
   
  );
}
