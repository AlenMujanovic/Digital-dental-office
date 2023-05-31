import { UseFormRegister, FieldValues } from 'react-hook-form';

interface RadioButtonProps {
  value: string;
  id: string;
  name: string;
  label: string;
  register?: UseFormRegister<FieldValues>;
}

const RadioButton = ({ id, name, value, label, register }: RadioButtonProps) => {
  return (
    <div className="flex items-center ml-6">
      <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
        <input
          type="radio"
          {...(register && register(name))}
          value={value}
          className="checkbox  border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none"
        />
        <div className="check-icon hidden border-4 border-indigo-700 rounded-full w-full h-full z-1"></div>
      </div>
      <label id={id} className="ml-2 leading-4 text-sm text-gray-500">
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
