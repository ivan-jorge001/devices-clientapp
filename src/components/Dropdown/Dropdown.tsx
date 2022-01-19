import { DetailedHTMLProps, LiHTMLAttributes, ReactNode } from "react";
import "./Dropdown.scss";
import clsx from "clsx";

interface DropdownProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: ReactNode;
  options: DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>[];
}

export default function Dropdown({
  open,
  onOpen,
  onClose,
  children,
  options,
}: DropdownProps) {
  return (
    <div
      className={clsx("dropdown", {
        open,
      })}
    >
      <span onClick={onOpen}>{children}</span>
      <div onClick={onClose} />
      <ul>
        {options.map((option) => (
          <li {...option} />
        ))}
      </ul>
    </div>
  );
}
