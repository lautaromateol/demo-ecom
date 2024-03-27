export default function Hero() {
  return (
    <section className="mx-auto min-h-screen py-18 px-6 md:px-0">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="self-center">
          <h1 className='text-5xl md:text-6xl text-primary leading-tight font-medium mb-6'>Give your home a feeling of unique exclusivity</h1>
          <p className='text-xl leading-normal text-secondary mb-8'>Discover our wide variety of furniture that we have to fill your home with luxury.</p>
          <div className="flex gap-2">
            <button className='px-4 py-2 bg-main text-white rounded-full transition-all hover:bg-tint'>
              Buy Now
            </button>
            <button className="px-4 py-2 transition-all border-main hover:border-b hover:text-main">
              See more &darr;
            </button>
          </div>
        </div>
        <img
          src='./img/hero.jpg'
          className="rounded-lg"
        />
      </div>
    </section>
  )
}