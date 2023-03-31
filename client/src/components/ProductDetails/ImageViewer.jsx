import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaChevronDown,
  FaExpand,
  FaCompress,
} from 'react-icons/fa';
import { nanoid } from '@reduxjs/toolkit';
import {
  newSelectedImage,
  toggleState,
  newImageIndex,
  handleStateUpdate,
} from '../../features/products/productsSlice';
import SideImages from './SideImages';

function ImageViewer() {
  const {
    selectedStyle,
    expanded,
    zoom,
    imageIndex,
    page,
  } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const imgRef = useRef(null);

  const [dimensions, setDimensions] = useState([]);
  const [relPosition, setRelPosition] = useState([]);

  const handleImageClick = (image, ind) => {
    dispatch(newSelectedImage(image.url));
    dispatch(newImageIndex(ind));
  };

  const handleHorizontalScroll = (direction) => {
    if (direction === 'left') {
      if (Math.floor((imageIndex - 1) / 7) !== page) {
        dispatch(handleStateUpdate({ name: 'page', value: page - 1 }));
      }
      dispatch(handleStateUpdate({ name: 'imageIndex', value: imageIndex - 1 }));
    } else {
      if (Math.floor((imageIndex + 1) / 7) !== page) {
        dispatch(handleStateUpdate({ name: 'page', value: page + 1 }));
      }
      dispatch(handleStateUpdate({ name: 'imageIndex', value: imageIndex + 1 }));
    }
  };

  const handleZoom = () => {
    if (zoom === false) {
      const newArray = [imgRef.current.clientWidth, imgRef.current.clientHeight];
      setDimensions(newArray);
    }
    dispatch(toggleState('zoom'));
    dispatch(toggleState('expanded'));
  };

  const mousePos = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    let relLeft = (e.clientX - bounds.left) * 1.5;
    const relTop = (e.clientY - bounds.top) * 1.5;
    if (relLeft < 0) {
      relLeft = 0;
    }
    setRelPosition([relLeft, relTop]);
  };

  if (selectedStyle.photos[0].url === '') {
    return null;
  }

  return (
    zoom && !expanded
      ? (
        <div className="imageViewPort expanded center">
          <button className="imgContainer" type="button" aria-label="image-window" onClick={handleZoom} onMouseMove={mousePos} style={{ width: `${dimensions[0]}px`, height: `${dimensions[1]}px`, overflow: 'hidden' }}>
            <div style={{
              width: `${dimensions[0] * 4}px`, height: `${dimensions[1] * 4}px`, overflow: 'hidden', cursor: 'zoom-out', position: 'relative', left: `${-1.5 * dimensions[0]}px`, top: `${-1.5 * dimensions[1]}px`,
            }}
            >
              <img
                src={selectedStyle.photos[imageIndex].url || 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bm90JTIwZm91bmR8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60'}
                alt="SelectedImage"
                key={selectedStyle.style_id}
                style={{
                  width: `${dimensions[0] * 2.5}px`, height: `${dimensions[1] * 2.5}px`, position: 'relative', bottom: `${relPosition[1] - (dimensions[1] * 1.495)}px`, right: `${relPosition[0] - (dimensions[0] * 0.74)}px`, objectFit: 'cover',
                }}
              />
            </div>
          </button>
        </div>
      )
      : (
        <div className="imageView">
          <button type="button" className="topRight buttonWrap" data-testid="expandBtn" onClick={() => { dispatch(toggleState('expanded')); }}>
            {expanded ? <FaCompress size={22} /> : <FaExpand size={22} /> }
          </button>
          <div className={expanded ? 'expanded' : 'inline'}>
            <div className="sideGrid">
              {page > 0 ? <FaChevronUp className="chevron" data-testid="chevron-icon" onClick={() => dispatch(handleStateUpdate({ name: 'page', value: page - 1 }))} /> : null}
              <SideImages />
              {page < ((selectedStyle.photos.length / 7) - 1)
                ? <FaChevronDown className="chevron" aria-label="down-arrow" data-testid="chevron-icon" onClick={() => dispatch(handleStateUpdate({ name: 'page', value: page + 1 }))} />
                : null}
            </div>
            <div className="center">
              {imageIndex > 0 ? <FaChevronLeft className="chevron" aria-label="left-arrow" data-testid="chevron-icon" onClick={() => handleHorizontalScroll('left')} /> : null}
              <input type="image" className={expanded ? 'expandedImage' : 'mainImage'} aria-label="main-image" src={(expanded ? selectedStyle.photos[imageIndex].url : selectedStyle.photos[imageIndex].thumbnail_url) || 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bm90JTIwZm91bmR8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60'} alt="SelectedImage" key={selectedStyle.style_id} ref={imgRef} onClick={expanded ? handleZoom : null} height="2000" />
              {imageIndex < selectedStyle.photos.length - 1 ? <FaChevronRight className="chevron" data-testid="chevron-icon" aria-label="right-arrow" onClick={() => handleHorizontalScroll('right')} /> : null}
            </div>
          </div>
        </div>
      )

  );
}

export default ImageViewer;
