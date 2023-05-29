import dentistChair from '../../assets/dentistChair.jpg';
import { Button } from '../FormElements';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative bg-white pt-[120px] pb-[110px] lg:pt-[150px] bg-dentistChair bg-no-repeat bg-cover shadow-inset-white">
      <div className="p-4 container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-5/12">
            <div className="hero-content">
              <h1 className="mb-3 text-4xl font-bold leading-snug text-dark sm:text-[42px] lg:text-[40px] xl:text-[42px]">
                Your New Smile <br />
                Starts Here <br />
              </h1>
              <p className="mb-8 max-w-[480px] text-base text-body-color">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati mollitia fuga quos voluptates! Reiciendis sequi tempore
                fugit. Ipsa mollitia dignissimos fuga quo in. Natus dolore atque ut ab mollitia soluta!
              </p>
              <ul className="flex flex-wrap items-center">
                <li>
                  <Button type="button" className="inline-flex">
                    GET APPOINTMENT
                  </Button>
                </li>
              </ul>
            </div>
          </div>
          <div className="hidden px-4 lg:block lg:w-1/12"></div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="lg:ml-auto lg:text-right">
              <div className="relative z-10 inline-block pt-11 lg:pt-0">
                <img src={dentistChair} alt="hero" className="max-w-full lg:ml-auto" />
                <span className="absolute -left-8 -bottom-8 z-[-1]">
                  <svg width="93" height="93" viewBox="0 0 93 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="2.5" cy="2.5" r="2.5" fill="#1cc7c1" />
                    <circle cx="2.5" cy="24.5" r="2.5" fill="#1cc7c1" />
                    <circle cx="2.5" cy="46.5" r="2.5" fill="#1cc7c1" />
                    <circle cx="2.5" cy="68.5" r="2.5" fill="#1cc7c1" />
                    <circle cx="2.5" cy="90.5" r="2.5" fill="#1cc7c1" />
                    <circle cx="24.5" cy="2.5" r="2.5" fill="#1cc7c1" />
                    <circle cx="24.5" cy="24.5" r="2.5" fill="#1cc7c1" />
                    <circle cx="24.5" cy="46.5" r="2.5" fill="#1cc7c1" />
                    <circle cx="24.5" cy="68.5" r="2.5" fill="#1cc7c1" />
                    <circle cx="24.5" cy="90.5" r="2.5" fill="#1cc7c1" />
                    <circle cx="46.5" cy="2.5" r="2.5" fill="#1cc7c1" />
                    <circle cx="46.5" cy="24.5" r="2.5" fill="#1cc7c1" />
                    <circle cx="46.5" cy="46.5" r="2.5" fill="#1cc7c1" />
                    <circle cx="46.5" cy="68.5" r="2.5" fill="#1cc7c1" />
                    <circle cx="46.5" cy="90.5" r="2.5" fill="#1cc7c1" />
                    <circle cx="68.5" cy="2.5" r="2.5" fill="#1cc7c1" />
                    <circle cx="68.5" cy="24.5" r="2.5" fill="#1cc7c1" />
                    <circle cx="68.5" cy="46.5" r="2.5" fill="#1cc7c1" />
                    <circle cx="68.5" cy="68.5" r="2.5" fill="#1cc7c1" />
                    <circle cx="68.5" cy="90.5" r="2.5" fill="#1cc7c1" />
                    <circle cx="90.5" cy="2.5" r="2.5" fill="#1cc7c1" />
                    <circle cx="90.5" cy="24.5" r="2.5" fill="#1cc7c1" />
                    <circle cx="90.5" cy="46.5" r="2.5" fill="#1cc7c1" />
                    <circle cx="90.5" cy="68.5" r="2.5" fill="#1cc7c1" />
                    <circle cx="90.5" cy="90.5" r="2.5" fill="#1cc7c1" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
