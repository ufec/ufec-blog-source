import React, { useEffect, useState } from "react";
import headerNavYml from "../../../content/headerNav.yaml";
import "../../styles/header.css";

export type HeaderNavItem = {
  title: string;
  to: string;
};

export type HeaderNav = {
  items: Array<HeaderNavItem>;
};

const headerNav: HeaderNav = headerNavYml;

export type MenuItemProps = {
  isActive: boolean;
};

const Header = ({ location }: { location: Location }) => {
  const [isTop, setIsTop] = useState(true);
  const [isCollapse, setIsCollapse] = useState(false);
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (isTop && document.documentElement.scrollTop > 0) {
      setIsTop(!isTop);
    }
    window.addEventListener("scroll", handleScroll); // 设置监听事件
    return () => window.removeEventListener("scroll", handleScroll); // 销毁监听
  }, [isTop]);

  //动态为body添加/删除dark-mode class
  const toggleBodyClass = (isDark: boolean) => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  // 每次render都会执行，theme变化时执行
  useEffect(() => {
    const localTheme = localStorage.getItem("blog_theme");
    if (localTheme && localTheme === theme) {
      theme === "dark" ? toggleBodyClass(true) : toggleBodyClass(false);
    }
  }, [theme]);

  useEffect(() => {
    const localTheme = localStorage.getItem("blog_theme");
    // 如果缓存中有主题，则使用缓存中的主题
    if (localTheme) {
      if (localTheme !== theme) {
        setTheme(localTheme);
      }
    } else {
      // 缓存中没有则根据浏览器是否为暗色模式，设置主题
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
      }
    }
  }, []);

  const handleScroll = () => {
    if (isTop && document.documentElement.scrollTop > 0) {
      setIsTop(!isTop);
    }
    if (!isTop && document.documentElement.scrollTop == 0) {
      setIsTop(!isTop);
    }
  };
  // 手动切换主题
  const toggleTheme = (event: React.MouseEvent) => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("blog_theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("blog_theme", "light");
    }
  };

  return (
    <header
      id="header"
      className={`nav-wrapper -sticky transition-opacity duration-300 ${
        isTop ? "" : "bg-white shadow-md"
      }`}
    >
      <nav className={`nav bg-gray-400 md:bg-transparent ${!isTop && "dark:bg-gray-800"}`}>
        <label className="inline-grid select-none place-content-center cursor-pointer h-full swap swap-rotate nav-lines">
          <input
            type="checkbox"
            className="toggle-nav"
            onClick={() => {
              setIsCollapse(!isCollapse);
            }}
          />
          <svg
            className="swap-off fill-current nav-line"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"></path>
          </svg>
          <svg
            className="swap-on fill-current nav-line"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"></polygon>
          </svg>
        </label>
        <div className={`nav-list ${isCollapse ? "-open" : ""}`} role="navigation">
          <div className="list -left">
            {headerNav.items.map((item) => {
              return (
                <li className="item p-0" key={item.to}>
                  <a
                    className={`menu-item link md:text-base sm:text-sm ${
                      isTop ? "text-gray-100" : "text-gray-800"
                    } ${location.pathname === item.to ? "menu-active" : ""} dark:text-gray-100`}
                    key={item.to}
                    href={item.to}
                    title={item.title}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
            <li className="item p-0 flex flex-col md:flex-row" style={{ marginLeft: "auto" }}>
              <span
                className={`link cursor-pointer fill-current ${
                  isTop ? "text-gray-100" : "text-gray-800"
                } dark:text-gray-100`}
                style={{ paddingTop: "1rem" }}
                onClick={toggleTheme}
              >
                {theme === "light" ? "日" : "夜"}
              </span>
            </li>
          </div>
          <div className="list -right">
            <div className="overlay"></div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
