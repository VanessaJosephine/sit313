import './App.css';
import QuestionListPage from './routes/QuestionListPage';
import ArticleListPage from './routes/ArticleListPage';
import PostPage from './routes/PostPage';
import AboutPage from './routes/AboutPage';
import ConnectPage from './routes/ConnectPage';
import Login from './routes/Login';
import Signup from './routes/Signup';
import NavFooter from './NavFooter';
import { Routes, Route } from "react-router-dom";
import HomePage from './routes/HomePage';
import Profile from './routes/Profile';
import { useState } from 'react';

function App() {
    const [searchTerm, setSearchTerm] = useState("")
    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }
  return (
      <div className="App">
          <Routes>
              {/*Only shows the element inside the path*/}
              <Route path="/" element={<NavFooter onChange={handleChange} />}>
                  <Route index element={<HomePage search={searchTerm} />} />
                  <Route path="questions" element={<QuestionListPage search={searchTerm} />} />
                  <Route path="articles" element={<ArticleListPage search={searchTerm} />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="post" element={<PostPage />} />
                  <Route path="connect" element={<ConnectPage />} />
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<Signup />} />
                  <Route path="profile" element={<Profile />} />
              </Route>
          </Routes>
    </div>
  );
}

export default App;
