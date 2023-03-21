// this is the Average ratings and reviews component
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RatingBar from './RatingsBar';
import QuarterStarsAverageRating from './QuarterStarsAverageRating';

function AverageRatings({RNRCSS}) {
  const { meta } = useSelector((state) => state.reviews);
  console.log('meta in avgRatings', meta)
  const obj = meta.ratings;
  const values = Object.values(obj);
  const totalNumRatings = values.reduce((a, b) => (Number(a) + Number(b)));
  const keys = Object.keys(obj);
  const starRatingPercentages = keys.map((key) => ((obj[key] / totalNumRatings) * 100));

  // recommended percentage calculation
  let recommendPercent = (Number(meta.recommended.true) / (Number(meta.recommended.true) + Number(meta.recommended.false))) * 100 ;
  return (
    <aside className={RNRCSS['average-ratings-left']}>
      <h3>Product Ratings</h3>
      <QuarterStarsAverageRating />
      <div>Total number of reviews: {totalNumRatings}</div>
      {
        // make sure that the data returned from the API includes
        // all 5 stars always, meaning if no one rated the product
        // for 4 stars , 4 will still be a property in the object
        // and has a value of 0
        starRatingPercentages.map((element, index) => (
          <div key={index.toString()}>
            <RatingBar index={index} element={Number(element)} reviewsNum={values[index]} />
          </div>
        ))
      }
      <div>{Math.round(recommendPercent)}% of reviews recommend this product</div>
    </aside>
  );
}

export default AverageRatings;
