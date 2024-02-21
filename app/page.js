import Image from 'next/image';
import Link from "next/link";
import CategoriesCarrousel from '@/components/homepage/CategoriesCarrousel';
import BestRated from "@/components/homepage/BestRated";
import MostSold from '@/components/homepage/MostSold';
import Guarantees from '@/components/homepage/Guarantees';
// import Newsletter from '@/components/homepage/Newsletter';
import BrandsCarrousel from '@/components/homepage/BrandsCarrousel';

const HomePage = () => {
  return (
    <main>
      <div className='min-h-screen'>
        <Image
          src="https://res.cloudinary.com/dubuaqpfm/image/upload/v1708357031/pexels-victor-freitas-841130_kzpbgj.jpg"
          alt="Descripción de la imagen"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-3">
          <h1 className="text-4xl text-center font-extrabold">Boost your workouts with our premium supplements.</h1>
          <Link className='px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md' href='/shop'>
            Our Products
          </Link>
        </div>
      </div>
      <Guarantees />
      <CategoriesCarrousel />
      <BrandsCarrousel/>
      <BestRated />
      <MostSold />
      {/* <Newsletter/> */}
    </main>

  );
};

export default HomePage;
