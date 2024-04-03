import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const SearchBarContainerHeader = () => {
  return (
    <div
      id="search-container"
      className="flex items-center w-[200px] h-[32px] mr-4 border border-gray-300 rounded px-2"
    >
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        color="gray"
        className="pr-2 text-xs text-custom"
      />
      <input
        type="search"
        placeholder="Search"
        name="search"
        value=""
        onChange={() => {}}
        className="w-[150px] focus:outline-none font-sans text-sm placeholder:text-custom font-normal"
      />
    </div>
  );
};

export default SearchBarContainerHeader;
