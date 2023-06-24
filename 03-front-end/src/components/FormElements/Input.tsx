import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  className?: string;
  type: string;
  id: string;
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
  disabled?: boolean;
};

const Input = ({ label, type, register, id, errors, disabled }: InputProps) => {
  return (
    <div className="relative z-0">
      <input
        {...(register && register(id))}
        type={type}
        placeholder=" "
        id={id}
        disabled={disabled}
        className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-3 px-0 text-sm text-gray-900 focus:border-[#1cc7c1] focus:outline-none focus:ring-0"
      />
      <label className="absolute top-4  -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#1cc7c1] peer-focus:dark:text-[#1cc7c1]">
        {label}
      </label>
      {errors && <span className="text-red-600 absolute">{errors[id]?.message?.toString()}</span>}
    </div>
  );
};

export default Input;
