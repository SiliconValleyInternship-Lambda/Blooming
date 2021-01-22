import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import UploadImage from './Page_UploadImage';
import NavigationBar from './NavigationBar';

ReactDOM.render(
  <React.StrictMode>
    <NavigationBar page={'transfer'} content={<UploadImage />} />
    {/* <UploadImage /> */}
  </React.StrictMode>,
  document.getElementById('root')
);
