import Image from "next/image";

export default function Testimonials() {
  return (
    <section className="block py-12 md:py-24 px-6 lg:px-0 bg-shade">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="grid grid-cols-1 gap-8 py-8">
          <div>
            <div className="w-12 h-12 mb-2 relative">
              <Image src="/img/customers/ben.jpg" fill className="object-cover rounded-full" alt="Ben" />
            </div>
            <p className="text-secondary leading-relaxed mb-4">"Shopping at Pure Decor was a game-changer for me! Their curated collection of minimalist furniture helped me transform my home into a sanctuary of modern simplicity."</p>
            <p className="text-secondary text-sm">- Ben S.</p>
          </div>
          <div>
            <div className="w-12 h-12 mb-2 relative">
              <Image src="/img/customers/dave.jpg" fill className="object-cover rounded-full" alt="Dave" />
            </div>
            <p className="text-secondary leading-relaxed mb-4">"I've been searching for the perfect minimalist furniture for months until I stumbled upon Pure Decor. Their customer service and products exceeded my expectations. Highly recommend!"</p>
            <p className="text-secondary text-sm">- Dave D.</p>
          </div>
          <div>
            <div className="w-12 h-12 mb-2 relative">
              <Image src="/img/customers/hannah.jpg" fill className="object-cover rounded-full" alt="Hannah" />
            </div>
            <p className="text-secondary leading-relaxed mb-4">"I'm a huge fan of minimalist design, and Pure Decor is my go-to destination for all things sleek and stylish. Everything is of top-notch quality and craftsmanship."</p>
            <p className="text-secondary text-sm">- Hannah M.</p>
          </div>
          <div>
            <div className="w-12 h-12 mb-2 relative">
              <Image src="/img/customers/steve.jpg" fill className="object-cover rounded-full" alt="Steve" />
            </div>
            <p className="text-secondary leading-relaxed mb-4">"I've never been one for clutter, which is why I adore Pure Decor. Every piece I've purchased has elevated my living space to new heights of sophistication."</p>
            <p className="text-secondary text-sm">- Steve R.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="w-full h-full relative">
            <Image className="object-cover" fill src="/img/gallery/gallery-img-1.jpg" alt="Gallery img 1" />
          </div>
          <div className="w-full h-full relative">
            <Image className="object-cover" fill src="/img/gallery/gallery-img-2.jpg" alt="Gallery img 2" />
          </div>
          <div className="w-full h-full relative">
            <Image className="object-cover" fill src="/img/gallery/gallery-img-3.jpg" alt="Gallery img 3" />
          </div>
          <div className="w-full h-full relative">
            <Image className="object-cover" fill src="/img/gallery/gallery-img-4.jpg" alt="Gallery img 4" />
          </div>
        </div>
      </div>
    </section>
  )
}

