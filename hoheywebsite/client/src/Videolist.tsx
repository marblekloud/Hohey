import React from "react";
import { useState } from "react";
import useAsync from "./components/useAsync";
import { Input, Message, Button } from "semantic-ui-react";
import { unlockAccount } from "./api/web3";
import { useWeb3Context } from "./contexts/Web3";
import 'semantic-ui-css/semantic.min.css';
import Axios from 'axios';
import './App.css';

function Videolist() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Videos:</h1>
        </div>
      </div>
    );
  }
  
  export default Videolist;