export default function Testimonials() {
  return (
    <section className="py-12 md:py-24 px-6 md:px-0 bg-shade">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="grid grid-cols-1 gap-8 py-8">
          <div>
            <img src="./img/customers/ben.jpg" className="w-12 h-12 rounded-full mb-2" alt="Ben" />
            <p className="text-secondary leading-relaxed mb-4">"Shopping at NAME was a game-changer for me! Their curated collection of minimalist furniture helped me transform my home into a sanctuary of modern simplicity."</p>
            <p className="text-secondary text-sm">- Ben S.</p>
          </div>
          <div>
            <img src="./img/customers/dave.jpg" className="w-12 h-12 rounded-full mb-2" alt="Michael" />
            <p className="text-secondary leading-relaxed mb-4">"I've been searching for the perfect minimalist furniture for months until I stumbled upon NAME. Their customer service and products exceeded my expectations. Highly recommend!"</p>
            <p className="text-secondary text-sm">- Michael D.</p>
          </div>
          <div>
            <img src="./img/customers/hannah.jpg" className="w-12 h-12 rounded-full mb-2" alt="Lauren" />
            <p className="text-secondary leading-relaxed mb-4">"I'm a huge fan of minimalist design, and NAME is my go-to destination for all things sleek and stylish. Everything is of top-notch quality and craftsmanship."</p>
            <p className="text-secondary text-sm">- Lauren M.</p>
          </div>
          <div>
            <img src="./img/customers/steve.jpg" className="w-12 h-12 rounded-full mb-2" alt="David" />
            <p className="text-secondary leading-relaxed mb-4">"I've never been one for clutter, which is why I adore NAME. Every piece I've purchased has elevated my living space to new heights of sophistication."</p>
            <p className="text-secondary text-sm">- David R.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <img class="w-full h-full" src="./img/gallery/gallery-img-1.jpg" alt="Gallery img 1" />
          <img class="w-full h-full" src="./img/gallery/gallery-img-2.jpg" alt="Gallery img 2" />
          <img class="w-full h-full" src="./img/gallery/gallery-img-3.jpg" alt="Gallery img 3" />
          <img class="w-full h-full" src="./img/gallery/gallery-img-4.jpg" alt="Gallery img 4" />
        </div>
      </div>
    </section>
  )
}

