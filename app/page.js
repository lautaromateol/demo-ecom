import Collection from '@/components/homepage/Collection';
import FeaturedProducts from '@/components/homepage/FeaturedProducts';
import Hero from '@/components/homepage/Hero';
import Newsletter from '@/components/homepage/Newsletter';
import Testimonials from '@/components/homepage/Testimonials';

async function getCategories(){
  const response = await fetch(`${process.env.API}/categories`)
  const data = await response.json()
  if(response.ok) return data
  else return []
}

const HomePage = async() => {

  const categories = await getCategories()

  return (
    <main>
     <Hero/>
     <FeaturedProducts/>
     <Testimonials/>
     {categories.map(({slug}) => {
      return (
        <Collection slug={slug}/>
      )
     })}
     <Newsletter/>
    </main>

  );
};

export default HomePage;
