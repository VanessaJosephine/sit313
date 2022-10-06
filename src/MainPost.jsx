import React from 'react';
import './MainPost.css';
import { faker } from '@faker-js/faker';

const MainPost = () => {
    return (
        <div class="main-post">
            <img src={faker.image.nature()} alt="Nature" />
        </div>
    )
}

export default MainPost;