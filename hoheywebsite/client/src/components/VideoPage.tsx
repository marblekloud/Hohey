import React, { PureComponent } from 'react';
import './App.css';
import axios from 'axios';
import styles from './mystyle.module.css'; 

class VideoPage extends PureComponent {
    render() {
        return (
            <div className={styles.Recent}>
            <video src={'http://localhost:9890/image' + window.location.href.split("/video").pop()} className="videoplayer"  width = "800" height = "600" controls>
            </video>
                    <div>
                </div>
            </div>
        );
    }
}

export default VideoPage;