import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const PostsContext = React.createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const getLocalStorage = () => {
    if (localStorage.getItem('post') !== null) {
      setPosts(JSON.parse(localStorage.getItem('post') || ''));
    }
  };

  const updateStorage = () => {
    if (posts.length) {
      localStorage.setItem('post', JSON.stringify(posts));
    } else {
      localStorage.removeItem('post');
    }
  };

  const addedToPosts = (item) => {
    setPosts(prevState => ([
      ...prevState,
      item,
    ]));
  };

  const removeItem = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const contextValue = {
    posts,
    addedToPosts,
    removeItem,
  };

  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    updateStorage();
  }, [posts]);

  return (
    <PostsContext.Provider value={contextValue}>
      {children}
    </PostsContext.Provider>
  );
};

PostsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
