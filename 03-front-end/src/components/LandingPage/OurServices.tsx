import flouride from '../../assets/flouride.png';
import cavity from '../../assets/cavity.png';
import whitening from '../../assets/teath.png';

const OurServices = () => {
  return (
    <section className="pb-12 lg:pb-[90px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-32">
              <span className="mb-2 block text-lg font-semibold text-primary">OUR SERVICES</span>
              <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">Services We Provide</h2>
            </div>
          </div>
        </div>
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="mb-8 md:px-7 xl:px-10">
              <div className="mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary mx-auto">
                <img src={flouride} alt="flouride" />
              </div>
              <h4 className="mb-3 text-xl font-semibold text-dark text-center">Flouride Treatment</h4>
              <p className="text-body-color">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias at nobis repellat aperiam ipsum impedit unde. Nisi.
              </p>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="mb-8 md:px-7 xl:px-10">
              <div className="mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary mx-auto">
                <img src={cavity} alt="cavity" />
              </div>
              <h4 className="mb-3 text-xl font-semibold text-dark text-center">Cavity Filing</h4>
              <p className="text-body-color">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias at nobis repellat aperiam ipsum impedit unde. Nisi.
              </p>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="mb-8 md:px-7 xl:px-10">
              <div className="mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary mx-auto">
                <img src={whitening} alt="whitening" />
              </div>
              <h4 className="mb-3 text-xl font-semibold text-dark text-center">Flouride Treatment</h4>
              <p className="text-body-color">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias at nobis repellat aperiam ipsum impedit unde. Nisi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
