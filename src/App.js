import './App.css';
import React, { useState } from "react";
import copy from "copy-to-clipboard";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

function PassGen() {
  let [txt, setTxt] = useState("");
  let passLen = 10;
  const copyToClipboard = () => {
    copy(txt);
    toast.info(`Password Copied!`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
  };

  const passGenerator = () => {
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_+~|:;?,.-";
    let password = "";
    for (let i = 0; i < passLen; i++) {
      password += charset[Math.floor(Math.random() * charset.length)];
    }
    txt = setTxt(password);
  }


  return (
    <>
      <div className="col-12 input-group">
        <input id="pwd" className="form-control" name="password" type="text" value={txt} onChange={ e => setTxt(e.target.value) }/>
        {document.queryCommandSupported('copy') && <a onClick={copyToClipboard}>
          <div className="input-group-append">
            <span className="input-group-text">
              Copy
            </span>
          </div>
        </a>}
        <a className="btn btn-primary btn-lg btn-block" onClick={passGenerator}>
          Generate new password!
        </a>
      </div>
    </>
  )
}

function App() {
  return (
    <div className="outer">
      <div className="middle">
        <div className="inner">
          <h2>
            Password generator!
          </h2>
            <PassGen/>
        </div>
      </div>
    </div>
  );
}

export default App;
