import john from '../../assets/john.png';
import ema from '../../assets/ema.png';
import watson from '../../assets/watson.png';
import message from '../../assets/message.png';

const TestimonialSection = () => {
  return (
    <section id="reviews" className="p-4 pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 flex flex-row justify-between">
            <div className="mb-12 max-w-[510px] lg:mb-10">
              <span className="mb-5 block text-lg font-semibold text-primary text-[#1cc7c1]">TESTIMONIAL</span>
              <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">What's Our Patients Says</h2>
            </div>
            <img src={message} alt="message" className="h-28" />
          </div>
        </div>
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="mb-8 rounded-[20px] bg-white p-10 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] hover:shadow-lg md:px-7 xl:px-10">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate consequatur dolorem quidem aliquam nulla, voluptate
                temporibus ab sapiente ratione fugiat? Eligendi libero aut eius consequuntur in tempora vero dolores fugiat!
              </p>
              <div className="mt-16 flex flex-row gap-8">
                <img src={john} alt="john" className="h-16" />
                <div>
                  <p className="font-bold">Winston Henry</p>
                  <span className="text-sm">California</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="mb-8 rounded-[20px] bg-white p-10 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] hover:shadow-lg md:px-7 xl:px-10">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate consequatur dolorem quidem aliquam nulla, voluptate
                temporibus ab sapiente ratione fugiat? Eligendi libero aut eius consequuntur in tempora vero dolores fugiat!
              </p>
              <div className="mt-16 flex flex-row gap-8">
                <img src={watson} alt="watson" className="h-16" />
                <div>
                  <p className="font-bold">Winston Henry</p>
                  <span className="text-sm">California</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="mb-8 rounded-[20px] bg-white p-10 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] hover:shadow-lg md:px-7 xl:px-10">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate consequatur dolorem quidem aliquam nulla, voluptate
                temporibus ab sapiente ratione fugiat? Eligendi libero aut eius consequuntur in tempora vero dolores fugiat!
              </p>
              <div className="mt-16 flex flex-row gap-8">
                <img src={ema} alt="ema" className="h-16" />
                <div>
                  <p className="font-bold">Winston Henry</p>
                  <span className="text-sm">California</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
