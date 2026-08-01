import type { SVGProps } from "react";

export default function AngularIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient
          id="angular-hero-gradient"
          x1="6"
          y1="42"
          x2="42"
          y2="6"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F0060B" />
          <stop offset="0.48" stopColor="#DF2E8C" />
          <stop offset="1" stopColor="#7702FF" />
        </linearGradient>
      </defs>
      <path
        d="M24 2.5 43.5 9.6l-3 25.9L24 45.5 7.5 35.5l-3-25.9L24 2.5Z"
        fill="url(#angular-hero-gradient)"
      />
      <path
        d="m24 9 11.3 26h-4.8l-2.3-5.7h-8.4L17.5 35h-4.8L24 9Zm2.6 16.2L24 18.6l-2.6 6.6h5.2Z"
        fill="white"
      />
    </svg>
  );
}
