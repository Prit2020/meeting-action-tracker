import { NavLink } from "react-router-dom";
import { Home, ListTodo, History, BarChart3 } from "lucide-react";

const Sidebar = () => {
  const menu = [
    {
      name: "Home",
      path: "/",
      icon: <Home size={20} strokeWidth={1.5} />,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: <ListTodo size={20} strokeWidth={1.5} />,
    },
    {
      name: "History",
      path: "/history",
      icon: <History size={20} strokeWidth={1.5} />,
    },
    {
      name: "Status",
      path: "/status",
      icon: <BarChart3 size={20} strokeWidth={1.5} />,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6">
      <h2 className="text-xl font-bold mb-8 text-blue-600">
        Action Tracker
      </h2>

      <nav className="space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-x-3 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;