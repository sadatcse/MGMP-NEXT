import Link from "next/link";
import { FaTwitter, FaYoutube, FaFacebook, FaInstagram, FaLinkedin, FaPinterest, FaTiktok } from "react-icons/fa";
import logo from "../assets/gymlogo.jpg";
import logo1 from "../assets/logo.png";
import android from "../assets/img/footer/playstore.png";
import ios from "../assets/img/footer/appsstore.png";
import moment from "moment/moment";

const Footer = () => {
    const currentYear = moment().format('YYYY'); // Using moment.js
    const footerContainerVariant = {
        hidden: {
            opacity: 0,
        },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.6,
                duration: 0.5,
                ease: 'linear',
            },
        },
    };

    const footerItem = {
        hidden: {
            y: 20,
            opacity: 0,
        },
        show: {
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.6, 0.3, 0.8],
            },
        },
    };

    return (
        <div className="poppins">
            <footer className="footer bg-primary-300 text-white p-6 md:p-10">
                <aside>
                    <h6 className="footer-title text-xl font-bold mb-4">CONTACT US</h6>
                    <div>
                        <p className="font-semibold text-xl">MULTI GYM PREMIUM</p>
                        <p>24/1, 24/2 (3rd & 4th floor), Ring Road</p>
                        <p>Shia Masjid Mor, Mohammadpur</p>
                        <p>Dhaka 1207</p>
                        <p><span className="font-bold">Mobile:</span> 01313-197435, 01313-197427</p>
                        <p><span className="font-bold">Email:</span> info@multigympremium.com</p>
                    </div>
                </aside>
                <nav>
                    <h6 className="footer-title text-xl font-bold mb-4">Company</h6>
                    <Link className="link link-hover" href="/aboutus/about">About us</Link>
                    <Link className="link link-hover" href="/contactus">Contact</Link>
                    <Link className="link link-hover" href="/service">Service</Link>
                    <Link className="link link-hover" href="/blog">Blog</Link>
                    <Link className="link link-hover" href="/notice">Notice</Link>
                </nav>
                <nav>
                    <h6 className="footer-title text-xl font-bold mb-4">Legal</h6>
                    <Link className="hover:text-red-600 cursor-pointer" href="/legal/termsofuse">Terms of use</Link>
                    <Link className="hover:text-red-600 cursor-pointer" href="/legal/appprivacypolicy">Privacy policy</Link>
                    <Link className="hover:text-red-600 cursor-pointer" href="/legal/cookiepolicy">Cookie policy</Link>
                    <Link className="hover:text-red-600 cursor-pointer" href="/legal/refundpolicy">Refund policy</Link>
                    <Link className="hover:text-red-600 cursor-pointer" href="/webadmin">Admin Login</Link>
                </nav>
                <nav>
                    <h6 className="footer-title text-xl font-bold mb-4">DOWNLOAD MULTI GYM PREMIUM APP</h6>
                    <div className="flex flex-col gap-4">
                        <a href="https://play.google.com/store/apps/details?id=com.example.android" target="_blank" rel="noopener noreferrer">
                            <img src={android.src} alt="Download on Android" />
                        </a>
                        <a href="https://apps.apple.com/us/app/example-ios-app/id123456789" target="_blank" rel="noopener noreferrer">
                            <img src={ios.src} alt="Download on iOS" />
                        </a>
                    </div>
                </nav>
            </footer>

            <div className="mx-auto">
                <footer className="footer items-center py-7 md:py-4 gap-6 bg-primary-300 border-t text-white flex flex-col-reverse md:flex-row md:justify-between px-5">
                    <div className="flex items-center gap-2">
                        <img src={logo1.src} className="w-10" alt="Logo" />
                        <p>Multi Gym Premium</p>
                    </div>
                    <p className="">Copyright © {currentYear}</p> {/* Dynamic Year */}
                    <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                        <a href="https://www.facebook.com/MultiGymPremium" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <FaFacebook size={24} />
                        </a>
                        <a href="https://www.instagram.com/multigym.premium" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <FaInstagram size={24} />
                        </a>
                        <a href="https://www.linkedin.com/company/multigympremium" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <FaLinkedin size={24} />
                        </a>
                        <a href="https://www.pinterest.com/multigympremium" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                            <FaPinterest size={24} />
                        </a>
                        <a href="https://www.tiktok.com/@multigympremium" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                            <FaTiktok size={24} />
                        </a>
                        <a href="https://www.youtube.com/@MultiGymPremium" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                            <FaYoutube size={24} />
                        </a>
                    </nav>
                </footer>
            </div>
        </div>
    );
};

export default Footer;
