import React from 'react';
import ModalImage from 'react-modal-image';

const productCartInCheckOut = ({
  title,
  price,
  brand,
  color,
  count,
  shipping,
  images,
}) => {
  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: '100px', height: 'auto' }}>
            {images?.length ? (
              <ModalImage small={images[0].url} large={images[0].url} />
            ) : (
              'Image'
            )}
          </div>
        </td>
        <td>{title}</td>
        <td>${price}</td>
        <td>{brand}</td>
        <td>{color}</td>
        <td>{count}</td>
        <td>{shipping}</td>
        <td>Remove Icon</td>
      </tr>
    </tbody>
  );
};

export default productCartInCheckOut;
