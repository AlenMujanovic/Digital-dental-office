import { Button, Input, Textarea } from '../FormElements';

const ContactUs = () => {
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
        <form>
          <div className="flex flex-col gap-10">
            <Input label="Your name" type="text" name="fullName" />
            <Input label="Your email" type="email" name="email" />
            <Textarea name="message" rows={5} />
          </div>
          <Button className="block mx-auto mt-5" type="submit">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
