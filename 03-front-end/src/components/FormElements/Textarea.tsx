type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  rows: number;
};

const Textarea = ({ name, rows }: TextareaProps) => {
  return (
    <div className="relative z-0 col-span-2">
      <textarea
        name={name}
        rows={rows}
        className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-[#1cc7c1] focus:outline-none focus:ring-0"
        placeholder=" "></textarea>
      <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#1cc7c1] peer-focus:dark:text-blue-500">
        Your message
      </label>
    </div>
  );
};

export default Textarea;
