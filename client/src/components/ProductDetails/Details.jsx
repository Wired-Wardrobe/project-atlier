import React, { useState } from 'react';
import StarRating from '../ReviewsRatings/StarRating';
import StyleList from './StyleList';
import { newSelectedStyle } from '../../features/products/productsSlice';
import { useSelector, useDispatch } from 'react-redux';

function Details() {
  let { selectedStyle, styles, details } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <StarRating />
        <button type="button">See all reviews</button>
      </div>
      <h3>
        {details.category}
      </h3>
      <h2>
        {details.name}
      </h2>
      <div className="flex">
        { selectedStyle.sale_price ? <p className="sale">{`$${selectedStyle.sale_price}`}</p> : null}
        <p className={selectedStyle.sale_price ? 'originalPrice' : ''}>
          {`$${selectedStyle.original_price}`}
        </p>
      </div>
      <h3>
        {selectedStyle.name}
      </h3>
      <div>
        <StyleList />
      </div>
      <div>
        <select>

        </select>
        <select>

        </select>
      </div>
      <div>
        <button>

        </button>
        <button>

        </button>
      </div>
    </div>
  );
}

export default Details;
