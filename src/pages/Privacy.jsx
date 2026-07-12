import React from 'react'
import PageHeader from '../components/PageHeader.jsx'
import FadeIn from '../components/animations/FadeIn.jsx'

export default function PrivacyPolicy() {
  return (
    <>
      <PageHeader
        tag="Legal"
        title="Privacy Policy"
        sub="How we handle and protect your information."
      />
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-24">
          <FadeIn direction="up">
            <div className="prose prose-lg text-ink/75 max-w-none">
              <p>Last Updated: {new Date().toLocaleDateString()}</p>

              <h2 className="font-serif text-2xl text-ink mt-10 mb-4">1. Introduction</h2>
              <p>
                At Senex Digital, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>

              <h2 className="font-serif text-2xl text-ink mt-10 mb-4">2. Information We Collect</h2>
              <p>
                We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the Website or otherwise when you contact us.
              </p>

              <h2 className="font-serif text-2xl text-ink mt-10 mb-4">3. How We Use Your Information</h2>
              <p>
                We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
              </p>

              <h2 className="font-serif text-2xl text-ink mt-10 mb-4">4. Sharing Your Information</h2>
              <p>
                We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
              </p>

              <h2 className="font-serif text-2xl text-ink mt-10 mb-4">5. Contact Us</h2>
              <p>
                If you have questions or comments about this notice, you may email us at <a href="mailto:senexdigital@gmail.com">senexdigital@gmail.com</a>.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
