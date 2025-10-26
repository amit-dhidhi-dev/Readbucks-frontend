import React from 'react'

function TermsAndConditions() {
  return (
    <>
   
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700">
          {/* Agreement */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing and using  {import.meta.env.VITE_WEBSITE_NAME}  , you agree to be bound by these 
              Terms & Conditions. If you disagree with any part, you may not access our platform.
            </p>
          </section>

          {/* Account Registration */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Account Registration</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be at least 13 years old to create an account</li>
              <li>Users aged 13-18 require parental consent for financial transactions</li>
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for maintaining account security</li>
              <li>One account per individual; multiple accounts are prohibited</li>
            </ul>
          </section>

          {/* Ebook Purchases */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Ebook Purchases & Usage</h2>
            
            <h3 className="text-xl font-semibold mb-3">Purchase Terms</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>All ebook purchases are final and non-transferable</li>
              {/* <li>Refunds are available within 7 days if quiz not attempted</li> */}
              <li>Ebooks are for personal use only; commercial use prohibited</li>
              <li>Downloading or copying content is strictly prohibited</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Membership Benefits</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Paid members get unlimited access to purchased books</li>
              <li>Membership auto-renews unless cancelled before billing cycle</li>
              <li>Free trial users must provide payment method</li>
            </ul>
          </section>

          {/* Quiz Competitions */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Quiz Competitions</h2>
            
            <h3 className="text-xl font-semibold mb-3">Eligibility</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Must have purchased the related ebook</li>
              <li>One entry per book purchase</li>
              <li>Employees and relatives of {import.meta.env.VITE_WEBSITE_NAME} are ineligible</li>
              <li>Participants must comply with all quiz rules</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Prize Money</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Prize amounts vary per quiz and are clearly stated</li>
              <li>Winners selected based on score and time taken</li>
              <li>Prize money transferred within 7 working days</li>
              <li>Taxes on prizes are winner's responsibility</li>
              <li>Fraudulent activity leads to disqualification</li>
            </ul>
          </section>

          {/* Prohibited Conduct */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Prohibited Conduct</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cheating or using unauthorized aids during quizzes</li>
              <li>Creating multiple accounts for unfair advantage</li>
              <li>Sharing quiz questions or answers</li>
              <li>Attempting to hack or disrupt platform operations</li>
              <li>Violating intellectual property rights</li>
              <li>Harassing other users or staff</li>
            </ul>
          </section>

          {/* Payments & Refunds */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Payments & Refunds</h2>
            
            <h3 className="text-xl font-semibold mb-3">Payment Terms</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>All prices in USD unless specified</li>
              <li>Payment processed securely through trusted gateways</li>
              <li>Recurring billing for membership subscriptions</li>
              <li>Failed payments may result in service suspension</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Refund Policy</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>7-day refund for unsatisfactory books (quiz not attempted)</li>
              <li>No refunds after quiz participation</li>
              <li>Membership cancellations effective next billing cycle</li>
              <li>Refunds processed within 14 business days</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
            <p className="mb-3">All content on {import.meta.env.VITE_WEBSITE_NAME} is protected by copyright:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ebooks and quiz content are proprietary</li>
              <li>Users granted limited license for personal use</li>
              <li>Reproduction or distribution strictly prohibited</li>
              <li>Platform design and code are company property</li>
            </ul>
          </section>

          {/* Termination */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Account Termination</h2>
            <p>We may suspend or terminate accounts for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violation of these terms</li>
              <li>Fraudulent activity</li>
              <li>Non-payment of fees</li>
              <li>Illegal or harmful conduct</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p>
              {import.meta.env.VITE_WEBSITE_NAME} is not liable for indirect, incidental, or consequential damages. 
              Our total liability shall not exceed the amount paid by you in the last 6 months.
            </p>
          </section>

          {/* Dispute Resolution */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Dispute Resolution</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Disputes resolved through arbitration</li>
              <li>Arbitration venue: [Raipur, Chhattisgarh]</li>
              <li>Class action lawsuits waived</li>
              <li>Governing law: [Chhattisgarh/India] law</li>
            </ul>
          </section>

          {/* Changes to Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use after 
              changes constitutes acceptance of modified terms.</p>
            </section>

          {/* Contact Information */}
          {/* <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p><strong>Company:</strong> ReadWin Technologies Inc.</p>
              <p><strong>Email:</strong> legal@readwin.com</p>
              <p><strong>Phone:</strong> +1-800-READWIN</p>
              <p><strong>Address:</strong> 123 Knowledge Street, Education City, EC 12345</p>
            </div>
          </section> */}
        </div>
      </div>
    </div>

    </>
  )
}

export default TermsAndConditions
