import { AboutSection, ContactUs, Footer, Hero, InfoCards, Navbar, OurServices, OurTeam, TestimonialSection } from '../components';

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <InfoCards />
        <OurServices />
        <AboutSection />
        <TestimonialSection />
        <OurTeam />
        <ContactUs />
      </main>
      <Footer />
    </>
  );
};

export default Home;
