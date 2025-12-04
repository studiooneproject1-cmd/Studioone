import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function ProjectCircle() {
  return (
    <div
      className="
        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64
        bg-[#e1b261] rounded-full flex flex-col items-center justify-center
        duration-300
      "
    >
      <span className="
        text-white text-xl sm:text-2xl md:text-3xl
        font-bold mb-2 transition-colors duration-300
      ">
        project
      </span>

      <span className="
        border border-white w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12
        p-2 sm:p-3
        rounded-full flex items-center justify-center
      ">
        <FontAwesomeIcon
          icon={faArrowUp}
          className="text-white w-4 h-4 sm:w-5 sm:h-5 rotate-45"
        />
      </span>
    </div>
  );
}
