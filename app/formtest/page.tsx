"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

/* I tested the motion.div and had a problem with elements in it still showing up when 
it was closed.I found a solution by adding overflow - hidden to a parent div
*/
export default function FormTestPage() {
  const [optionals, setOptionals] = useState(false);
  const optionalVariants = {
    open: { height: "auto" },
    closed: { height: 0 },
  };

  return (
    <div className="flex-wrap flex">
      <div className="lg:hidden">
        <motion.div
          className="border-2 border-white"
          initial={false}
          animate={optionals ? "open" : "closed"}
          variants={optionalVariants}
        >
          <NavMenuLinks />
        </motion.div>
      </div>
      <button
        onClick={() => setOptionals(!optionals)}
        className="border-2 border-blue-500 p-4"
      >
        Click
      </button>
    </div>
  );
}

function NavMenuLinks() {
  return (
    <div className="flex items-center border-y-2 border-black lg:border-y-0">
      <ul className="font-interSansSerif ms-2 py-1 lg:flex lg:gap-1">
        <li>
          <Link
            href="/woman"
            className="hover:text-white lg:hover:text-black lg:py-2 lg:px-3 lg:rounded-md lg:hover:bg-[#E47112]"
          >
            Woman
          </Link>
        </li>
        <li>
          <Link
            href="/man"
            className="hover:text-white lg:hover:text-black lg:py-2 lg:px-3 lg:rounded-md lg:hover:bg-[#E47112]"
          >
            Man
          </Link>
        </li>
        <li>
          <Link
            href="/products"
            className="hover:text-white lg:hover:text-black lg:py-2 lg:px-3 lg:rounded-md lg:hover:bg-[#E47112]"
          >
            All Products
          </Link>
        </li>
        <li>
          <Link
            href="/shopping-assistant"
            className="hover:text-white lg:hover:text-black lg:py-2 lg:px-3 lg:rounded-md lg:hover:bg-[#E47112]"
          >
            Shopping Assistant
          </Link>
        </li>
      </ul>
    </div>
  );
}
