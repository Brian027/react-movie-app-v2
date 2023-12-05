import React from 'react';
import { useParams } from 'react-router-dom';
import { category as cate } from '../api/tmdbApi';
import HeaderPage from '../components/header/HeaderPage';

const Catalog = () => {

  const { category } = useParams()

  document.title = `React Movies | ${cate[category]}`

  return (
    <>
      <HeaderPage category={category}/>
    </>
  )
}

export default Catalog