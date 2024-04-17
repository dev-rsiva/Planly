import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const MoreDropdown = ({ info, setNavItemStatus }) => {
  return (
    <div className="absolute top-[160%] left-[0%] rounded-md shadow-2xl min-w-[308px] border border-gray-200 py-2 px-4 bg-white">
      <ul>
        {info?.map((each, i) => {
          return (
            <li
              key={i}
              onClick={() => {
              }}
            >
              <div className="flex items-center pb-4">
                <div className="w-full flex justify-between items-center">
                  <p className="">{each.hidedItem}</p>
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className="mb-[2px] pl-1"
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MoreDropdown;
