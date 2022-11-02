import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faDownload } from '@fortawesome/free-solid-svg-icons';
import { PostsContext } from '../../context/PostsProvider';
import './NewPost.scss';

export const NewPost = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  });

  const { addedToPosts } = useContext(PostsContext);

  const [img, setImg] = useState('');
  const [photoAdded, setPhotoAdded] = useState('Выбрать аватарку');

  const onSubmit = () => {
    addNewPost();
  };

  const onChange = (e) => {
    const file = e.target.files[0];

    setPhotoAdded(file.name);

    const obFile = new FileReader();

    obFile.readAsDataURL(file);
    obFile.onload = (ev) => {
      const formData = ev.target.result;

      setImg(formData);
    };
  };

  const addNewPost = () => {
    const newPost = {
      name: getValues('name'),
      body: getValues('body'),
      img,
      id: new Date().getTime(),
    };

    addedToPosts(newPost);
    setPhotoAdded('Выбрать аватарку');

    reset();
    setImg('');
  };

  return (
    <form
      className="NewPost"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        {...register('name', {
          required: 'Поле обязательное к заполнению',
          minLength: {
            value: 2,
            message: 'Минимум 2 символа',
          },
          pattern: {
            value:
            `^[a-zA-Z][a-zA-Z0-9-_.]{1,20}$`,
            message: 'Пожалуйста, введите валидное значение',
          },
        })}
        placeholder="Ваше имя*"
        className="NewPost__input"
      />
      <div className="NewPost__errorBlock">
        {errors?.name && (
          errors?.name.message
        )}
      </div>

      <div className="NewPost__input">
        <label className="NewPost__uploadLabel">
          <FontAwesomeIcon icon={faDownload} />
          <input
            className="NewPost__uploadInput"
            type="file"
            name="img"
            onChange={e => onChange(e)}
          />
          {photoAdded}
        </label>
      </div>

      <textarea
        placeholder="Текст поста"
        rows={5}
        className="NewPost__input NewPost__input--textarea"
        {...register('body', {})}
      />

      <button
        type="submit"
        className="NewPost__submit-button"
        disabled={!isValid}
      >
        <FontAwesomeIcon icon={faFloppyDisk} />
        Добавить
      </button>
    </form>
  );
};
