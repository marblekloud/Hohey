import React, { PureComponent } from 'react';
import './App.css';
import axios from 'axios';
import styles from './mystyle.module.css'; 

interface ListState {
    imageList: any[];
};

class ListPage extends PureComponent<{}, ListState> {
    constructor(props: any) {
        super(props);

        this.state = {
            imageList: [],
        };
    }

    componentDidMount = () => {
        axios.get('http://localhost:9890/')
            .then(response => {
                this.setState({ imageList: response.data.images });
            })
            .catch(err => alert(err));
    }

    deleteFile = (id: any) => {
        axios.get('http://localhost:9890/delete/' + id) 
            .then((response) => {
                if (response.data.success) {
                    alert('File with ID: ' + id + ' has been deleted');
                    this.setState({ imageList: this.state.imageList.filter(el => el._id !== id)});
                }
            })
            .catch(err => alert(err));
    }

    render() {
        return (
            <div>
            <div className={styles.banner}>
                <br/>
            <div className={styles.bannercontainer}>
                <div className={styles.bannercontainerreal}>
                <p className={styles.bannerheading}>HoHey</p>
                <p className={styles.bannercontents}>HoHey is where your film assets are preserved, displayed, and celebrated - all the while you earn passive income.</p>
                </div>
            </div>
            </div>
            <div className="ListPage">
                <div className={styles.listpage}>
                    {this.state.imageList.map((file) => (
                        <div className={styles.ListImage}>
                            <a href={'http://localhost:9890/video/' + file.filename}>Video link</a>
                            <p className={styles.ImageBox__Caption}>{file.caption}</p>
                            <p className="ListImage__Date">Date: {file.createdAt}</p>
                            <video src={'http://localhost:9890/image/' + file.filename}
                                className="ListImage__Image"  width = "320" height = "240" controls>
                        </video>
                            <button className={styles.ListImage__Delete} onClick={() => this.deleteFile(file._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        );
    }
}

export default ListPage;