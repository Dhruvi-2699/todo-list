export const Navbar = () => {
  return (
    <nav className="flex justify-between bg-blue-600 text-white py-2">
      <div className="logo mx-5">
        <span className="font-bold text-xl cursor-pointer">MyTodoList</span>
      </div>
      <ul className="flex items-center gap-7 mx-4">
        <li className="cursor-pointer hover:font-bold">Home</li>
        <li className="cursor-pointer hover:font-bold">Your Task</li>
      </ul>
    </nav>
  );
};
