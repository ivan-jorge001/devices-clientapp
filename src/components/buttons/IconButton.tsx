import Button, { ButtonProps } from "./Button";
import clsx from "clsx";

interface IconButtonProps extends ButtonProps {}

export default function IconButton(props: IconButtonProps) {
  return (
    <Button className={clsx("icon", props.color, props.className)} {...props} />
  );
}
