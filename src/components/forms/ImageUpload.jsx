import axios from 'axios';
import React from 'react';

const ImageUpload = ({ setImages, setLoading, authtoken }) => {
  const onChange = (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          axios
            .post(
              '/uploadimages',
              { images: reader.result },
              { headers: { authtoken } }
            )
            .then((res) => {
              setImages((prevImages) => [...prevImages, res.data[0]]);
            })
            .catch((err) => console.log({ err }));
        }
      };
      reader.readAsDataURL(file);
    });
    setLoading(false);
  };

  return (
    <div className='row'>
      <label className='btn btn-primary'>
        Choose File
        <input
          type='file'
          accept='images/*'
          multiple
          hidden
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default ImageUpload;
