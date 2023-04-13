import React, { useState, useEffect } from "react";
import { generateSecret, encryptSecret, decryptSecret } from "./secretUtils";
import './pop.css';

const Popup = () => {
  const [secret, setSecret] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [initialized, setInitialized] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerificationMode, setIsVerificationMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); 
  const [message, setMessage] = useState({});

  useEffect(() => {
    const storedSecret = localStorage.getItem("secret");
    if (storedSecret) {
      setSecret(storedSecret)
      setIsVerificationMode(true);
      setInitialized(true);
    }else {
      const initialSecret = generateSecret( Math.floor(Math.random(10)*100));
      setSecret(initialSecret);
    }
  }, [secret === "", initialized]);

  const handleGenerateSecret = () => {
    const newSecret =  generateSecret( Math.floor(Math.random(10)*100)); 
    setSecret(newSecret);
    const encryptedSecret = encryptSecret(newSecret, password); 
    localStorage.setItem("secret", encryptedSecret);
  };

  const handleSaveSecret = () => {
    const encryptedSecret = encryptSecret(secret, password); 
    localStorage.setItem("secret", encryptedSecret);
    setInitialized(true);
    setIsVerificationMode(true);
  };

  const handleVerifyPassword = () => {
    const decryptedSecret = decryptSecret(localStorage.getItem("secret"), password);
    if (decryptedSecret) {
      setSecret(decryptedSecret);
      setIsLoggedIn(true);
      setIsVerificationMode(false);
    }else {
      setMessage({error: "Password is not valid"});
      setTimeout(() => {
         setMessage({})
      },5000)
    }
  };

  const handleLogout = (props) => {
    setIsLoggedIn(false);
    setPassword("");
    setConfirmPassword("");
    setSecret("");
    setInitialized(false)
    setIsOpen(false)
    props === 'yes'&& localStorage.removeItem("secret"); 
    setModalOpen(false)
  };

  return (
    <>
      {!initialized && (
        <div className="secret">
          {!isOpen && (
            <div className="secret__noOpen"> 
              <p>Your secret is:</p>
              <div className="secret__noOpen--token">{secret}</div>
              <button onClick={() => setIsOpen(true)}>Next</button>
            </div>
          )}
          {isOpen && (
            <div className="secret__open">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={4}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={4}
              />
             <button onClick={handleSaveSecret} disabled={password !== confirmPassword || password.length < 4}>
                Save Secret
              </button>
            </div>

          )}
        </div>
      )}
      {initialized && !isLoggedIn && !isVerificationMode && (
        <div className="saveSecret">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => handleSaveSecret}>
            Save Secret
          </button>
        </div>
      )}
      {initialized && isLoggedIn && !isVerificationMode && (
        <div className="initialized">
          <p>Your secret is:</p>
          <p className="initialized__secret">{secret}</p>
          <div>
            <button onClick={() => handleGenerateSecret()}>New secret</button>
            <button onClick={() => setModalOpen(true)}>Log out</button>

          </div>

        </div>
      )}
      {initialized && isVerificationMode && (
        <>
         <span className={`${message.error && "error"}`}>{message.error}</span>
      
        <div className="verifyPassword"> 
  
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> 
          <button onClick={handleVerifyPassword}>
            Verify Password
          </button>
         
        </div>
        </>
      )}
      <div className={`modal${modalOpen ? '--open' : ''}`}>
        <div className="modal__data">
        <span>Logout</span>
        <div>Do you want to reset the data?</div>
        <button onClick={() => handleLogout('yes')}>Yes</button>
        <button onClick={() => handleLogout('no')}>No, just logout</button></div>
      </div>
    </>
  );
      }  

export default Popup;
