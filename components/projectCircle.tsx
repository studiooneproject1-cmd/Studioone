import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function ProjectCircle() {
  return (


      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-64 h-64 bg-[#e1b261] rounded-full flex flex-col items-center justify-center
                      duration-300 ">
        
   
        <span className="text-white text-3xl font-bold mb-2 transition-colors duration-300 group-hover:text-white/80">
          project
        </span>

     
        <span className="border border-white w-12 h-12 p-3 rounded-full flex items-center justify-center
                        group-hover:bg-white">
          <FontAwesomeIcon
            icon={faArrowUp}
            className="text-white ] w-5 h-5 rotate-45"
          />
        </span>
      </div>
    
  );
}
