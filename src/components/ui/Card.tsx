import type { ComponentProps } from "react";

export function Card({ className = "", ...rest }: ComponentProps<"div">) {
  return (
    <div
      className={`glass rounded-3xl p-6 transition-shadow duration-300 ${className}`}
      {...rest}
    />
  );
}
