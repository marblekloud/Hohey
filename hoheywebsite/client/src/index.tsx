import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import UploadPage from './components/UploadPage';
import ListPage from './components/ListPage';
import VideoPage from './components/VideoPage';
import Home from './Home';
import Nav from './Nav';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Provider as Web3Provider,
  Updater as Web3Updater,
} from "./contexts/Web3";
import axios from 'axios';
import { FilledInput } from '@material-ui/core';

var videos:any[] = [{id: '',caption: '',filename: '',fileId: '',createdAt: '',__v: ''},];
axios.get('http://localhost:9890/')
  .then((response) => {
    videos.push({
      id: response.data.images.id,
      caption: response.data.images.caption,
      filename:response.data.images.filename,
      fileId:response.data.images.fileId,
      createdAt:response.data.images.createdAt,
      __v:response.data.images.__v,
    })
  })
  .catch(err => alert(err));
     
ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Web3Provider>
      <Nav />
      <Switch>
      {videos.map(video => (
        <Route path={'/video/' + video.filename} component={VideoPage} />
      ))}
        <Route path="/connectwallet" component={Home} />
        <Route path="/upload" component={UploadPage} />
        <Route path="/" component={ListPage} />
        </Switch>
      <Web3Updater />
    </Web3Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
