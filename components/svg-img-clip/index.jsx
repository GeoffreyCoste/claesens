const SvgImgClip = ({
  imgSrc,
  filter = false,
  clipPathId,
  clipPathData,
  viewBox = '0 0 1500 1500'
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox} // Use default or value provided
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice" // Responsive and centered
    >
      <defs>
        <clipPath id={clipPathId}>
          <path d={clipPathData} /> {/* Use path provided */}
        </clipPath>

        {/* Filter definition if provided */}
        {filter && (
          <filter id="customFilter">
            <feColorMatrix
              type={filter.type || 'matrix'}
              values={filter.values}
            />
          </filter>
        )}
      </defs>

      {/* Display image inside clip path */}
      <image
        href={imgSrc}
        width="100%"
        height="100%"
        clipPath={`url(#${clipPathId})`}
        preserveAspectRatio="xMidYMid slice" // Fill clip path
        filter={filter ? 'url(#customFilter)' : undefined}
      />
    </svg>
  );
};

export default SvgImgClip;
