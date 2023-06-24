import { AboutSection, ContactUs, Footer, Hero, InfoCards, Navbar, OurServices, OurTeam, TestimonialSection } from '../components';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useContact } from '../hooks/ContactUs';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';

const Home = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    description: Yup.string().required('Description is required'),
  });
  const { mutate: signUpUser } = useContact();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      email: '',
      description: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = ({ name, email, description }) => {
    signUpUser(
      { name, email, description },
      {
        onSuccess(data) {
          toast.success(data.message);
        },
        onError(error) {
          toast.error(error.message);
        },
      }
    );
  };

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
        <ContactUs onSubmit={onSubmit} handleSubmit={handleSubmit} register={register} errors={errors} />
      </main>
      <Footer />
    </>
  );
};

export default Home;
