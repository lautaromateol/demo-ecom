export default function Newsletter() {
  return (
    <section className="bg-shade">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md sm:text-center">
          <h2 className="text-xl text-main font-medium uppercase tracking-wider mb-4">Sign up for our newsletter</h2>
          <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-secondary">Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to sign up with your email.</p>
          <form action="#">
            <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
              <div className="relative w-full">
                <label htmlFor="email" className="hidden mb-2 text-sm font-medium text-primary">Email address</label>
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                </div>
                <input className="block p-3 pl-10 w-full text-primary bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:outline-none" placeholder="Enter your email" type="email" id="email" required=""/>
              </div>
              <div>
                <button type="submit" className="py-3 px-5 w-full text-center text-white rounded-lg cursor-pointer border border-main bg-main sm:rounded-none sm:rounded-r-lg hover:bg-tint hover:ring-main focus:ring-4 focus:ring-tint focus:outline-none">Subscribe</button>
              </div>
            </div>
            <div className="mx-auto max-w-screen-sm text-sm text-left text-secondary newsletter-form-footer">We care about the protection of your data. <a href="#" className="font-medium text-main hover:underline">Read our Privacy Policy</a>.</div>
          </form>
        </div>
      </div>
    </section>
  )
}