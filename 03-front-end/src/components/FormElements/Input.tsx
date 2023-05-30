type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  className?: string;
  type: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ label, type, name, onChange }: InputProps) => {
  return (
    <div className="relative z-0">
      <input
        type={type}
        name={name}
        className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-[#1cc7c1] focus:outline-none focus:ring-0"
        placeholder=" "
        onChange={onChange}
      />
      <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#1cc7c1] peer-focus:dark:text-blue-500">
        {label}
      </label>
    </div>
  );
};

export default Input;
