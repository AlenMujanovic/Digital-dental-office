import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  rows: number;
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
  label: string;
};

const Textarea = ({ name, rows, register, id, errors, label }: TextareaProps) => {
  return (
    <div className="relative z-0 col-span-2">
      <textarea
        {...(register && register(name))}
        id={id}
        name={name}
        rows={rows}
        className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-md text-gray-900 focus:border-[#1cc7c1] focus:outline-none focus:ring-0"
        placeholder=" "
      />
      <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#1cc7c1] ">
        {label}
      </label>
      {errors && <span className="text-red-600 absolute">{errors[name]?.message?.toString()}</span>}
    </div>
  );
};

export default Textarea;
