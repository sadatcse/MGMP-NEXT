import React from 'react';
import { FaCookieBite, FaExclamationCircle, FaCog, FaShieldAlt, FaSyncAlt, FaPhone } from 'react-icons/fa';

const CookiePolicy = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Cookie Policy for Multigym Premium</h1>
        <p className="text-sm text-gray-500 mb-6">Last updated: 25/4/2024</p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaCookieBite className="mr-2" /> What are Cookies?</h2>
        <p className="mb-6">
          Cookies are small text files placed on your device when you visit a website. They are used to store information that improves your browsing experience.
        </p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaCog className="mr-2" /> Types of Cookies We Use</h2>
        <ul className="list-disc list-inside mb-6">
          <li><strong>Essential Cookies:</strong> Necessary for core website functionality such as security and accessibility.</li>
          <li><strong>Analytics Cookies:</strong> Collect information about how visitors use our site to improve our services.</li>
          <li><strong>Marketing Cookies:</strong> Track visitors across websites to display relevant ads.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaShieldAlt className="mr-2" /> Your Choices Regarding Cookies</h2>
        <p className="mb-6">
          You can control and manage cookies in your browser settings. Most browsers allow you to refuse cookies or to alert you when cookies are being sent. Please note that disabling cookies may impact the functionality of our website.
        </p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaExclamationCircle className="mr-2" /> Third-Party Cookies</h2>
        <p className="mb-6">
          We may use third-party services that place cookies on our website, such as social media plugins and advertising partners. These cookies are subject to the respective privacy policies of these third parties.
        </p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaSyncAlt className="mr-2" /> Updates to this Cookie Policy</h2>
        <p className="mb-6">
          We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any updates will be posted on this page with the revised date.
        </p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaPhone className="mr-2" /> Contact Us</h2>
        <p className="mb-6">
          If you have any questions or concerns about this Cookie Policy or our use of cookies, please contact us at <a href="tel:01313197435" className="text-blue-600">Mobile 01313197435</a>.
        </p>

        <p className="text-sm text-gray-500">By using our website, you consent to the use of cookies as described in this Cookie Policy.</p>
      </div>
    </div>
  );
};

export default CookiePolicy;
