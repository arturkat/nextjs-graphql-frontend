import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { deleteToast, IToast } from "@/redux/toasterSlice";
import { AnimatePresence, motion } from "framer-motion";

const Toast = ({ toast }: { toast: IToast }) => {
  const dispatch = useAppDispatch();
  const deleteDelay = 4000;

  useEffect(() => {
    setTimeout(() => {
      if (toast.createdAt) {
        dispatch(deleteToast(toast.createdAt));
      }
    }, deleteDelay);
  });

  let classes = ``;
  if (toast.type === "error") {
    classes += ` bg-red-200 text-gray-700`;
  } else {
    classes += ` bg-white text-gray-900`;
  }

  return (
    <div
      className={`${classes} flex p-3 mb-2 overflow-hidden rounded-md shadow-md  text-sm opacity-95`}
    >
      <p className="grow pr-1">{toast.msg}</p>
      <div className="flex justify-end cursor-pointer">
        <IoClose
          onClick={() => {
            if (toast.createdAt) {
              dispatch(deleteToast(toast.createdAt));
            }
          }}
        />
      </div>
    </div>
  );
};

const Toaster = () => {
  const toasts = useAppSelector((state) => state.toaster.toasts);

  return (
    <>
      <div className="fixed bottom-0.5 right-2 z-20 w-full max-w-[15rem]">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.createdAt}
              layout
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.3 }}
            >
              <Toast toast={toast} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Toaster;
