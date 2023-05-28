import doctor from '../../assets/doctor.png';

const OurTeam = () => {
  return (
    <section className="pt-20 pb-10 lg:pt-[50px] lg:pb-20">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
              <span className="mb-2 block text-xl font-semibold text-primary">Our Doctors</span>
            </div>
          </div>
        </div>
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 md:w-1/2 xl:w-1/4">
            <div className="mx-auto mb-10 w-full max-w-[370px]">
              <div className="relative overflow-hidden rounded-lg">
                <img src={doctor} alt="doctor" className="w-full" />
              </div>
              <div className="text-center mt-2">
                <p className="font-bold">Dr.Caudi</p>
                <span className="text-xs">+391 123 123</span>
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 xl:w-1/4">
            <div className="mx-auto mb-10 w-full max-w-[370px]">
              <div className="relative overflow-hidden rounded-lg">
                <img src={doctor} alt="doctor" className="w-full" />
              </div>
              <div className="text-center mt-2">
                <p className="font-bold">Dr.Caudi</p>
                <span className="text-xs">+391 123 123</span>
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 xl:w-1/4">
            <div className="mx-auto mb-10 w-full max-w-[370px]">
              <div className="relative overflow-hidden rounded-lg">
                <img src={doctor} alt="doctor" className="w-full" />
              </div>
              <div className="text-center mt-2">
                <p className="font-bold">Dr.Caudi</p>
                <span className="text-xs">+391 123 123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
