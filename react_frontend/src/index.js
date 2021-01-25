import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import UploadImage from './Page_UploadImage';
import NavigationBar from './NavigationBar';
import Album from './Page_Album'
import { BrowserRouter, Route } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route path="/" exact component={UploadImage} />
      <Route path="/album" component={Album} />
    </BrowserRouter>

    {/* <NavigationBar page={'default'} content={''} /> */}
  </React.StrictMode>,
  document.getElementById('root')
);
