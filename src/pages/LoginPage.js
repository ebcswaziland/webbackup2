import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import PhoneSignInComponent from "./PhoneSignInComponent"; // Import the phone sign-in component

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const [showPhoneSignIn, setShowPhoneSignIn] = useState(true); // State to control phone sign-in component visibility

  const login = async () => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("currentUser", JSON.stringify(result));

      toast.success("Login successful");
      setLoading(false);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="login-parent">
      {loading && <Loader />}
      <div className="row justify-content-center">
        <div className="col-md-4 z1">
          <div className="login-form">
            <h2>Login</h2>

            <hr />

            {showPhoneSignIn ? (
              // Display the phone sign-in component when showPhoneSignIn is true
              <PhoneSignInComponent setShowPhoneSignIn={setShowPhoneSignIn} />
            ) : (
              <>
                <input
                  type="text"
                  className="form-control"
                  placeholder="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                <button className="my-3" onClick={login}>
                  LOGIN
                </button>
                <button
                  className="my-3"
                  onClick={() => setShowPhoneSignIn(true)}
                >
                  LOGIN WITH PHONE
                </button>
                <hr />
                {/* <Link to="/register">Click here to register</Link> */}
              </>
            )}
          </div>
        </div>

        <div className="col-md-5 z1">
          <lottie-player
            src="https://lottie.host/3d52034f-3d78-4398-a7da-8a41acf2cf6e/16qRvh7DGF.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
      <div className="login-bottom"></div>
    </div>
  );
}

export default LoginPage;
