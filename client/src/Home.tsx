import React, { PureComponent } from "react";
import { useState, useEffect }from "react";
import useAsync from "./components/useAsync";
import { unlockAccount } from "./api/web3";
import { useWeb3Context } from "./contexts/Web3";
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import axios from 'axios';

function Home()  {

  function changeMessage(_message:any){

    let formData = new FormData();
      formData.append('MMaccount', _message);

      axios.post('/api/user/', formData)
        .then((response) => {
            response.data.success ? alert(response.data.message) : alert(response.data.message);
        })
        .catch(err => alert('Error: ' + err));
  }

  const {
    state: { account },
    updateAccount
  } = useWeb3Context();
  
  
  const { pending, error, call } = useAsync(unlockAccount);
  

  async function onClickConnect() {
    const { error, data } = await call(null);

    if (error) {
      console.error(error);
      window.location.href = "https://metamask.io/download.html";
    }
    if (data) {
      updateAccount(data);
      changeMessage({account});
    }
  }
  
  return (
      <div className="App">
        <div className="App-header">
          <br/> 
          <p onChange={() => changeMessage({account})}  className = "address">Account address: {account}</p>
          <button
          className ="button"
            onClick={() => onClickConnect()}
          >Connect to Metamask</button>
        </div>
      </div>
    );
}

export default Home;
