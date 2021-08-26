import React, { PureComponent } from 'react';
import './App.css';
import axios from 'axios';
import styles from './mystyle.module.css'; 

interface UploadState {
    recentImage: any;
    caption: string;
    description:string;
    uploadedImageUrl: string;
    uploadedImage: any;
};

class UploadPage extends PureComponent<{}, UploadState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            recentImage: {},
            caption: '',
            description: '',
            uploadedImageUrl: '',
            uploadedImage: {},
        };
    }

    componentDidMount = () => {
        this.fetchRecent();
    }

    fetchRecent = () => {
        axios.get('http://localhost:9890/recent')
            .then((response) => {
                this.setState({ recentImage: response.data.image });
            })
            .catch(err => alert('Error: ' + err));
    }

    uploadImage = () => {

        if (!this.state.uploadedImage.name) {
            return alert('Video is missing');
        } else if (!this.state.caption.trim()) {
            return alert('Video title is missing');
        } else if (!this.state.description.trim()) {
            return alert('Video description is missing');
        }

        let formData = new FormData();
        formData.append('caption', this.state.caption);
        formData.append('description', this.state.description);
        formData.append('file', this.state.uploadedImage);

        axios.post('http://localhost:9890/', formData)
            .then((response) => {
                response.data.success ? alert(response.data.message) : alert(response.data.message);
                this.fetchRecent();
            })
            .catch(err => alert('Error: ' + err));
    }

    render() {
        return (
            <div className={styles.UploadPage}>
                    <p className={styles.Upload_Title}>Upload Video</p>
                    <div className={styles.Upload__InputSection}>
                        <div>
                        <input
                            type="text"
                            className={styles.Upload__Caption}
                            placeholder="Enter video title..."
                            onChange={event => this.setState({ caption: event.target.value })}
                            value={this.state.caption}
                        />
                        </div>
                        <br/>
                        <div>
                        <textarea
                            className={styles.Upload__Description}
                            placeholder="Enter video description..."
                            onChange={event => this.setState({ description: event.target.value })}
                            value={this.state.description}
                        ></textarea>
                        </div>
                        <br/>
                        <input
                            type="file"
                            className="Upload__Input"
                            onChange={(event: any) => {
                                this.setState({
                                    uploadedImageUrl: URL.createObjectURL(event.target.files[0]),
                                    uploadedImage: event.target.files[0],
                                })
                            }}
                        />
                    </div>

                    <button onClick={this.uploadImage} className={styles.Upload__Button}>Upload</button>
            </div>
        );
    }
}

export default UploadPage;