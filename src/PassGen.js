
import React, { useState } from "react";
import copy from "copy-to-clipboard";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PassGen = () => {
  let [txt, setTxt] = useState("");
  let [length, setLength] = useState(8);
  let [isCopying, setIsCopying] = useState(false);
  let [useSpecialChars, setUseSpecialChars] = useState(true);
  let [useNumsOnly, setUseNumsOnly] = useState(false);
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

  const onSpecialCharsChecboxClick = () => {
    let numsOnlyCheckbox = document.getElementById("onlyNumbers");
    let isSpecialCharsIncluded = document.getElementById("includeSpecialChars").checked === true;
    if(isSpecialCharsIncluded) {
      setUseSpecialChars(true);
      setUseNumsOnly(false);
      numsOnlyCheckbox.checked = false;
    } else {
      setUseSpecialChars(false);
    }
  } 

  const setNumsOnly = () => {
    let isNumsOnly = document.getElementById("onlyNumbers").checked === true;
    let specialCharCheckbox = document.getElementById("includeSpecialChars");
    if(isNumsOnly) {
      setUseSpecialChars(false);
      setUseNumsOnly(true);
      specialCharCheckbox.checked = false;
    } else {
      setUseSpecialChars(true);
      setUseNumsOnly(false);
      specialCharCheckbox.checked = true;
    }
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
        if(!useNumsOnly) {
          tempChars += lCaseCharSet[Math.floor(Math.random() * lCaseCharSet.length)];
          tempChars += uCaseCharSet[Math.floor(Math.random() * uCaseCharSet.length)];
          if(useSpecialChars) {
              tempChars += specialCharSet[Math.floor(Math.random() * specialCharSet.length)];
          }
        }
        tempChars += numSet[Math.floor(Math.random() * numSet.length)];
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
      if(hasNum && hasLcase && hasUcase && hasSpecialChar && useSpecialChars && !useNumsOnly) {
        isStrongPassword = true;
        strongPassword = password;
      } else if(hasNum && useNumsOnly) {
        isStrongPassword = true;
        strongPassword = password;
      } else if(hasNum && hasLcase && hasUcase && !hasSpecialChar && !useSpecialChars) {
        isStrongPassword = true;
        strongPassword = password;
      } else {
          isStrongPassword = false;
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
      <div className="input-group">
        <input id="pwd" className="form-control" name="password" placeholder="Password" type="text" value={txt} onChange={ e => setTxt(e.target.value) } disabled />
        {document.queryCommandSupported('copy') && <a onClick={() => copyToClipboard()}>
          <div className="input-group-append">
            <span className="input-group-text">
              Copy
            </span>
          </div>
        </a>}
        <br />
      </div>
      <div>
        <input type="checkbox" defaultChecked={useSpecialChars} id="includeSpecialChars" className="checkbox" onClick={e=>onSpecialCharsChecboxClick(e)} />
        <label for="includeSpecialChars" className="checkboxLabel">Include Special Characters</label>
        <br />
        <input type="checkbox" defaultChecked={useNumsOnly} id="onlyNumbers" className="checkbox" onClick={() => setNumsOnly()} />
        <label for="onlyNumbers" className="checkboxLabel">Use numbers only</label>
      </div>
      <br />
      <div className="form-group">
        <a className="btn btn-primary btn-lg btn-block" onClick={() => passGenerator()}>
          Generate new password!
        </a>
      </div>
    </>
  )
}

export default PassGen;
  