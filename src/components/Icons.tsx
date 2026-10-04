import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 14, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 11 11 5" />
      <path d="M6 5h5v5" />
    </Icon>
  );
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 3.5v9" />
      <path d="m4.5 9 3.5 3.5L11.5 9" />
    </Icon>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m4.5 6.5 3.5 3.5 3.5-3.5" />
    </Icon>
  );
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2" y="5" width="12" height="8.5" rx="1.5" />
      <path d="M5.75 5V3.75a1.25 1.25 0 0 1 1.25-1.25h2a1.25 1.25 0 0 1 1.25 1.25V5" />
      <path d="M2 9h12" />
    </Icon>
  );
}

export function CodeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m5.5 4.5-3.5 3.5 3.5 3.5" />
      <path d="m10.5 4.5 3.5 3.5-3.5 3.5" />
    </Icon>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M13 6.75c0 3.5-5 7.25-5 7.25s-5-3.75-5-7.25a5 5 0 0 1 10 0Z" />
      <circle cx="8" cy="6.75" r="1.75" />
    </Icon>
  );
}
