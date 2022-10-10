import clsx from "clsx";
import SearchIcon from "./vectors/search-icon";
import "./input-style.scss";

interface InputProps {
  placeholder: string;
  twClasses: string;
}

const InputField = ({
  placeholder = "Search Collections",
  twClasses,
}: Partial<InputProps>) => {
  return (
    <div className={clsx("input-wrapper", twClasses)}>
      <SearchIcon />
      <input type="text" placeholder={placeholder} />
    </div>
  );
};

export default InputField;
