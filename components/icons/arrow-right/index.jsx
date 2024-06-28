const ArrowRight = ({color}) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="ArrowRight_bgCarrier" strokeWidth="0"></g>
      <g
        id="ArrowRight_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="ArrowRight_iconCarrier">
        {' '}
        <path
          d="M20 12L4 12M20 12L14 18M20 12L14 6"
          stroke={color}
          strokeWidth="0.72"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{' '}
      </g>
    </svg>
  );
};

export default ArrowRight;
