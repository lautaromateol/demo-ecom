import Collection from '@/components/homepage/Collection';
import FeaturedProducts from '@/components/homepage/FeaturedProducts';
import Hero from '@/components/homepage/Hero';
import Newsletter from '@/components/homepage/Newsletter';
import Testimonials from '@/components/homepage/Testimonials';
import Loading from './loading';

async function getCategories() {
  const response = await fetch(`${process.env.API}/categories`, {
    next: { revalidate: 20 }
  })
  const data = await response.json()
  const promises = data.map(async({ slug }) => {
    const response = await fetch(`${process.env.API}/category/${slug}`)
    const data = await response.json()
    return data
  })
  const categories = await Promise.all(promises)
  return categories
}


async function getFeaturedProducts() {
  const response = await fetch(`${process.env.API}/product/best-rated`)
  const data = await response.json()
  if (response.ok) return data
  else return []
}

const HomePage = async () => {

  const featuredProducts = await getFeaturedProducts()
  const categories = await getCategories()

  if (!categories.length || !featuredProducts.length) return <Loading />

  return (
    <main>
      <Hero />
      <FeaturedProducts bestRated={featuredProducts} />
      <Testimonials />
      {categories.map((category) => {
        return (
          <Collection key={category.category._id} category={category} />
        )
      })}
      <Newsletter />
    </main>

  );
};

export default HomePage;
