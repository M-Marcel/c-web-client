import { ChangeEvent, FC, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  name: string;
  type?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickSuffix?: () => void;
  belowDesc?: string;
  suffix?: any;
}

const Input2: FC<InputProps> = ({
  label,
  placeholder,
  name,
  type = "text",
  belowDesc,
  required,
  suffix,
  onClickSuffix,
  onChange,
  ...rest
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="flex items-center gap-x-2 mb-2 text-white"
        >
          {label} {required && <span className="text-txt-2">(required)</span>}
        </label>
      )}
      <div className="select">
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          autoComplete="off"
          className="text-white outline-none text-[1.125rem] w-full"
          onChange={onChange}
          {...rest}
        />
        {suffix && (
          <span
            className="text-white text-right cursor-pointer"
            onClick={onClickSuffix}
          >
            {suffix}
          </span>
        )}
      </div>
      {belowDesc && (
        <p className="create-new-nft-wrapper-2-label-type mt-1">{belowDesc}</p>
      )}
    </div>
  );
};

export default Input2;
