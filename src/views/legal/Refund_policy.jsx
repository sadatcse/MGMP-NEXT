import React from 'react';
import { FaMoneyBillWave, FaRegClock, FaPhone, FaClipboardCheck, FaMedkit, FaExclamationTriangle, FaSyncAlt } from 'react-icons/fa';

const RefundPolicy = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Refund Policy for Multigym Premium</h1>
        <p className="text-sm text-gray-500 mb-6">Last updated: 25/4/2024</p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaMoneyBillWave className="mr-2" /> Membership Fees</h2>
        <p className="mb-6">
          Membership fees are due at the time of registration and are non-refundable. This includes all types of memberships, including monthly, quarterly, and annual plans.
        </p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaRegClock className="mr-2" /> Special Offers and Promotions</h2>
        <p className="mb-6">
          Fees paid for special offers and promotions are non-refundable. These offers are time-bound and cannot be transferred or refunded.
        </p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaClipboardCheck className="mr-2" /> Personal Training Sessions</h2>
        <p className="mb-6">
          Personal training sessions must be canceled at least 24 hours in advance to be eligible for a rescheduling. Cancellations made less than 24 hours before the scheduled session will result in a forfeiture of the session fee.
        </p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaRegClock className="mr-2" /> Classes and Workshops</h2>
        <p className="mb-6">
          Fees for classes and workshops are non-refundable. If a class or workshop is canceled by Multigym Premium, a full refund will be issued or the option to attend a rescheduled session will be provided.
        </p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaMedkit className="mr-2" /> Exceptional Circumstances</h2>
        <p className="mb-6">
          In exceptional circumstances, such as serious illness or injury, a refund request may be considered. Such requests must be accompanied by appropriate documentation (e.g., a medical certificate) and will be evaluated on a case-by-case basis.
        </p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaExclamationTriangle className="mr-2" /> Termination by Multigym Premium</h2>
        <p className="mb-6">
          If your membership is terminated by Multigym Premium due to a breach of the Terms of Use, no refund will be issued.
        </p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaSyncAlt className="mr-2" /> How to Request a Refund</h2>
        <p className="mb-6">
          To request a refund, please contact our support team at Mobile 01313197435. Provide your name, membership details, and the reason for the refund request. We will review your request and respond within 14 business days.
        </p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaClipboardCheck className="mr-2" /> Processing Refunds</h2>
        <p className="mb-6">
          Approved refunds will be processed within 30 business days. The refund will be issued using the same method of payment that was used for the original transaction.
        </p>

        <h2 className="text-2xl font-semibold mb-2 flex items-center"><FaPhone className="mr-2" /> Contact Us</h2>
        <p className="mb-6">
          If you have any questions or concerns about this Refund Policy, please contact us at <a href="tel:01313197435" className="text-blue-600">Mobile 01313197435</a>.
        </p>

        <p className="text-sm text-gray-500">By purchasing our services, you agree to this Refund Policy.</p>
      </div>
    </div>
  );
};

export default RefundPolicy;
