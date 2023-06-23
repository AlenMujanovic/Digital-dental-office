import clock from '../../assets/clock.svg';
import location from '../../assets/location.svg';
import phone from '../../assets/phone.svg';

const InfoCards = () => {
  return (
    <section className="p-4 text-gray-600 body-font flex justify-center items-center">
      <div className="container px-5 pb-24 mx-auto pt-1">
        <div className="flex flex-wrap -m-4 text-center justify-between">
          <div className="sm:w-full lg:w-[32%] w-full hover:scale-105 duration-500">
            <div className="flex items-center p-4 rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] bg-theme-green">
              <img src={clock} alt="clock" className="w-24 h-24 flex justify-center items-center" />
              <div className="ml-24">
                <h2 className="text-white text-lg font-bold">Opening Hours</h2>
                <p className="text-xs font-semibold text-white">Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </div>

          <div className="sm:w-full lg:w-[32%] w-full hover:scale-105 duration-500 mt-3 lg:mt-0">
            <div className="flex items-center p-4 rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] bg-slate-700">
              <img src={location} alt="location" className="w-24 h-24 flex justify-center items-center" />
              <div className="ml-24">
                <h2 className="text-white text-lg font-bold">Visit our location</h2>
                <p className="text-xs font-semibold text-white">Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </div>
          <div className="sm:w-full lg:w-[32%] w-full hover:scale-105 duration-500 mt-3 lg:mt-0">
            <div className="flex items-center p-4 rounded-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] bg-theme-green">
              <img src={phone} alt="phone" className="w-24 h-24 flex justify-center items-center" />
              <div className="ml-24">
                <h2 className="text-white text-lg font-bold">Contact us now</h2>
                <p className="text-xs font-semibold text-white">Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoCards;
