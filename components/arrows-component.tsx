import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";

export default function ArrowsComponent() {
  return (
<div className="flex items-center">
  <FontAwesomeIcon
    icon={faAnglesRight}
    className="text-[#e1b261] h-4.5 w-auto"
  />

</div>

  );
}
