import { NavLink } from "react-router-dom";
import { Home, PlusIcon, Calendar, Sparkles, Settings } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-50">
      <ul className="flex justify-around items-center py-2 max-w-lg mx-auto">
        {/* Home */}
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs sm:text-sm transition-colors ${
                isActive ? "text-blue-500" : "text-gray-500"
              }`
            }
          >
            <Home size={22} className="sm:size-6" />
            <span>Home</span>
          </NavLink>
        </li>

         {/* Boost */}
         <li>
          <NavLink
            to="/boost"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs sm:text-sm transition-colors ${
                isActive ? "text-blue-500" : "text-gray-500"
              }`
            }
          >
            <Sparkles size={22} className="sm:size-6" />
            <span>Boost</span>
          </NavLink>
        </li>

        {/* Log Mood */}
        <li>
          <NavLink
            to="/log"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs sm:text-sm transition-colors ${
                isActive ? "text-blue-500" : "text-gray-500"
              }`
            }
          >
            <PlusIcon size={22} className="sm:size-6" />
            <span>Log</span>
          </NavLink>
        </li>

        {/* History */}
        <li>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs sm:text-sm transition-colors ${
                isActive ? "text-blue-500" : "text-gray-500"
              }`
            }
          >
            <Calendar size={22} className="sm:size-6" />
            <span>History</span>
          </NavLink>
        </li>

       

        {/* Settings */}
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs sm:text-sm transition-colors ${
                isActive ? "text-blue-500" : "text-gray-500"
              }`
            }
          >
            <Settings size={22} className="sm:size-6" />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
