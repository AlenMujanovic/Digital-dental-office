import { AboutSection, ContactUs, Hero, InfoCards, OurServices, OurTeam, TestimonialSection } from '../components';

const Home = () => {
  return (
    <div className="p-4">
      <Hero />
      <InfoCards />
      <OurServices />
      <AboutSection />
      <TestimonialSection />
      <OurTeam />
      <ContactUs />
    </div>
  );
};

export default Home;
