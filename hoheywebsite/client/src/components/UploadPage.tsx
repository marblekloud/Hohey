import React, { PureComponent } from 'react';
import './App.css';
import axios from 'axios';
import styles from './mystyle.module.css'; 

interface UploadState {
    recentImage: any;
    caption: string;
    uploadedImageUrl: string;
    uploadedImage: any;
};

class UploadPage extends PureComponent<{}, UploadState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            recentImage: {},
            caption: '',
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
        if (!this.state.caption.trim() || !this.state.uploadedImage.name) {
            return alert('Caption or file is missing');
        }

        let formData = new FormData();
        formData.append('caption', this.state.caption);
        formData.append('file', this.state.uploadedImage);

        axios.post('http://localhost:9890/', formData)
            .then((response) => {
                response.data.success ? alert('File successfully uploaded') : alert(response.data.message);
                this.fetchRecent();
            })
            .catch(err => alert('Error: ' + err));
    }

    render() {
        return (
            <div className={styles.UploadPage}>
                <div className={styles.Recent}>
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
            </div>
        );
    }
}

export default UploadPage;