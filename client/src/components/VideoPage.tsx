import React, { PureComponent } from 'react';
import './App.css';
import axios from 'axios';
import styles from './mystyle.module.css'; 

interface VideoState {
    currentVideo: any;
    currentVideoDate: string;
    currentVideoTime: string;
    imageList: any[];
};

class VideoPage extends  PureComponent<{}, VideoState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            currentVideo: {},
            currentVideoDate: '',
            currentVideoTime: '',
            imageList: [],
        };
    }

    componentDidMount = () => {
        this.fetchVideo( window.location.href.split("/video/").pop());
        axios.get('/api/')
            .then(response => {
                this.setState({ imageList: response.data.images });
            })
            .catch(err => alert(err));
    }

    fetchVideo = (filename:any) => {
        axios.get('/api/video/' + filename)
            .then((response) => {
                this.setState({ currentVideo: response.data.image });
                this.setState({currentVideoDate: response.data.image.createdAt.slice(0, -14)})
                this.setState({currentVideoTime: response.data.image.createdAt.slice(11, -5)})
            })
            .catch(err => alert('Error: ' + err));
    }

    render() {
        return (
            <div>
                <div>
                    <br/>
                    <div className={styles.Recent}>
                        <video src={'/api/image/' + this.state.currentVideo.filename} className="videoplayer"  width = "960" height = "600" controls>
                        </video>
                        <br/><br/>
                        <b className = {styles.videoTitle}>{this.state.currentVideo.caption}</b> 
                        <b className = {styles.Date}>{this.state.currentVideoDate + '  '}</b>
                        <b>{this.state.currentVideoTime}</b>
                        <br/><br/><hr></hr>
                        <p className = {styles.videoDescription}>{this.state.currentVideo.description}</p>
                    </div>
                </div>
                <div className={styles.videolist}>
                    {this.state.imageList.map((file) => (
                        <div className={styles.ListImage}>
                            <a href={'/video/' + file.filename}>
                                <img src={'/api/image/' + file.filename}
                                className="ListImage__Image"  width = "320" height = "180" >
                                </img>
                            </a>
                            <p className={styles.ImageBox__Caption}>{file.caption}</p>
                            <p className="ListImage__Date">Date: {file.createdAt}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default VideoPage;