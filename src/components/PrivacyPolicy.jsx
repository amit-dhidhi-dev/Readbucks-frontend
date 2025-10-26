import React from 'react'

function PrivacyPolicy() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p>
                Welcome to {import.meta.env.VITE_WEBSITE_NAME} ("we," "our," or "us"). We are committed to protecting your
                privacy and ensuring the security of your personal information. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your information when you use
                our ebook platform, participate in quizzes, and receive prize money.
              </p>
            </section>

            {/* Information Collection */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Name, email address, and contact details</li>
                <li>Date of birth and age verification</li>
                <li>Payment information and transaction history</li>
                <li>Bank account details for prize money distribution</li>
                <li>Quiz participation data and results</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Automatically Collected Information</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Reading progress and time spent on books</li>
                <li>Quiz performance metrics</li>
                <li>Cookies and usage data</li>
              </ul>
            </section>

            {/* How We Use Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain our ebook services</li>
                <li>To process payments and distribute prize money</li>
                <li>To administer quizzes and competitions</li>
                <li>To personalize your reading experience</li>
                <li>To send notifications about new books and quizzes</li>
                <li>To improve our platform and services</li>
                <li>To comply with legal obligations</li>
                <li>To prevent fraud and ensure platform security</li>
              </ul>
            </section>

            {/* Data Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Sharing and Disclosure</h2>
              <p className="mb-3">We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment processors for transaction handling</li>
                <li>Banking partners for prize money distribution</li>
                <li>Legal authorities when required by law</li>
                <li>Service providers who assist in platform operations</li>
                <li>Analytics partners to improve user experience</li>
              </ul>
              <p className="mt-4">
                We do not sell your personal information to third parties for marketing purposes.
              </p>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p>
                We implement industry-standard security measures including encryption, secure
                servers, and regular security audits to protect your personal information and
                financial data.
              </p>
            </section>

            {/* User Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Right to access your personal data</li>
                <li>Right to correct inaccurate data</li>
                <li>Right to delete your account and data</li>
                <li>Right to opt-out of marketing communications</li>
                <li>Right to data portability</li>
                <li>Right to withdraw consent</li>
              </ul>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
              <p>
                We use cookies to enhance your experience, analyze platform usage, and personalize
                content. You can control cookie preferences through your browser settings.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
              <p>
                Our platform is not intended for users under 13 years of age. Users between 13-18
                years require parental consent for prize money transactions and data processing.
              </p>
            </section>

            {/* International Transfers */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
              <p>
                Your data may be transferred to and processed in countries other than your own.
                We ensure appropriate safeguards are in place for international data transfers.
              </p>
            </section>

            {/* Changes to Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically. We will notify you of significant
                changes via email or platform notifications.
              </p>
            </section>

            {/* Contact Information */}
            {/* <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
              <p>
                For privacy-related questions or to exercise your rights, contact us at:
              </p>
              <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                <p><strong>Email:</strong> privacy@readwin.com</p>
                <p><strong>Phone:</strong> +91-{import.meta.env.VITE_PHONE}</p>
                <p><strong>Address:</strong> 123 Knowledge Street, Education City, EC 12345</p>
              </div>
            </section> */}
          </div>
        </div>
      </div>

    </>
  )
}

export default PrivacyPolicy
