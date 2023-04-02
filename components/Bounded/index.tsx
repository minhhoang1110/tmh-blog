import { AsProps } from "@/types";
import clsx from "clsx";
import React, { ReactNode } from "react";

interface Props {
  as?: AsProps | string;
  size?: string;
  className?: string;
  children: ReactNode;
}

const Bounded: React.FC<Props> = ({
  as: Comp = "div",
  size = "base",
  className,
  children,
}) => {
  return (
    <Comp className={clsx("px-4 py-8 md:py-10 md:px-6 lg:py-12", className)}>
      <div
        className={clsx(
          "mx-auto w-full",
          size === "small" && "max-w-xl",
          size === "base" && "max-w-3xl",
          size === "wide" && "max-w-4xl",
          size === "widest" && "max-w-6xl"
        )}
      >
        {children}
      </div>
    </Comp>
  );
};
export default Bounded;
