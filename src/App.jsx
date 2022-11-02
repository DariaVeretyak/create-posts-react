import React from 'react';
import { PostsProvider } from './context/PostsProvider';
import { NewPost } from './components/NewPost/NewPost';
import { PostsList } from './components/PostsList/PostsList';
import './App.scss';

export const App = () => (
  <PostsProvider>
    <div className="App">
      <div className="App__top">
        <NewPost />
        <PostsList quantity="last" />
      </div>
      <PostsList quantity="all" />
    </div>
  </PostsProvider>
);
