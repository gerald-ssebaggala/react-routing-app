import { IoArrowBackOutline } from "react-icons/io5";
import { IoArrowForwardSharp } from "react-icons/io5";

interface ButtonsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPrev: () => void;
  onNext: () => void;
}
export default function Buttons({
  onNext,
  onPrev,
  hasNextPage,
  hasPrevPage,
}: ButtonsProps) {
  return (
    <div className="move-buttons">
      <button
        className={`prev-btn  ${hasPrevPage && "move-button"} `}
        disabled={!hasPrevPage}
        onClick={() => onPrev()}
      >
        <IoArrowBackOutline />
        <span className="btn-span">Previous</span>
      </button>
      <button
        className={`next-btn  ${hasNextPage && "move-button"} `}
        disabled={!hasNextPage}
        onClick={() => onNext()}
      >
        <span className="btn-span">Next</span>
        <IoArrowForwardSharp />
      </button>
    </div>
  );
}
