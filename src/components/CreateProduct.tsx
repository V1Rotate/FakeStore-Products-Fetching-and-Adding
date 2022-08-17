import axios from 'axios';
import { title } from 'process';
import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import { IProduct } from '../models';
import ErrorMessage from './ErrorMessage';

const productData: IProduct = {
  title: 'New Product',
  price: 13.5,
  description: 'lorem ipsum set',
  image: 'https://i.pravatar.cc',
  category: 'electronic',
  rating: {
    rate: 42,
    count: 10,
  },
};

interface CreateProductProps {
  onCreate: (product: IProduct) => void;
}

export function CreateProduct({ onCreate }: CreateProductProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (value.trim().length === 0) {
      setError('Please enter valid title');
    }

    productData.title = value;
    const response = await axios.post<IProduct>(
      'https://fakestoreapi.com/products',
      productData
    );
    onCreate(response.data);
  };
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setValue(target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type='text'
        className='border py-2 px-4 mb-2 w-full '
        placeholder='Enter product title'
        value={value}
        onChange={changeHandler}
      />

      {error && <ErrorMessage error={error} />}

      <button
        type='submit'
        className='py-2 px-4 border bg-yellow-400 hover:text-white'
      >
        Create
      </button>
    </form>
  );
}
