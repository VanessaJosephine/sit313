import React, { useState } from 'react';
import './ImageUploader.css';
import { storage } from './utils/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

const ImageUploader = () => {
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        const file = e.target[0]?.files[0]

        if (!file) return;

        const storageRef = ref(storage, `Images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL)
                });
            }
        );
    }
    return (
        <div>
            <b>Image</b><br />
            <form className='form' onSubmit={handleSubmit}>
                <input type='file' accept='image/png, image/jpeg' /><br /><br />
                <button type="submit">Upload</button><br /><br />
            </form>
            {
                !imgUrl &&
                <div className='outerbar'>
                    <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
                </div>
            }
            {
                imgUrl &&
                <img src={imgUrl} alt='uploaded file' height={200} />
            }
        </div>
    )
}

export default ImageUploader;