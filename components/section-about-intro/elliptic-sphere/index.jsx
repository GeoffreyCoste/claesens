const SvgEllipticSphere = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="100%"
      height="100%"
      viewBox="-1.1 -1.1 2.2 2.2"
    >
      <g
        fill="hsla(0, 0%, 95%, .01)"
        stroke="hsla(255, 255%, 255%, 1)"
        strokeWidth="0.01"
      >
        {/* Centered circle acting like a visual guide */}
        <circle r="1" />

        {/* Yellow centered circle */}
        <circle cx="0" cy="0" r="0.10" fill="#fce300" stroke="none" />

        {/* Animated arcs */}
        <g id="grid">
          <path d="M0 1A1 1 0 0 1 0-1">
            <animateTransform
              attributeName="transform"
              type="scale"
              dur="10s"
              values="1 1; -1 1"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.64 0 0.36 1"
            />
          </path>
          <path d="M0 1A1 1 0 0 1 0-1">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-0.5s"
              dur="10s"
              values="1 1; -1 1"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.64 0 0.36 1"
            />
          </path>
          <path d="M0 1A1 1 0 0 1 0-1">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-1.0s"
              dur="10s"
              values="1 1; -1 1"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.64 0 0.36 1"
            />
          </path>
          <path d="M0 1A1 1 0 0 1 0-1">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-1.5s"
              dur="10s"
              values="1 1; -1 1"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.64 0 0.36 1"
            />
          </path>
          <path d="M0 1A1 1 0 0 1 0-1">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-2.0s"
              dur="10s"
              values="1 1; -1 1"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.64 0 0.36 1"
            />
          </path>
          <path d="M0 1A1 1 0 0 1 0-1">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-2.5s"
              dur="10s"
              values="1 1; -1 1"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.64 0 0.36 1"
            />
          </path>
          <path d="M0 1A1 1 0 0 1 0-1">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-3.0s"
              dur="10s"
              values="1 1; -1 1"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.64 0 0.36 1"
            />
          </path>
          <path d="M0 1A1 1 0 0 1 0-1">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-3.5s"
              dur="10s"
              values="1 1; -1 1"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.64 0 0.36 1"
            />
          </path>
          <path d="M0 1A1 1 0 0 1 0-1">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-4.0s"
              dur="10s"
              values="1 1; -1 1"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.64 0 0.36 1"
            />
          </path>
          <path d="M0 1A1 1 0 0 1 0-1">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-4.5s"
              dur="10s"
              values="1 1; -1 1"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.64 0 0.36 1"
            />
          </path>
          <path d="M0 1A1 1 0 0 1 0-1">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-5.0s"
              dur="10s"
              values="1 1; -1 1"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.64 0 0.36 1"
            />
          </path>
          <path d="M0 1A1 1 0 0 1 0-1">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-5.5s"
              dur="10s"
              values="1 1; -1 1"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.64 0 0.36 1"
            />
          </path>
          <path d="M0 1A1 1 0 0 1 0-1">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-6.0s"
              dur="10s"
              values="1 1; -1 1"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.64 0 0.36 1"
            />
          </path>
          <path d="M0 1A1 1 0 0 1 0-1">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-6.5s"
              dur="10s"
              values="1 1; -1 1"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.64 0 0.36 1"
            />
          </path>
          <path d="M0 1A1 1 0 0 1 0-1">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-7.0s"
              dur="10s"
              values="1 1; -1 1"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.64 0 0.36 1"
            />
          </path>
          <path d="M0 1A1 1 0 0 1 0-1">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-7.5s"
              dur="10s"
              values="1 1; -1 1"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.64 0 0.36 1"
            />
          </path>
          <path d="M0 1A1 1 0 0 1 0-1">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-8.0s"
              dur="10s"
              values="1 1; -1 1"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.64 0 0.36 1"
            />
          </path>
          <path d="M0 1A1 1 0 0 1 0-1">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-8.5s"
              dur="10s"
              values="1 1; -1 1"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.64 0 0.36 1"
            />
          </path>
          <path d="M0 1A1 1 0 0 1 0-1">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-9.0s"
              dur="10s"
              values="1 1; -1 1"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.64 0 0.36 1"
            />
          </path>
          <path d="M0 1A1 1 0 0 1 0-1">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-9.5s"
              dur="10s"
              values="1 1; -1 1"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.64 0 0.36 1"
            />
          </path>
        </g>
      </g>
    </svg>
  );
};

export default SvgEllipticSphere;
