import React, { PureComponent } from 'react';
import './App.css';
import axios from 'axios';
import styles from './mystyle.module.css'; 

interface VideoState {
    currentVideo: any;
};

class VideoPage extends  PureComponent<{}, VideoState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            currentVideo: {},
        };
    }

    componentDidMount = () => {
        this.fetchVideo( window.location.href.split("/video/").pop());
    }

    fetchVideo = (filename: any) => {
        axios.get('http://localhost:9890/video/' + filename)
            .then((response) => {
                this.setState({ currentVideo: response.data.image });
            })
            .catch(err => alert('Error: ' + err));
    }

    render() {
        return (
            <div>
                <br/>
            <div className={styles.Recent}>
                <video src={'http://localhost:9890/image/' + this.state.currentVideo.filename} className="videoplayer"  width = "800" height = "500" controls>
                </video>
            </div>
            <br/>
            <div className ={styles.Recent}>
                <b className = {styles.videoTitle}>{this.state.currentVideo.caption}</b> 
                <b>{this.state.currentVideo.createdAt}</b>
                <br/>
                <br/>
                <hr></hr>
                <p>{this.state.currentVideo.description}</p>
            </div>
        </div>
        );
    }
}

export default VideoPage;