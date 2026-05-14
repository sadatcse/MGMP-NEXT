import React from 'react';
import { FaLock, FaUserSecret, FaInfoCircle, FaChild, FaSyncAlt, FaPhone } from 'react-icons/fa';

const PrivacyPolicyfb = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Privacy Policy for Multigym Premium Facebook Ads</h1>
        <p className="mb-6">
          At Multigym Premium, we are committed to protecting your privacy. This Privacy Policy outlines the types of personal information we collect through our Facebook ads and how we use and protect that information.
        </p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaInfoCircle className="mr-2" /> Information We Collect</h2>
        <ul className="list-disc list-inside mb-6">
          <li>When you interact with our Facebook ads, we may collect personal information such as your name and phone number.</li>
          <li>We may also collect information about your interactions with our ads, such as clicks and conversions.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaUserSecret className="mr-2" /> How We Use Your Information</h2>
        <ul className="list-disc list-inside mb-6">
          <li>We use the personal information collected to contact you regarding our special offers and provide information about our services.</li>
          <li>Your information may also be used for marketing purposes, including targeted advertising on Facebook.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaLock className="mr-2" /> Sharing Your Information</h2>
        <ul className="list-disc list-inside mb-6">
          <li>We do not sell or rent your personal information to third parties.</li>
          <li>Your information may be shared with service providers who assist us in running our Facebook ads and managing our marketing campaigns.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaLock className="mr-2" /> Data Security</h2>
        <p className="mb-6">
          We take reasonable measures to protect the personal information we collect. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee the absolute security of your information.
        </p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaSyncAlt className="mr-2" /> Your Choices</h2>
        <ul className="list-disc list-inside mb-6">
          <li>You have the right to opt-out of receiving marketing communications from us at any time.</li>
          <li>You can also update or delete your personal information by contacting us directly.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaChild className="mr-2" /> Children's Privacy</h2>
        <p className="mb-6">
          Our services are not directed to individuals under the age of 18, and we do not knowingly collect personal information from children.
        </p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaSyncAlt className="mr-2" /> Changes to this Privacy Policy</h2>
        <p className="mb-6">
          We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the revised date will be indicated at the top.
        </p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaPhone className="mr-2" /> Contact Us</h2>
        <p className="mb-6">
          If you have any questions or concerns about this Privacy Policy or our practices, please contact us at <a href="tel:01313197435" className="text-blue-600">Mobile 01313197435</a>.
        </p>

        <p className="text-sm text-gray-500">By interacting with our Facebook ads, you consent to the collection and use of your personal information as described in this Privacy Policy.</p>
        <p className="text-sm text-gray-500">*Last updated: 25/4/2024</p>
      </div>
    </div>
  );
};

export default PrivacyPolicyfb;
