import { useEffect, useRef, useState } from 'react';
import './App.css';
import Lenis from '@studio-freight/lenis';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Phone, MapPin, Facebook, Instagram, Clock, ChefHat, Quote, Menu, X } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MenuPage from './pages/MenuPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="App bg-background min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => {
  const lenisRef = useRef();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, { offset: -80 });
    }
  };

  return (
    <>
      <Navigation scrollToSection={scrollToSection} />
      <Hero scrollToSection={scrollToSection} />
      <About />
      <Signature />
      <MenuPreview />
      <Testimonials />
      <Gallery />
      <Contact />
      <Footer scrollToSection={scrollToSection} />
    </>
  );
};

// ... Navigation, Hero, About, Signature, MenuPreview components remain unchanged ...
// ... Testimonials component ...
const Testimonials = () => {
  // ... (Testimonials implementation) ...
  const reviews = [
    {
      name: "Sarah M.",
      text: "Authentic Jaffna experience! The crab curry is legendary and the portions are incredibly generous. A must-visit when in Jaffna.",
      rating: 5,
      location: "Colombo"
    },
    {
      name: "David K.",
      text: "Best mutton kothu I've ever had. The ambiance is beautiful and staff is very friendly. The clay pot presentation adds such a nice touch.",
      rating: 5,
      location: "London, UK"
    },
    {
      name: "Priya R.",
      text: "A hidden gem in Jaffna. The seafood noodles were fresh and spicy, just how I like it. Authentic northern flavors at their best.",
      rating: 5,
      location: "Jaffna"
    }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-24 md:py-32 bg-[#0F0F0F]" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Quote className="w-12 h-12 text-primary mx-auto mb-6 opacity-80" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4" data-testid="testimonials-title">
            What Our <span className="text-secondary">Guests</span> Say
          </h2>
          <p className="text-lg md:text-xl font-normal leading-relaxed text-neutral-300 max-w-2xl mx-auto">
            Honest reviews from our beloved customers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-[#1a1a1a] p-8 rounded-lg border border-white/5 hover:border-primary/30 transition-all duration-300 group relative"
            >
              <div className="absolute top-4 right-4 text-primary/20 group-hover:text-primary/40 transition-colors">
                <Quote className="w-8 h-8 rotate-180" />
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-secondary fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-neutral-300 text-lg italic mb-6 leading-relaxed">"{review.text}"</p>

              <div>
                <h4 className="text-white font-bold text-lg">{review.name}</h4>
                <p className="text-primary text-sm uppercase tracking-widest">{review.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Navigation = ({ scrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        // Retry scroll after navigation
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      scrollToSection(sectionId);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-white/5 ${isScrolled || isMobileMenuOpen ? 'bg-background/95 backdrop-blur-xl' : 'bg-transparent'
        }`}
      data-testid="navigation"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="text-2xl font-heading font-bold tracking-tight" data-testid="brand-logo">
          <span className="text-primary">JAC</span> <span className="text-foreground">Dining</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => handleNavClick('about')} className="text-sm uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-200" data-testid="nav-about">About</button>
          <button onClick={() => navigate('/menu')} className="text-sm uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-200" data-testid="nav-menu">Menu</button>
          <button onClick={() => handleNavClick('contact')} className="text-sm uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-200" data-testid="nav-contact">Contact</button>
          <a href="https://wa.me/94777265597" target="_blank" rel="noopener noreferrer" className="bg-primary text-white hover:bg-[#c94e1b] transition-all duration-300 rounded-full px-6 py-2 text-sm uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(227,93,37,0.3)] hover:shadow-[0_0_30px_rgba(227,93,37,0.5)]" data-testid="nav-reserve-btn">Reserve</a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background border-t border-white/10"
        >
          <div className="flex flex-col p-6 space-y-6">
            <button onClick={() => handleNavClick('about')} className="text-left text-lg uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-200">About</button>
            <button onClick={() => { setIsMobileMenuOpen(false); navigate('/menu'); }} className="text-left text-lg uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-200">Menu</button>
            <button onClick={() => handleNavClick('contact')} className="text-left text-lg uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-200">Contact</button>
            <a href="https://wa.me/94777265597" target="_blank" rel="noopener noreferrer" className="bg-primary text-white hover:bg-[#c94e1b] transition-all duration-300 rounded-full px-6 py-3 text-center text-sm uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(227,93,37,0.3)]">Reserve Now</a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

const Hero = ({ scrollToSection }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const navigate = useNavigate();

  return (
    <section className="relative h-screen w-full overflow-hidden" data-testid="hero-section">
      <motion.div
        style={{ y }}
        className="absolute top-20 left-0 w-full h-full"
      >
        <div className="absolute inset-0 bg-hero-gradient z-10" />
        <img
          src="/home6.jpg"
          alt="Authentic Jaffna Cuisine"
          className="w-full h-full object-cover"
          data-testid="hero-image"
        />
      </motion.div>
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-white mb-6" data-testid="hero-title">
              Taste of <span className="text-primary">Jaffna</span>
              <br />
              Soul in Every Spice
            </h1>
            <p className="text-lg md:text-xl font-normal leading-relaxed text-neutral-300 max-w-2xl mx-auto mb-10" data-testid="hero-subtitle">
              Authentic Tamil cuisine crafted with tradition, passion, and the bold flavors of Northern Sri Lanka
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onClick={() => navigate('/menu')} className="bg-primary text-white hover:bg-[#c94e1b] transition-all duration-300 rounded-full px-8 py-4 text-sm uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(227,93,37,0.3)] hover:shadow-[0_0_30px_rgba(227,93,37,0.5)]" data-testid="hero-menu-btn">View Menu</button>
              <button onClick={() => scrollToSection('contact')} className="bg-transparent border border-white/20 text-white hover:border-white hover:bg-white/5 transition-all duration-300 rounded-full px-8 py-4 text-sm uppercase tracking-widest" data-testid="hero-visit-btn">Visit Us</button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" className="py-24 md:py-32 relative" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-spice-glow" />
              <img
                src="/home.jpg"
                alt="JAC Dining Interior"
                className="w-full h-[500px] object-cover rounded-sm relative z-10"
                data-testid="about-image"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6" data-testid="about-title">
              Where <span className="text-secondary">Heritage</span> Meets Flavor
            </h2>
            <p className="text-lg md:text-xl font-normal leading-relaxed text-neutral-300 mb-6" data-testid="about-description">
              Welcome to <strong>JAC Dining (Jaffna Authentic Cuisine)</strong>. Born from the vibrant streets of Jaffna, our kitchen carries the soul of Tamil tradition. Every dish tells a story of spices carefully selected, recipes passed through generations, and the warmth of home-cooked meals.
            </p>
            <p className="text-lg md:text-xl font-normal leading-relaxed text-neutral-300 mb-8">
              Known for our generous portions and bold, authentic flavors, we invite you to experience the true taste of Northern Sri Lanka.
            </p>
            <div className="flex items-center gap-4">
              <ChefHat className="text-primary w-12 h-12" />
              <div>
                <p className="text-sm uppercase tracking-widest text-secondary font-medium">Since 2020</p>
                <p className="text-base text-neutral-400">Authentic Jaffna Cuisine</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Signature = () => {
  const dishes = [
    {
      name: 'Jaffna Crab Curry',
      description: 'Our legendary signature – fresh crab simmered in aromatic roasted spices and coconut milk',
      image: '/crap.png',
    },
    {
      name: 'Mutton Biryani',
      description: 'Fragrant basmati rice slow-cooked with tender mutton and authentic Jaffna spices',
      image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=85&w=800&auto=format&fit=crop',
    },
    {
      name: 'Jaffna Seafood Noodles',
      description: 'Stir-fried noodles loaded with fresh crab, prawns, cuttlefish, and vegetables',
      image: '/noodles.png',
    },
    {
      name: 'Mutton Devilled',
      description: 'Tender chunks of mutton stir-fried with spicy chili paste, onions, and capsicum',
      image: '/dev.jpg',
    },
    {
      name: 'Odiyal Kool',
      description: 'A traditional thick seafood soup made with palmyrah root flour and fresh catch',
      image: '/odiyal.webp',
    },
    {
      name: 'Prawn Curry',
      description: 'Succulent prawns cooked in a spicy, tangy tamarind and coconut gravy',
      image: '/prawn_curry.jpg',
    },
  ];

  // Duplicate dishes to create a seamless loop
  const duplicatedDishes = [...dishes, ...dishes, ...dishes];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-24 md:py-32 bg-[#0A0A0A] overflow-hidden" data-testid="signature-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4" data-testid="signature-title">
            Our <span className="text-primary">Signature</span> Dishes
          </h2>
          <p className="text-lg md:text-xl font-normal leading-relaxed text-neutral-300 max-w-2xl mx-auto">
            Celebrated flavors that define the JAC Dining experience
          </p>
        </motion.div>
      </div>

      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-8 px-4 w-max"
          animate={{
            x: ["0%", "-33.33%"] // Moving 1/3 since we triplicated the list.
          }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30,
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {duplicatedDishes.map((dish, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden flex-shrink-0 w-[300px] md:w-[400px] h-[450px] rounded-sm cursor-pointer"
              whileHover={{ scale: 1.02, y: -10 }}
              transition={{ duration: 0.3 }}
              data-testid={`signature-dish-${index}`}
            >
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 transform-gpu"
                  style={{ filter: 'contrast(1.15) saturate(1.1)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-normal text-white mb-2 transform group-hover:text-primary transition-colors duration-300">
                    {dish.name}
                  </h3>
                  <p className="text-sm md:text-base font-light leading-relaxed text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                    {dish.description}
                  </p>
                  <div className="mt-4 w-12 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const MenuPreview = () => {
  const menuData = {
    'Soups': [
      { name: 'Mutton Soup', price: '550' },
      { name: 'Chicken Soup', price: '450' },
      { name: 'Prawn Soup', price: '650' },
      { name: 'Fish Soup', price: '550' },
    ],
    'Appetizers': [
      { name: 'Mutton Rolls', price: '450' },
      { name: 'Chicken Rolls', price: '350' },
      { name: 'Egg Rolls', price: '250' },
      { name: 'Vegetable Samosa', price: '200' },
      { name: 'Fish Cutlet', price: '300' },
      { name: 'Chicken Wings', price: '400' },
    ],
    'Fresh Juice': [
      { name: 'Orange Juice', price: '300' },
      { name: 'Watermelon Juice', price: '250' },
      { name: 'Pineapple Juice', price: '250' },
      { name: 'Lime Juice', price: '200' },
      { name: 'Passion Fruit Juice', price: '350' },
    ],
    'Milk Shakes': [
      { name: 'Vanilla Shake', price: '350' },
      { name: 'Chocolate Shake', price: '350' },
      { name: 'Strawberry Shake', price: '350' },
      { name: 'Mango Shake', price: '350' },
      { name: 'Avocado Shake', price: '400' },
    ],
    'Hot Beverages': [
      { name: 'Ceylon Tea', price: '150' },
      { name: 'Milk Tea', price: '200' },
      { name: 'Coffee', price: '250' },
      { name: 'Cappuccino', price: '350' },
    ],
    'Soft Drinks': [
      { name: 'Coca-Cola', price: '150' },
      { name: 'Sprite', price: '150' },
      { name: 'Fanta', price: '150' },
      { name: 'Bottled Water', price: '100' },
    ],
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const navigate = useNavigate();

  return (
    <section id="menu" className="py-24 md:py-32" data-testid="menu-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4" data-testid="menu-title">
            Our <span className="text-secondary">Menu</span>
          </h2>
          <p className="text-lg md:text-xl font-normal leading-relaxed text-neutral-300 max-w-2xl mx-auto mb-8">
            Explore the rich flavors of authentic Jaffna cuisine
          </p>
          <button onClick={() => navigate('/menu')} className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-full px-8 py-3 text-sm uppercase tracking-widest font-bold">
            View Full Menu with Images
          </button>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {Object.entries(menuData).slice(0, 4).map(([category, items], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: catIndex * 0.1 }}
            >
              <h3 className="text-2xl md:text-3xl font-semibold tracking-normal mb-6 text-primary border-b border-border pb-3">{category}</h3>
              <div className="space-y-4">
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start group">
                    <span className="text-base md:text-lg text-neutral-300 group-hover:text-white transition-colors duration-200">{item.name}</span>
                    <span className="text-base md:text-lg text-secondary font-medium ml-4">Rs. {item.price}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    '/home1.jpg',
    '/home2.jpg',
    '/home3.jpg',
    '/home4.jpg',
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-24 md:py-32 bg-[#0A0A0A]" data-testid="gallery-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4" data-testid="gallery-title">
            Experience <span className="text-primary">JAC Dining</span>
          </h2>
          <p className="text-lg md:text-xl font-normal leading-relaxed text-neutral-300 max-w-2xl mx-auto">
            A glimpse into our culinary world
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="md:col-span-8 h-[400px] overflow-hidden"
            data-testid="gallery-image-0"
          >
            <img src={images[0]} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-4 h-[400px] overflow-hidden"
            data-testid="gallery-image-1"
          >
            <img src={images[1]} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-4 h-[400px] overflow-hidden"
            data-testid="gallery-image-2"
          >
            <img src={images[2]} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-8 h-[400px] overflow-hidden"
            data-testid="gallery-image-3"
          >
            <img src={images[3]} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="contact" className="py-24 md:py-32" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6" data-testid="contact-title">
              Visit <span className="text-primary">Us</span> Today
            </h2>
            <p className="text-lg md:text-xl font-normal leading-relaxed text-neutral-300 mb-12">
              Experience the authentic taste of Jaffna in the heart of the city. We're open and ready to serve you.
            </p>
            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4" data-testid="contact-address">
                <MapPin className="text-primary w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm uppercase tracking-widest text-secondary font-medium mb-1">Location</p>
                  <p className="text-lg text-neutral-300">812 Hospital Street, Jaffna</p>
                </div>
              </div>
              <div className="flex items-start gap-4" data-testid="contact-phone">
                <Phone className="text-primary w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm uppercase tracking-widest text-secondary font-medium mb-1">Phone</p>
                  <p className="text-lg text-neutral-300">021 222 2223</p>
                  <p className="text-lg text-neutral-300">077 726 5597</p>
                </div>
              </div>
              <div className="flex items-start gap-4" data-testid="contact-hours">
                <Clock className="text-primary w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm uppercase tracking-widest text-secondary font-medium mb-1">Hours</p>
                  <p className="text-lg text-neutral-300">Mon - Sun: 11:00 AM - 3:00 PM</p>
                  <p className="text-lg text-neutral-300">6:30 PM - 10:30 PM</p>
                </div>
              </div>
            </div>
            <a href="https://wa.me/94777265597" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-white hover:bg-[#c94e1b] transition-all duration-300 rounded-full px-8 py-4 text-sm uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(227,93,37,0.3)] hover:shadow-[0_0_30px_rgba(227,93,37,0.5)]" data-testid="contact-whatsapp-btn">
              Reserve via WhatsApp
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-[500px] w-full overflow-hidden rounded-sm"
            data-testid="contact-map"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15753.123456789!2d80.0123456!3d9.6612345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMzknNDAuNCJOIDgwwrAwMCc0NC40IkU!5e0!3m2!1sen!2slk!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="JAC Dining Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ scrollToSection }) => {
  const navigate = useNavigate();
  return (
    <footer className="border-t border-border bg-[#0A0A0A] py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div>
            <div className="text-2xl font-heading font-bold tracking-tight mb-4">
              <span className="text-primary">JAC</span> <span className="text-foreground">Dining</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Authentic Jaffna cuisine served with passion and tradition since 2020. Located at 812 Hospital Street, Jaffna.
            </p>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-widest text-secondary font-medium mb-4">Quick Links</h4>
            <div className="space-y-2">
              <button onClick={() => scrollToSection('about')} className="block text-sm text-neutral-400 hover:text-white transition-colors" data-testid="footer-about">About</button>
              <button onClick={() => navigate('/menu')} className="block text-sm text-neutral-400 hover:text-white transition-colors" data-testid="footer-menu">Menu</button>
              <button onClick={() => scrollToSection('contact')} className="block text-sm text-neutral-400 hover:text-white transition-colors" data-testid="footer-contact">Contact</button>
            </div>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-widest text-secondary font-medium mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors" data-testid="footer-facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors" data-testid="footer-instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center">
          <p className="text-sm text-neutral-400">
            © {new Date().getFullYear()} JAC Dining (Jaffna Authentic Cuisine). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default App;