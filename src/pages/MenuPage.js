import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const MenuPage = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);

    const menuCategories = [
        {
            id: 'starters',
            title: 'Starters & Soups',
            description: 'Begin your culinary journey with our traditional appetizers',
            items: [
                { name: 'Mutton Soup', price: '550', description: 'Rich bone broth with traditional spices', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=85&w=800&auto=format&fit=crop' },
                { name: 'Chicken Soup', price: '450', description: 'Comforting chicken broth with herbs', image: '/chicken_soup.jpg' },
                { name: 'Prawn Soup', price: '650', description: 'Spicy seafood broth with fresh prawns', image: '/prawn_soup.jpg' },
                { name: 'Mutton Rolls', price: '450', description: 'Crispy breaded rolls filled with spicy mutton', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=85&w=800&auto=format&fit=crop' },
                { name: 'Chicken Rolls', price: '350', description: 'Golden fried rolls with savory chicken filling', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=85&w=800&auto=format&fit=crop' },
                { name: 'Fish Cutlet', price: '300', description: 'Spiced fish balls, breaded and fried', image: '/fish_cutlet.jpg' },
            ]
        },
        {
            id: 'mains',
            title: 'Mains & Curries',
            description: 'The heart of financing Jaffna cuisine',
            items: [
                { name: 'Jaffna Crab Curry', price: '1800', description: 'Signature dish with aromatic roasted spices', image: '/crap.png' },
                { name: 'Mutton Curry', price: '1200', description: 'Tender mutton slow-cooked in thick gravy', image: '/mutton.jpg' },
                { name: 'Chicken Curry', price: '950', description: 'Traditional spicy chicken curry', image: '/chicken.jpg' },
                { name: 'Prawn Curry', price: '1100', description: 'Succulent prawns in coconut gravy', image: '/prawn_curry.jpg' },
                { name: 'Squid Curry', price: '1050', description: 'Spicy calamari in rich curry sauce', image: '/squild.jpg' },
                { name: 'Fish Curry', price: '900', description: 'Fresh catch of the day in tamarind sauce', image: '/fish_curry.jpg' },
            ]
        },
        {
            id: 'rice',
            title: 'Rice & Specialties',
            description: 'Perfect accompaniments for our curries',
            items: [
                { name: 'Seafood Kothu', price: '1100', description: 'Chopped roti stir-fried with mixed seafood', image: '/sea_kottu.jpg' },
                { name: 'Mutton Kothu', price: '1200', description: 'Chopped roti stir-fried with spicy mutton', image: '/mutton_kottu.jpg' },
                { name: 'Chicken Kothu', price: '950', description: 'Classic chopped roti with chicken', image: '/chicken_kottu.jpg' },
                { name: 'Pittu', price: '450', description: 'Steamed rice flour cake, perfect with curry', image: '/pittu.jpg' },
                { name: 'String Hoppers (10)', price: '300', description: 'Steamed rice noodle nests', image: '/string.jpg' },
            ]
        },
        {
            id: 'drinks',
            title: 'Beverages',
            description: 'Refreshing drinks and shakes',
            items: [
                { name: 'Mango Shake', price: '350', description: 'Fresh seasonal mango blended with milk', image: '/mango_shake.jpg' },
                { name: 'Avocado Shake', price: '400', description: 'Creamy avocado shake with honey', image: '/ava.jpg' },
                { name: 'Faluda', price: '450', description: 'Rose syrup milk with jelly and ice cream', image: '/faluda.jpg' },
                { name: 'Lime Juice', price: '200', description: 'Freshly squeezed lime with mint', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=85&w=800&auto=format&fit=crop' },
            ]
        }
    ];

    return (
        <div className="bg-background min-h-screen text-foreground">
            {/* Hero Section */}
            <section className="relative h-[60vh] w-full overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <img
                        src="/look.jpg"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
                    <Link
                        to="/"
                        className="absolute top-8 left-8 flex items-center gap-2 text-white/80 hover:text-primary transition-colors duration-300 group z-30"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="uppercase tracking-widest text-sm font-bold">Back to Home</span>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold font-heading mb-4 text-white">
                            Full <span className="text-primary">Menu</span>
                        </h1>
                        <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
                            A curated selection of authentic Jaffna flavors
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Categories Navigation */}
            <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-white/10 overflow-x-auto">
                <div className="max-w-7xl mx-auto px-6 py-4 flex gap-8 min-w-max justify-center md:justify-start">
                    {menuCategories.map((category) => (
                        <a
                            key={category.id}
                            href={`#${category.id}`}
                            className="text-sm uppercase tracking-widest font-bold text-neutral-400 hover:text-primary transition-colors cursor-pointer whitespace-nowrap"
                        >
                            {category.title}
                        </a>
                    ))}
                </div>
            </div>

            {/* Menu Sections */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
                {menuCategories.map((category, index) => (
                    <motion.section
                        key={category.id}
                        id={category.id}
                        className="mb-24 scroll-mt-32"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="mb-12 border-l-4 border-primary pl-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{category.title}</h2>
                            <p className="text-neutral-400">{category.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {category.items.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="group relative bg-[#0F0F0F] rounded-lg overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-300"
                                >
                                    <div className="flex flex-col sm:flex-row h-full">
                                        <div className="w-full sm:w-48 h-48 sm:h-auto overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-6 flex flex-col justify-between flex-1">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{item.name}</h3>
                                                    <span className="text-lg font-bold text-secondary">Rs.{item.price}</span>
                                                </div>
                                                <p className="text-sm text-neutral-400 leading-relaxed mb-4">{item.description}</p>
                                            </div>
                                            <button className="text-xs uppercase tracking-widest font-bold text-neutral-500 group-hover:text-white flex items-center gap-2 self-start transition-colors">
                                                Add to Order <div className="w-8 h-[1px] bg-current" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                ))}
            </div>
        </div>
    );
};

export default MenuPage;
