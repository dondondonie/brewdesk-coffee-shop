import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Coffee, MapPin, Clock, Phone, Instagram, Facebook, Twitter, Award, Heart, Leaf } from 'lucide-react';
import { useState } from 'react';
import { api } from '/utils/api';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [cart, setCart] = useState<Array<{ id: number; name: string; price: string; quantity: number }>>([]);

  const menuCategories = ['all', 'espresso', 'specialty', 'cold-brew'];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('loading');
    setNewsletterMessage('');

    try {
      await api.subscribeNewsletter(newsletterEmail);
      setNewsletterStatus('success');
      setNewsletterMessage('Successfully subscribed! Check your email for confirmation.');
      setNewsletterEmail('');
    } catch (error) {
      setNewsletterStatus('error');
      setNewsletterMessage(error instanceof Error ? error.message : 'Failed to subscribe. Please try again.');
    }
  };

  const addToCart = (item: { id: number; name: string; price: string }) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const menuItems = [
    { id: 1, name: 'Classic Espresso', category: 'espresso', price: '$3.50', description: 'Rich, bold shot of pure coffee perfection' },
    { id: 2, name: 'Cappuccino', category: 'espresso', price: '$4.50', description: 'Velvety foam meets robust espresso' },
    { id: 3, name: 'Caramel Macchiato', category: 'specialty', price: '$5.50', description: 'Sweet caramel swirls with vanilla' },
    { id: 4, name: 'Vanilla Latte', category: 'specialty', price: '$5.00', description: 'Smooth vanilla with creamy steamed milk' },
    { id: 5, name: 'Cold Brew', category: 'cold-brew', price: '$4.50', description: 'Slow-steeped for 18 hours' },
    { id: 6, name: 'Iced Mocha', category: 'cold-brew', price: '$5.50', description: 'Chocolate meets coffee over ice' },
  ];

  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-amber-200 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-900 rounded-full flex items-center justify-center">
              <Coffee className="w-6 h-6 text-amber-50" />
            </div>
            <span className="font-bold text-2xl text-amber-900">BrewDesk</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#about" className="text-amber-900 hover:text-amber-700 transition-colors">About</a>
            <a href="#menu" className="text-amber-900 hover:text-amber-700 transition-colors">Menu</a>
            <a href="#visit" className="text-amber-900 hover:text-amber-700 transition-colors">Visit Us</a>
            <a href="#contact" className="text-amber-900 hover:text-amber-700 transition-colors">Contact</a>
          </div>
          <button className="bg-amber-900 text-amber-50 px-6 py-2.5 rounded-full hover:bg-amber-800 transition-all hover:shadow-lg">
            Order Online
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-amber-50 to-white"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6">
              <Award className="w-4 h-4 text-amber-700" />
              <span className="text-sm text-amber-900">Award-Winning Coffee Since 2018</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight text-amber-950">
              Craft Coffee,<br />Crafted Moments
            </h1>
            <p className="text-xl md:text-2xl text-amber-800 mb-10 leading-relaxed">
              Experience the perfect blend of artisanal coffee and cozy atmosphere.<br />Every cup tells a story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-amber-900 text-amber-50 px-8 py-4 rounded-full hover:bg-amber-800 transition-all hover:shadow-xl text-lg font-medium">
                View Menu
              </button>
              <button className="bg-white text-amber-900 px-8 py-4 rounded-full hover:shadow-lg transition-all border-2 border-amber-200 text-lg font-medium">
                Find Us
              </button>
            </div>
          </div>

          {/* Hero Image Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="md:translate-y-8">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1573840357491-06851c72e0d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3IlMjBtb2Rlcm58ZW58MXx8fHwxNzc3NzE3MDcwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Coffee shop interior"
                className="rounded-2xl shadow-xl w-full h-80 object-cover"
              />
            </div>
            <div className="md:-translate-y-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1650100458608-824a54559caa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMGVzcHJlc3NvfGVufDF8fHx8MTc3NzczNzkyMnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Coffee beans"
                className="rounded-2xl shadow-xl w-full h-80 object-cover"
              />
            </div>
            <div className="md:translate-y-8">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1668005083745-a5d1518d71ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjb2ZmZWUlMjBiZWFucyUyMGVzcHJlc3NvfGVufDF8fHx8MTc3NzczNzkyMnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Espresso cup"
                className="rounded-2xl shadow-xl w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6 text-amber-950">Our Story</h2>
              <p className="text-lg text-amber-900 mb-6 leading-relaxed">
                Founded in 2018, BrewDesk began with a simple mission: to create a space where quality coffee meets community. We source our beans from sustainable farms around the world, roasted locally to perfection.
              </p>
              <p className="text-lg text-amber-900 mb-8 leading-relaxed">
                Every cup is brewed with precision and passion, served in an atmosphere designed for connection, creativity, and comfort.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Coffee className="w-8 h-8 text-amber-900" />
                  </div>
                  <div className="font-bold text-2xl text-amber-950">100%</div>
                  <div className="text-sm text-amber-800">Arabica Beans</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Leaf className="w-8 h-8 text-amber-900" />
                  </div>
                  <div className="font-bold text-2xl text-amber-950">Organic</div>
                  <div className="text-sm text-amber-800">Sustainable</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-8 h-8 text-amber-900" />
                  </div>
                  <div className="font-bold text-2xl text-amber-950">Local</div>
                  <div className="text-sm text-amber-800">Roasted Daily</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-200 to-orange-200 rounded-3xl blur-2xl opacity-30"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1776483751866-142903e080af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3IlMjBtb2Rlcm58ZW58MXx8fHwxNzc3NzE3MDcwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Coffee shop interior"
                className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 px-6 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-amber-950">Our Menu</h2>
            <p className="text-xl text-amber-800">Handcrafted beverages made with love</p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {menuCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-amber-900 text-amber-50 shadow-lg'
                    : 'bg-white text-amber-900 hover:bg-amber-100 border-2 border-amber-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border border-amber-100 hover:border-amber-300 group"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-amber-950 group-hover:text-amber-900 transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-xl font-bold text-amber-700">{item.price}</span>
                </div>
                <p className="text-amber-800">{item.description}</p>
                <div className="mt-4 pt-4 border-t border-amber-100">
                  <button
                    onClick={() => addToCart(item)}
                    className="text-amber-900 font-medium hover:text-amber-700 transition-colors flex items-center gap-2"
                  >
                    <span>Add to order</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-amber-900 text-amber-50 px-8 py-4 rounded-full hover:bg-amber-800 transition-all hover:shadow-lg text-lg font-medium">
              View Full Menu
            </button>
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section id="visit" className="py-24 px-6 bg-amber-900 text-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-5xl font-bold mb-8">Visit Us</h2>
              <p className="text-xl text-amber-100 mb-12 leading-relaxed">
                Step into our cozy space where the aroma of freshly brewed coffee welcomes you. Perfect for work, meetings, or simply unwinding.
              </p>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-amber-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Location</h3>
                    <p className="text-amber-100">123 Coffee Street, Downtown</p>
                    <p className="text-amber-100">San Francisco, CA 94102</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-amber-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Hours</h3>
                    <p className="text-amber-100">Monday - Friday: 7:00 AM - 8:00 PM</p>
                    <p className="text-amber-100">Saturday - Sunday: 8:00 AM - 9:00 PM</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-amber-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Contact</h3>
                    <p className="text-amber-100">(415) 555-BREW</p>
                    <p className="text-amber-100">hello@brewdesk.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-amber-800 rounded-2xl p-8 h-full flex items-center justify-center">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1516197370049-569c4eaba1d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3IlMjBtb2Rlcm58ZW58MXx8fHwxNzc3NzE3MDcwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Coffee shop atmosphere"
                  className="rounded-xl shadow-2xl w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-amber-100 to-orange-100">
        <div className="max-w-4xl mx-auto text-center">
          <Coffee className="w-16 h-16 text-amber-900 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-amber-950">Stay Caffeinated</h2>
          <p className="text-xl text-amber-800 mb-10">
            Join our coffee community! Get exclusive offers, new menu updates, and brewing tips delivered to your inbox.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={newsletterStatus === 'loading'}
              className="flex-1 px-6 py-4 rounded-full border-2 border-amber-300 focus:border-amber-900 focus:outline-none text-amber-950 placeholder-amber-600 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={newsletterStatus === 'loading'}
              className="bg-amber-900 text-amber-50 px-8 py-4 rounded-full hover:bg-amber-800 transition-all hover:shadow-lg font-medium whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {newsletterStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {newsletterMessage && (
            <p className={`text-sm mt-4 ${newsletterStatus === 'success' ? 'text-green-700' : 'text-red-700'}`}>
              {newsletterMessage}
            </p>
          )}
          {!newsletterMessage && (
            <p className="text-sm text-amber-700 mt-4">We respect your privacy. Unsubscribe anytime.</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-amber-950 text-amber-100 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center">
                  <Coffee className="w-6 h-6 text-amber-50" />
                </div>
                <span className="font-bold text-2xl text-amber-50">BrewDesk</span>
              </div>
              <p className="text-amber-200 mb-6 max-w-md">
                Your neighborhood coffee shop, serving exceptional coffee and creating memorable moments since 2018.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-amber-900 rounded-full flex items-center justify-center hover:bg-amber-800 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-amber-900 rounded-full flex items-center justify-center hover:bg-amber-800 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-amber-900 rounded-full flex items-center justify-center hover:bg-amber-800 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4 text-amber-50">Quick Links</h4>
              <ul className="space-y-3 text-amber-200">
                <li><a href="#about" className="hover:text-amber-50 transition-colors">About Us</a></li>
                <li><a href="#menu" className="hover:text-amber-50 transition-colors">Menu</a></li>
                <li><a href="#visit" className="hover:text-amber-50 transition-colors">Visit Us</a></li>
                <li><a href="#" className="hover:text-amber-50 transition-colors">Catering</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4 text-amber-50">Contact</h4>
              <ul className="space-y-3 text-amber-200">
                <li>123 Coffee Street</li>
                <li>San Francisco, CA 94102</li>
                <li className="pt-2">
                  <a href="tel:4155555273" className="hover:text-amber-50 transition-colors">(415) 555-BREW</a>
                </li>
                <li>
                  <a href="mailto:hello@brewdesk.com" className="hover:text-amber-50 transition-colors">hello@brewdesk.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-amber-900 flex flex-col md:flex-row justify-between items-center gap-4 text-amber-300 text-sm">
            <p>&copy; 2026 BrewDesk Coffee Shop. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-amber-50 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-amber-50 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}