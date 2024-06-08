import Categories from '@/components/homepage/Categories';
import FeaturedProducts from '@/components/homepage/FeaturedProducts';
import Hero from '@/components/homepage/Hero';
import Newsletter from '@/components/homepage/Newsletter';
import Testimonials from '@/components/homepage/Testimonials';

export default function HomePage () {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Testimonials />
      <Categories />
      <Newsletter />
    </main>

  );
};
