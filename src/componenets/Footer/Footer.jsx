import { FaFacebook, FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";
import { GiCampCookingPot } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className="bg-[#D6EAF8] text-[#2C3E50]  py-6 w-full text-cente">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
           <GiCampCookingPot size={40} />
            <span className="text-lg font-semibold">YourBite</span>
          </div>

          {/* Links Section */}
          <div className="flex flex-wrap justify-center md:justify-between w-full md:w-auto mt-4 md:mt-0">
            <div className="px-4">
              <h3 className="text-sm font-semibold uppercase">Resources</h3>
              <ul className="mt-2 space-y-1">
                <li>
                  <a href="#" className="hover:underline">
                    Tailwind CSS
                  </a>
                </li>
              </ul>
            </div>
            <div className="px-4">
              <h3 className="text-sm font-semibold uppercase">Follow Us</h3>
              <ul className="mt-2 space-y-1">
                <li>
                  <a href="#" className="hover:underline">
                    Github
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div className="px-4">
              <h3 className="text-sm font-semibold uppercase">Legal</h3>
              <ul className="mt-2 space-y-1">
                <li>
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2012 mPratap13™. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-gray-400">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaDiscord />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
