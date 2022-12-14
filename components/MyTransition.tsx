import React, { ReactNode } from "react";
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  motion,
} from "framer-motion";
import { useRouter } from "next/router";
import { animations } from "@/lib/animations";

type Props = {
  mKey?: string;
  children: ReactNode;
};

const MyTransition = (props: Props) => {
  const router = useRouter();

  let mKey = router.route.concat();
  if (props.mKey) {
    mKey += props.mKey;
  }

  return (
    <>
      {/*<LazyMotion features={domAnimation}>*/}
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.div
          key={mKey}
          layout
          initial="initial"
          animate="animate"
          exit="exit"
          variants={animations.slideUp.variants}
          transition={animations.slideUp.transition}
        >
          {props.children}
        </motion.div>
      </AnimatePresence>
      {/*</LazyMotion>*/}
    </>
  );
};

export default MyTransition;
