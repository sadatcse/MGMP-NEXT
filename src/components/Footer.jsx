import Link from "next/link";
import { FaTwitter, FaYoutube, FaFacebook, FaInstagram, FaLinkedin, FaPinterest, FaTiktok, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import logo1 from "../assets/logo.png";
import android from "../assets/img/footer/playstore.png";
import ios from "../assets/img/footer/appsstore.png";
import moment from "moment/moment";

const Footer = () => {
    const currentYear = moment().format('YYYY');

    return (
        <div className="bg-[#050505] text-white border-t border-white/5">
            <footer className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    
                    {/* Brand Section */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <img src={logo1.src} className="w-12 h-12 object-contain" alt="Logo" />
                            <span className="text-2xl font-black uppercase tracking-tighter">Multigym <span className="text-custom-yellow">Premium</span></span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Elevate your fitness journey with the elite training facilities and expert guidance at Dhaka's premier fitness destination.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { Icon: FaFacebook, href: "https://www.facebook.com/MultiGymPremium/" },
                                { Icon: FaInstagram, href: "https://www.instagram.com/multigym.premium/?hl=en" },
                                { Icon: FaTiktok, href: "https://www.tiktok.com/@multigympremium" },
                                { Icon: FaYoutube, href: "https://www.youtube.com/channel/UCC2cuCIe1HeeYWs5LvOF7jw" }
                            ].map((item, i) => (
                                <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-custom-yellow hover:text-black transition-all duration-300">
                                    <item.Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="space-y-8">
                        <h4 className="text-sm font-black uppercase tracking-[0.3em] text-red-600">Contact Us</h4>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <FaMapMarkerAlt className="text-custom-yellow mt-1" />
                                <p className="text-gray-400 text-sm">
                                    24/1, 24/2 (3rd & 4th floor), Ring Road, Shia Masjid Mor, Mohammadpur, Dhaka 1207
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <FaPhoneAlt className="text-custom-yellow" />
                                <p className="text-gray-400 text-sm font-bold">01313-197435, 01313-197427</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <FaEnvelope className="text-custom-yellow" />
                                <p className="text-gray-400 text-sm">info@multigympremium.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-8">
                        <h4 className="text-sm font-black uppercase tracking-[0.3em] text-red-600">Explore</h4>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { name: 'About Us', path: '/aboutus/about' },
                                { name: 'Services', path: '/service' },
                                { name: 'Our Team', path: '/trainers' },
                                { name: 'Latest News', path: '/blog' },
                                { name: 'Privacy Policy', path: '/legal/appprivacypolicy' },
                            ].map((link) => (
                                <Link key={link.name} href={link.path} className="text-gray-400 text-sm hover:text-custom-yellow hover:translate-x-1 transition-all duration-300 inline-block">
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Apps */}
                    <div className="space-y-8">
                        <h4 className="text-sm font-black uppercase tracking-[0.3em] text-red-600">Mobile App</h4>
                        <p className="text-gray-400 text-sm italic">Download our official mobile app.</p>
                        <div className="flex flex-col gap-4 max-w-[160px]">
                            <a href="https://play.google.com/store/apps/details?id=com.multi_gym&pli=1" target="_blank" rel="noopener noreferrer">
                                <img src={android.src} alt="Play Store" className="hover:opacity-80 transition-opacity cursor-pointer" />
                            </a>
                            <a href="https://apps.apple.com/us/app/multi-gym-premium/id6746246182" target="_blank" rel="noopener noreferrer">
                                <img src={ios.src} alt="App Store" className="hover:opacity-80 transition-opacity cursor-pointer" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Bottom Bar */}
            <div className="border-t border-white/5 py-8">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
                    <p>© {currentYear} Multigym Premium. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="/legal/termsofuse" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="/legal/refundpolicy" className="hover:text-white transition-colors">Refunds</Link>
                        <Link href="/webadmin" className="hover:text-red-600 transition-colors">Admin</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
