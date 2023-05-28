import clock from '../../assets/clock.jpg';
import location from '../../assets/location.svg';
import phone from '../../assets/phone.svg';

const InfoCards = () => {
  return (
    <section className="text-gray-600 body-font flex justify-center items-center">
      <div className="container px-5 pb-24 mx-auto">
        <div className="flex flex-wrap -m-4 text-center">
          <div className="sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
            <div className="flex items-center  justify-between p-4 rounded-lg bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
              <div>
                <h2 className="text-gray-900 text-lg font-bold">Opening Hours</h2>
                <p className="text-sm font-semibold text-gray-400">Lorem ipsum dolor sit amet.</p>
              </div>
              <img src={clock} alt="clock" className="w-28 h-28 flex justify-center items-center" />
            </div>
          </div>

          <div className="sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
            <div className="flex items-center  justify-between p-4  rounded-lg bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
              <div>
                <h2 className="text-gray-900 text-lg font-bold">Visit our location</h2>
                <p className="text-sm font-semibold text-gray-400">Lorem ipsum dolor sit amet.</p>
              </div>
              <img src={location} alt="location" className="w-28 h-28 flex justify-center items-center" />
            </div>
          </div>
          <div className="sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
            <div className="flex items-center justify-between p-4 rounded-lg bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
              <div>
                <h2 className="text-gray-900 text-lg font-bold">Contact us now</h2>
                <p className="text-sm font-semibold text-gray-400">Lorem ipsum dolor sit amet.</p>
              </div>
              <img src={phone} alt="phone" className="w-28 h-28 flex justify-center items-center" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoCards;
