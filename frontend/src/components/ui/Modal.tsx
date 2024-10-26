"use client"

import { MouseEventHandler, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface ModalProps {
  closeForm: () => void;
  children: React.ReactNode;
}

const Modal = ({ closeForm, children }: ModalProps) => {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  // const onDismiss = useCallback(() => {
  //   router.back()
  // }, [router]);
  const onDismiss = () => {
    closeForm();
  }

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss()
      }
    },
    [onDismiss, overlay, wrapper]
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss()
    },
    [onDismiss]
  )

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-20"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="w-[500px] h-[600px]"
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;