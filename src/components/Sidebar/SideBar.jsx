import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser, FaListAlt } from "react-icons/fa";
import { BsFillCartPlusFill} from "react-icons/bs";
import { BiPurchaseTag} from "react-icons/bi";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { HiUserAdd,HiUsers,HiUser} from "react-icons/hi";
//import { HiUserAdd,HiUsers,HiUser} from "react-icons/hi";
import { ImSkype} from "react-icons/im";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
const routes = [
  
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/add-product",
    name: "Add/Update Product",
    icon: <BsFillCartPlusFill />,
  },
  {
    path: "/products-list",
    name: "Products List",
    icon: <FaListAlt />,
  },
  {
    path: "/purchase-product",
    name: "Purchase Product",
    icon: <BiPurchaseTag />,
  },
  {
    path: "/employee",
    name: "Employee",
    icon: <FaUser />,
    subRoutes: [
      {
        path: "/employee/add",
        name: "Add",
        icon: <HiUserAdd />,
      },
      {
        path: "/employee/view",
        name: "View",
        icon: <HiUsers />,
      },
    ],
  },
  /*
  {
    path: "/supplier",
    name: "Supplier",
    icon: <ImSkype />,
    subRoutes: [
      {
        path: "/supplier/add",
        name: "Add",
        icon: <HiUserAdd />,
      },
      {
        path: "/supplier/view",
        name: "View",
        icon: <HiUsers />,
      },
    ],
  }, */
  {
    path: "/report",
    name: "Report",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/report/income-report",
        name: "Income Report",
        icon: <FaUser />,
      },
      {
        path: "/report/sale-report",
        name: "Sale Report",
        icon: <FaLock />,
      },
      
    ],
  },
  /*
  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/saved",
    name: "Saved",
    icon: <AiFillHeart />,
  },
  */
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Shakil's Shop
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="search">
         
            {/* <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder=""
                />
              )}
            </AnimatePresence> */}
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
