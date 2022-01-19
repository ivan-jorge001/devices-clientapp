import { ReactNode, useEffect, useMemo } from "react";
import "./Dialog.scss";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
  body: ReactNode;
  footer?: ReactNode;
  header?: ReactNode;
}

export default function Dialog({
  open,
  onClose,
  children,
  header,
  footer,
  body,
}: ConfirmDialogProps) {
  const renderDialog = (children: ReactNode) => (
    <dialog>
      <div onClick={onClose} />
      <div>{children}</div>
    </dialog>
  );

  const renderHeader = useMemo(
    () => !!header && <header>{header}</header>,
    [header]
  );
  const renderBody = useMemo(() => !!body && <div>{body}</div>, [body]);
  const renderFooter = useMemo(
    () => !!footer && <footer>{footer}</footer>,
    [footer]
  );

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  if (!open) return null;

  if (children) return renderDialog(children);

  return renderDialog(
    <>
      {renderHeader}
      {renderBody}
      {renderFooter}
    </>
  );
}
