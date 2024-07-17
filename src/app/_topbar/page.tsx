const TopBar = () => {
  return (
    <div className="flex gap-3 mb-3">
      <span className="w-1/2 bg-navBlockBackground rounded-full py-1 px-1 flex">
        <span className={`material-symbols-outlined rounded-full p-1 px-2 select-none hover:cursor-pointer`}>
          search
        </span>
        <input type="text" className="w-full px-2 bg-transparent focus:outline-none" placeholder="Search"></input>
      </span>
      <span className="bg-navBlockBackground rounded-full py-1 px-3">
        create new btn
      </span>
      <span className="bg-navBlockBackground rounded-full py-1 px-3">
        color
      </span>
    </div>
  );
};

export default TopBar;
