import { FieldErrors, FieldValues, FormSubmitHandler, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { Button, Input, Textarea } from '../FormElements';

interface ContactUsProps {
  onSubmit: SubmitHandler<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const ContactUs = ({ handleSubmit, onSubmit, register, errors }: ContactUsProps) => {
  return (
    <div
      id="contact"
      className="p-4 flex lg:pt-[100px] lg:pb-20 items-center justify-start bg-dentistChair bg-no-repeat bg-cover shadow-inset-white">
      <div className="mx-auto w-full max-w-lg">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-32">
              <span className="mb-5 block text-lg font-semibold text-primary text-[#1cc7c1]">CONTACT US</span>
              <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">Always Connect with us</h2>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-10">
            <Input label="Your name" type="text" name="fullName" id="name" register={register} errors={errors} />
            <Input label="Your email" type="email" name="email" id="email" register={register} errors={errors} />
            <Textarea name="description" rows={5} register={register} errors={errors} label="Your message" />
          </div>
          <Button className="block mx-auto mt-10" type="submit">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
