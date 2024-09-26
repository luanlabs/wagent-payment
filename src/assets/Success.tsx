import { SvgProps } from '../models';

const Icon = ({ fill }: SvgProps) => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Icons">
      <path
        id="Vector"
        d="M32 6C26.8577 6 21.8309 7.52487 17.5552 10.3818C13.2795 13.2387 9.94702 17.2994 7.97914 22.0502C6.01127 26.8011 5.49638 32.0288 6.49959 37.0723C7.50281 42.1159 9.97907 46.7486 13.6152 50.3848C17.2514 54.0209 21.8842 56.4972 26.9277 57.5004C31.9712 58.5036 37.1989 57.9887 41.9498 56.0209C46.7007 54.053 50.7613 50.7205 53.6182 46.4448C56.4751 42.1691 58 37.1423 58 32C57.9927 25.1066 55.2511 18.4976 50.3767 13.6233C45.5024 8.74889 38.8934 6.00728 32 6ZM43.415 27.415L29.415 41.415C29.2293 41.601 29.0087 41.7485 28.7659 41.8491C28.5231 41.9498 28.2628 42.0016 28 42.0016C27.7372 42.0016 27.4769 41.9498 27.2341 41.8491C26.9913 41.7485 26.7708 41.601 26.585 41.415L20.585 35.415C20.2097 35.0397 19.9989 34.5307 19.9989 34C19.9989 33.4693 20.2097 32.9603 20.585 32.585C20.9603 32.2097 21.4693 31.9989 22 31.9989C22.5307 31.9989 23.0397 32.2097 23.415 32.585L28 37.1725L40.585 24.585C40.7708 24.3992 40.9914 24.2518 41.2342 24.1512C41.477 24.0506 41.7372 23.9989 42 23.9989C42.2628 23.9989 42.523 24.0506 42.7658 24.1512C43.0086 24.2518 43.2292 24.3992 43.415 24.585C43.6008 24.7708 43.7482 24.9914 43.8488 25.2342C43.9494 25.477 44.0011 25.7372 44.0011 26C44.0011 26.2628 43.9494 26.523 43.8488 26.7658C43.7482 27.0086 43.6008 27.2292 43.415 27.415Z"
        fill={fill}
      />
    </g>
  </svg>
);

export default Icon;