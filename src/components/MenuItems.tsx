import * as React from "react";
import { motion } from "framer-motion";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    }
  },
  closed: {
    y: 150,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

export const MenuItem = ({name}:{name: string}) => {
  const style = { border: `2px solid orange` };
  return (
    <motion.li
    className=" list-none p-2 underline my-2 "
      variants={variants}
      whileHover={{ x: 10}}
      whileTap={{ scale: 0.95 }}

    >
      {name}
    </motion.li>
  );
};
