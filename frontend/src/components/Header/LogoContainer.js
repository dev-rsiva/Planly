import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrello } from "@fortawesome/free-brands-svg-icons";

const LogoContainer = ({ setSidebarSelection }) => {
  const navigate = useNavigate();

  return (
    <div
      id="logo-container"
      className="ml-8 mr-8 flex justify-center items-center cursor-pointer"
      onClick={() => {
        setSidebarSelection("Boards");
        navigate("/user");
      }}
    >
      <FontAwesomeIcon
        icon={faTrello}
        color="#455570"
        className="mr-2 text-[16px]"
      />
      <p className="text-xl font-mono font-extrabold text-[#5F6D85]">Planly</p>
    </div>
  );
};


export default LogoContainer