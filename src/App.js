import './App.css';
import React, { useState } from "react";
import copy from "copy-to-clipboard";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

function PassGen() {
  let [txt, setTxt] = useState("");
  let [length, setLength] = useState(8);
  let [isCopying, setIsCopying] = useState(false);
  let passLen = length;
  const copyToClipboard = () => {
    copy(txt);
    !isCopying && txt && toast.info(`Password Copied`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000
    });
    !isCopying && copying().then(
      function (value) {setIsCopying(false)},
      function (error) {setIsCopying(false)}
    );
  };

  const copying = async () => {
    setIsCopying(true);
    await sleep(1500);
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const passGenerator = () => {
    let lCaseCharSet = "abcdefghijklmnopqrstuvwxyz",
      uCaseCharSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      numSet = "0123456789",
      specialCharSet = "!@#$%^&*_+~|:;?,.-",
      isStrongPassword = false,
      hasNum = false,
      hasLcase = false,
      hasUcase = false,
      hasSpecialChar = false,
      strongPassword = "";
    while(!isStrongPassword) {
      let password = "";
      for (let i = 0; i < passLen; i++) {
        var tempChars = "";
        tempChars += lCaseCharSet[Math.floor(Math.random() * lCaseCharSet.length)];
        tempChars += uCaseCharSet[Math.floor(Math.random() * uCaseCharSet.length)];
        tempChars += numSet[Math.floor(Math.random() * numSet.length)];
        tempChars += specialCharSet[Math.floor(Math.random() * specialCharSet.length)];
        password += tempChars[Math.floor(Math.random() * tempChars.length)];
      }
      for (let i = 0; i < passLen; i++) {
        if (password.includes(`${i}`)) {
          hasNum = true;
          break;
        }
      }
      for (let i = "a"; i <= "z"; i++) {
        if (password.includes(i)) {
          hasLcase = true;
          break;
        }
      }
      for (let i = "A"; i <= "Z"; i++) {
        if (password.includes(i)) {
          hasUcase = true;
          break;
        }
      }
      for (let i = 0; i < specialCharSet.length; i++) {
        if (password.includes(specialCharSet[i])) {
          hasSpecialChar = true;
          break;
        }
      }
      if(hasNum && hasLcase && hasUcase && hasSpecialChar)
      {
        isStrongPassword = true;
        strongPassword = password;
      }
    }
    txt = setTxt(strongPassword);
  }

  return (
    <>
      <div className="form-group">
        <label for="length">Set Password length: </label>
        <input id="length" className="form-control" name="length" type="number" value={length} onChange={ e => setLength(e.target.value) }/>
      </div>
      <br />
      <div className="input-group">
        <input id="pwd" className="form-control" name="password" placeholder="Password" type="text" value={txt} onChange={ e => setTxt(e.target.value) }/>
        {document.queryCommandSupported('copy') && <a onClick={copyToClipboard}>
          <div className="input-group-append">
            <span className="input-group-text">
              Copy
            </span>
          </div>
        </a>}
      </div>
      <br />
      <div className="form-group">
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
          <div className="marginForMobile">
          <h2>
            Password generator!
          </h2>
          <br />
          <PassGen />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
