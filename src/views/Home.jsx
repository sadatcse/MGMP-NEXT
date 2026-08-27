import About from '../components/Homepage/About';
import Hero from '../components/Homepage/Hero';
import Classes from '../components/Homepage/Classes';
import Team from '../components/Homepage/Team';
import Membership from '../components/Homepage/Membership';
import Testimonial from '../components/Homepage/Testimonial';
import Blog from '../components/Homepage/Blog';
import Photo_galary from '../components/Homepage/Photo_galary';


const Home = ({ trainers = [], testimonials = [], newsPosts = [] }) => {
    return (
        <div>
            <Hero />
            <About />
            <Classes />
            <Team initialData={trainers} />
            <Membership />
            <Testimonial initialData={testimonials} />
            <Blog initialData={newsPosts} />
            <Photo_galary />
        </div>
    );
};

export default Home;
