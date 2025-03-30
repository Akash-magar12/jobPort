import logo from "../assets/logo/logodark.png";

const Footer = () => {
  return (
    <footer className="bg-white  px-4 md:px-10  text-gray-600 py-8">
      <div className="container mx-auto px-4">
        {/* Footer Links */}
        <div className="grid grid-col-1 sm:grid-cols-3 md:grid-cols-5 gap-6">
          <div>
            <img className="w-28" src={logo} alt="" />
          </div>

          <div>
            <h2 className="font-semibold text-lg text-gray-800">Jobs</h2>

            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="hover:text-gray-900">
                  Job Referrals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Help
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-gray-800">Careers</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="hover:text-gray-900">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Help and Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Affiliate
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-gray-800">Terms</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="hover:text-gray-900">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-lg text-gray-800">About</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="hover:text-gray-900">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Partners Relations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-200 pt-4 text-center text-sm">
          <p className="text-gray-500">
            &copy; Hirrd 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
