import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PostsContext } from '../../context/PostsProvider';

import './PostsList.scss';

export const PostsList = ({ quantity }) => {
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const { posts, removeItem } = useContext(PostsContext);
  const [lastPosts, setLastPosts] = useState([]);

  const [showAll, setShowAll] = useState(false);

  const getLastPosts = () => {
    setLastPosts(posts.reverse().slice(0, 5));
  };

  const handleResize = () => {
    setScreenWidth(window.screen.width);
  };

  window.addEventListener('resize', handleResize);

  useEffect(() => {
    getLastPosts();
  }, [posts]);

  return (
    posts && (
      quantity === 'all' ? (
        <>
          {screenWidth > 768 ? (
            <div className="PostsList">
              <h2>
                Обьявлений:
                {' '}
                {posts.length}
              </h2>
              <ul className="PostsList__list" data-cy="postDetails">
                {posts.map(post => (
                  <li
                    className="PostsList__item"
                    key={post.id}
                  >
                    <div className="PostsList__block">
                      {post.img !== '' && (
                        <img
                          className="PostsList__ava"
                          src={post.img}
                          alt="avatair"
                        />
                      )}
                      <div className="PostsList__info">
                        <p className="PostsList__postAutor">{post.name}</p>
                        <p>{post.body}</p>
                      </div>
                      <button
                        type="button"
                        className="PostsList__remove-button"
                        onClick={() => removeItem(post.id)}
                      >
                        X
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <>
              <button
                className="PostsList__showAll-btn"
                type="button"
                onClick={() => setShowAll(!showAll)}
              >
                {!showAll ? 'Показать все посты' : 'Скрыть все посты'}
              </button>
              {showAll && (
                <div className="PostsList">
                  <h2>
                    Обьявлений:
                    {' '}
                    {posts.length}
                  </h2>
                  <ul className="PostsList__list" data-cy="postDetails">
                    {posts.map(post => (
                      <li
                        className="PostsList__item"
                        key={post.id}
                      >
                        <div className="PostsList__block">
                          {post.img !== '' && (
                            <img
                              className="PostsList__ava"
                              src={post.img}
                              alt="avatair"
                            />
                          )}
                          <div className="PostsList__info">
                            <p className="PostsList__postAutor">{post.name}</p>
                            <p>{post.body}</p>
                          </div>
                          <button
                            type="button"
                            className="PostsList__remove-button"
                            onClick={() => removeItem(post.id)}
                          >
                            X
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="PostsList PostsList--last">
          <ul className="PostsList__list" data-cy="postDetails">
            {lastPosts.map(post => (
              <li
                className="PostsList__item"
                key={post.id}
              >
                <div className="PostsList__block">
                  {post.img !== '' && (
                    <img
                      className="PostsList__ava"
                      src={post.img}
                      alt="avatair"
                    />
                  )}
                  <span className="PostsList__post">{post.body}</span>
                  <button
                    type="button"
                    className="PostsList__remove-button"
                    onClick={() => removeItem(post.id)}
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )
    )

  );
};

PostsList.propTypes = {
  quantity: PropTypes.string.isRequired,
};
