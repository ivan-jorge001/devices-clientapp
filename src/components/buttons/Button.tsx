import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import clsx from "clsx";

type ButtonType = "success" | "info" | "error";

export interface ButtonProps
  extends DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
  > {
  color?: ButtonType;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      type="button"
      className={clsx(props.color, props.className)}
      {...props}
    />
  );
}
