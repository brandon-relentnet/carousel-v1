import React, { useState, useEffect, useRef } from 'react';

const Carousel = () => {
  const [scrollMode, setScrollMode] = useState('normal'); // 'manual' or 'normal'
  const carouselRef = useRef(null);
  const blockCount = 25;
  const blocksPerScroll = 3; // Number of blocks to scroll at a time for manual mode
  const blockWidth = 100 + 6 * 2; // Block width + margin (100px + 6px on each side)

  // Automatic scrolling for "normal" mode
  useEffect(() => {
    if (scrollMode === 'normal') {
      const scrollInterval = setInterval(() => {
        if (carouselRef.current) {
          const scrollIncrement = 1; // Relaxed pace
          carouselRef.current.scrollLeft += scrollIncrement;

          // Reset when reaching the duplicated blocks
          if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
            carouselRef.current.scrollLeft = carouselRef.current.scrollLeft - carouselRef.current.scrollWidth / 2;
          }
        }
      }, 30); // Smooth interval timing for consistent scrolling

      return () => clearInterval(scrollInterval);
    }
  }, [scrollMode]);

  // Handle manual scrolling by 3 blocks
  const handleManualScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = blockWidth * blocksPerScroll;
      if (direction === 'left') {
        carouselRef.current.scrollLeft -= scrollAmount;
      } else if (direction === 'right') {
        carouselRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  const handleModeChange = (e) => {
    setScrollMode(e.target.value);
  };

  // Create and duplicate the blocks
  const blocks = Array.from({ length: blockCount }).map((_, index) => (
    <div key={index} style={styles.block}>
      Item {index + 1}
    </div>
  ));

  return (
    <div>
      <div style={styles.dropdownContainer}>
        <label htmlFor="scrollMode">Scroll Mode: </label>
        <select id="scrollMode" value={scrollMode} onChange={handleModeChange}>
          <option value="normal">Normal (Auto Scroll)</option>
          <option value="manual">Manual (With Arrows)</option>
        </select>
      </div>

      {scrollMode === 'manual' && (
        <div style={styles.arrowContainer}>
          <button onClick={() => handleManualScroll('left')} style={styles.arrowButton}>◀</button>
        </div>
      )}

      <div ref={carouselRef} style={styles.carousel}>
        {blocks.concat(blocks)} {/* Duplicate blocks for smooth loop */}
      </div>

      {scrollMode === 'manual' && (
        <div style={styles.arrowContainer}>
          <button onClick={() => handleManualScroll('right')} style={styles.arrowButton}>▶</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  carousel: {
    display: 'flex',
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
    border: '1px solid #ccc',
    padding: '10px 0',
    width: '100%',
    boxSizing: 'border-box',
  },
  block: {
    minWidth: '100px',
    height: '100px',
    margin: '0 6px',
    backgroundColor: '#3498db',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dropdownContainer: {
    marginBottom: '10px',
  },
  arrowContainer: {
    display: 'inline-block',
  },
  arrowButton: {
    fontSize: '20px',
    padding: '10px',
    cursor: 'pointer',
  },
};

export default Carousel;
