import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import UploadImage from './Page_UploadImage';
import Album from './Page_Album'
import { BrowserRouter, Route } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" exact component={UploadImage} />
    <Route path="/album" component={Album} />
  </BrowserRouter>,
  document.getElementById('root')
);
