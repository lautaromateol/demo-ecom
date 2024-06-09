import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto min-h-screen py-18 px-6 lg:px-0">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="self-center">
          <h1 className='text-5xl lg:text-6xl text-primary leading-tight font-medium mb-6'>Give your home a feeling of unique exclusivity</h1>
          <p className='text-xl leading-normal text-secondary mb-8'>Discover our wide variety of furniture that we have to fill your home with luxury.</p>
          <div className="flex gap-2">
            <Link href="/shop" className='px-4 py-2 bg-main text-white rounded-full transition-all hover:bg-tint'>
              Buy Now
            </Link>
          </div>
        </div>
        <div className="w-full aspect-square relative">
          <Image
            fill
            src='/img/hero.jpg'
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  )
}