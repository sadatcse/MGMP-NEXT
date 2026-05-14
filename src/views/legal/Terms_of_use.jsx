import React from 'react';
import { FaGavel, FaUserShield, FaRegHandshake, FaRegMoneyBillAlt, FaExclamationTriangle, FaBan, FaBalanceScale, FaSyncAlt, FaPhone, FaVideo, FaDumbbell } from 'react-icons/fa';

const TermsOfUse = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Terms of Use for Multigym Premium</h1>
        <p className="text-sm text-gray-500 mb-6">Last updated: 25/4/2024</p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaGavel className="mr-2" /> Acceptance of Terms</h2>
        <p className="mb-6">
          By using our services, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree, please do not use our services.
        </p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaUserShield className="mr-2" /> Use of Services</h2>
        <ul className="list-disc list-inside mb-6">
          <li>You must be at least 18 years old to use our services.</li>
          <li>You agree to use our services only for lawful purposes and in accordance with these Terms of Use.</li>
          <li>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your account.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaRegHandshake className="mr-2" /> Intellectual Property</h2>
        <p className="mb-6">
          All content provided on our website and through our services, including text, graphics, logos, and images, is the property of Multigym Premium and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works of our content without our express written permission.
        </p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaRegMoneyBillAlt className="mr-2" /> Membership and Payments</h2>
        <ul className="list-disc list-inside mb-6">
          <li>Membership fees are due at the time of registration and are non-refundable.</li>
          <li>We reserve the right to change our membership fees at any time with prior notice to our members.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaExclamationTriangle className="mr-2" /> Limitation of Liability</h2>
        <p className="mb-6">
          Multigym Premium is not liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our services. Our liability to you for any damages arising from or related to these terms shall not exceed the total amount paid by you to Multigym Premium in the past six months.
        </p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaBan className="mr-2" /> Termination</h2>
        <p className="mb-6">
          We reserve the right to terminate or suspend your membership and access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms of Use or is harmful to other users of our services or to Multigym Premium.
        </p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaVideo className="mr-2" /> CCTV Surveillance</h2>
        <p className="mb-6">
          We use CCTV cameras for 24-hour surveillance within our premises. If requested by the Bangladesh government for any purpose, we will provide the footage. The CCTV footage is also used for gym purposes. In case of any injury or death within the gym premises, Multigym Premium is not responsible.
        </p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaDumbbell className="mr-2" /> Use of Equipment</h2>
        <p className="mb-6">
          When using weights (in kilograms or pounds), you must ask a trainer for guidance. If you do not seek assistance, you take full responsibility for any injuries or damages that may occur.
        </p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaBalanceScale className="mr-2" /> Governing Law</h2>
        <p className="mb-6">
          These Terms of Use are governed by and construed in accordance with the laws of Bangladesh, without regard to its conflict of law principles.
        </p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaSyncAlt className="mr-2" /> Changes to Terms of Use</h2>
        <p className="mb-6">
          We may update these Terms of Use from time to time. Any changes will be posted on this page, and the revised date will be indicated at the top.
        </p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaPhone className="mr-2" /> Contact Us</h2>
        <p className="mb-6">
          If you have any questions or concerns about these Terms of Use, please contact us at <a href="tel:01313197435" className="text-blue-600">Mobile 01313197435</a>.
        </p>

        <p className="text-sm text-gray-500">By using our services, you consent to these Terms of Use.</p>
      </div>
    </div>
  );
};

export default TermsOfUse;
