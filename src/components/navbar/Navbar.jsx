import React, { useState, useEffect, useRef } from 'react';
import { SpotifyIcon } from '../../assets/icons/SpotifyLogo';
import myImage from "../../assets/images/myImage.jpg"

const Navbar = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropDownOpen(false);
      }
    };

    if (isDropDownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropDownOpen]);

  return (
    <React.Fragment>
      <nav className="bg-black p-2 flex flex-row justify-between">
        <div className="spotify-icon flex justify-center items-center">
          <SpotifyIcon className="w-[2.75rem] h-[2.75rem]" fill={"green"} />
          <p className="text-[green] text-[1.5rem] mx-2 font-bold">Spotify</p>
        </div>
        <div className="user-setting relative" ref={dropdownRef}>
          <div className="cursor-pointer" onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
            <img
              className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
              src={myImage}
              alt="Bordered avatar"
            />
          </div>
          <div
            id="dropdownHover"
            className={`absolute top-12 right-0 z-10 ${isDropDownOpen ? "block" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Account
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Profile
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Setting
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
