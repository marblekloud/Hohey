import React from "react";
import { useState } from "react";
import useAsync from "./components/useAsync";
import { unlockAccount } from "./api/web3";
import { useWeb3Context } from "./contexts/Web3";
import 'semantic-ui-css/semantic.min.css';
import './App.css';

function Home() {
  const [message, setMessage] = React.useState('Connect with one of our available providers or create a new one.');

  const {
    state: { account },
    updateAccount
  } = useWeb3Context();
  
  
  const { pending, error, call } = useAsync(unlockAccount);
  
  const [buttonstate, changebuttonstate] = React.useState(false);

  async function onClickConnect() {
    const { error, data } = await call(null);

    if (error) {
      console.error(error);
      window.location.href = "https://metamask.io/download.html";
    }
    if (data) {
      setMessage('Metamask is connected');
      updateAccount(data);
      changebuttonstate(true);
    }
  }
  

  return (
    <div className="App">
      <div className="App-header">
        <br/>
        <h1>{message}</h1>
        <div>Account: {account}</div>
        <button
        disabled={buttonstate}
        className ="button"
          onClick={() => onClickConnect()}
        >Connect to Metamask</button>
      </div>
    </div>
  );
}

export default Home;
