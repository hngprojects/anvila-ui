import React, { forwardRef } from "react";
import Image from "next/image";

export interface SVGProps extends React.SVGAttributes<SVGSVGElement> {
  children?: React.ReactNode;
}

export const GoogleLogo = forwardRef<SVGSVGElement, SVGProps>(
  ({ className = "", ...props }, ref) => {
    return (
    <Image
      src="/images/githun logo.png"
      alt="Logo"
      width={30}
      height={30}
    />
    );
  }
);

GoogleLogo.displayName = "GoogleLogo";

export interface GithubSVGProps extends React.SVGAttributes<SVGSVGElement> {
  children?: React.ReactNode;
}

export const GithubLogo = forwardRef<SVGSVGElement, GithubSVGProps>(
  ({ className = "", ...props }, ref) => {
    return (

       <Image
      src="/images/goggle logo.png"
      alt="Logo"
      width={28}
      height={28}
    />
    );
  }
);

GithubLogo.displayName = "GithubLogo";
