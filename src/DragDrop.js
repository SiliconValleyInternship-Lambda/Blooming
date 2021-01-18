import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';

function DragDrop(props) {
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  
  const show_image = files.map(file => (
    <div class="img_input" key={file.name}>
      <img src={file.preview} alt={file.name} onChange={props.setURL(file.preview)}/>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        {
          isDragActive  ? 
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
        }
        {show_image}
      </div>
    </section>
  );
}

<DragDrop />

export default DragDrop;