import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((res) => {
      setPostList(res.data);
      console.log(postList);
    });
  }, []);

  const submitPost = () => {
    Axios.post("http://localhost:3001/api/insert", {
      postTitle: postTitle,
      postContent: postContent
    }).then(() => {
      alert("post submitted");
    });
  };

  return (
    <div className="App">
      <h1>Bellwest Blog</h1>
      <div className="form">
        <label>Subject:</label>
        <input
         type="text"
         name="title"
         onChange={(e) => {
           setPostTitle(e.target.value);
         }}
        />
        <label>Content:</label>
        <input
         type="text"
         name="content"
         onChange={(e) => {
          setPostContent(e.target.value);
        }}
        />
        <button onClick={submitPost}>Submit</button>

        {postList.map((val) => {
          return (
            <h1 key={val.id}>
              Title: {val.post_title}, Content: {val.post_content}
            </h1>
          );
        })}
      </div>  
    </div>
  );
}

export default App;
 