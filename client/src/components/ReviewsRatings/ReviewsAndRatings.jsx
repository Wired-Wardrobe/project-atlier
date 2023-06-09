/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-no-bind */
// this is the main reviews and ratings widget

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AverageRatings from './AverageRatings';
import Reviews from './Reviews';
import RNRCSS from './Modal.module.css';
import { useGetProductReviewsQuery, useGetMetaReviewsQuery } from '../../features/api/apiSlice';


function ReviewsAndRatings() {
  const params = useParams();
  const [sortState, setSortState] = useState('relevant');
  const {
    data: metaReviews,
    isFetchingMeta,
  } = useGetMetaReviewsQuery(`${params.productId}`, {
    refetchOnMountOrArgChange: false,
  });
  let count = 5;
  if (metaReviews) {
    Object.keys(metaReviews.ratings).length > 0
      ? count = Object.values(metaReviews.ratings).reduce((a, b) => (Number(a) + Number(b)))
      : count = 5;
  }
  const {
    data: productReviews,
    isFetching,
    refetch,
  } = useGetProductReviewsQuery({ id: params.productId, count, sortState }, {
    refetchOnMountOrArgChange: false,
  });

  useEffect(() => {
    // trigger({ id: params.productId, count, sortState });
    refetch();
  }, [sortState, refetch]);

  function handleSortState(sortInput) {
    setSortState(sortInput);
  }

  if (isFetching || isFetchingMeta || !productReviews || !metaReviews) {
    return (
      <div className={RNRCSS['loading-window']}>
        <h1>Ratings & Reviews</h1>
        <aside className={RNRCSS['average-ratings-left']}>
          <h3>Product Ratings</h3>
          <div>...Loading</div>
        </aside>
        <div className={RNRCSS['reviews-container-right']}>
          <h3>Product Reviews</h3>
          <div>...Loading</div>
        </div>
      </div>
    );
  }

  return (
    <div className={RNRCSS['reviewsAndRatings-outer-container']}>
      <div className={RNRCSS['reviewsAndRatings-container-main']}>
        <div className="rnr-body">
          <h1>Ratings & Reviews</h1>
          <AverageRatings RNRCSS={RNRCSS} />
          <Reviews RNRCSS={RNRCSS} handleSortState={handleSortState} sortState={sortState} />
        </div>
      </div>
    </div>

  );
}

export default ReviewsAndRatings;
