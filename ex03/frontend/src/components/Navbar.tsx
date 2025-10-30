import { NavLink } from "react-router-dom";

export default function Navbar() {
  const links = [
    { name: "Welcome", page: "welcome" },
    { name: "Add Expense", page: "add" },
    { name: "Expense List", page: "list" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-green-800 shadow-md p-4 z-10">
      <ul className="flex justify-center space-x-6">
        {links.map((link) => (
          <li key={link.page}>
            <NavLink
                to={`/${link.page}`}
                className={({ isActive }) =>
                    `px-3 py-1 rounded transition-colors ${
                    isActive ? "bg-green-700 font-bold text-white" : "text-white hover:text-gray-300"
                    }`
                }
                >
                {link.name}
            </NavLink>

          </li>
        ))}
      </ul>
    </nav>
  );
}
