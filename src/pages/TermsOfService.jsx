import React from 'react'
import PageHeader from '../components/PageHeader.jsx'
import FadeIn from '../components/animations/FadeIn.jsx'

export default function TermsOfService() {
  return (
    <>
      <PageHeader
        tag="Legal"
        title="Terms of Service"
        sub="The rules and guidelines for using our services."
      />
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-24">
          <FadeIn direction="up">
            <div className="prose prose-lg text-ink/75 max-w-none">
              <p>Last Updated: {new Date().toLocaleDateString()}</p>

              <h2 className="font-serif text-2xl text-ink mt-10 mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing our website and using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>

              <h2 className="font-serif text-2xl text-ink mt-10 mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on Senex Digital's website for personal, non-commercial transitory viewing only.
              </p>

              <h2 className="font-serif text-2xl text-ink mt-10 mb-4">3. Disclaimer</h2>
              <p>
                The materials on Senex Digital's website are provided on an 'as is' basis. Senex Digital makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>

              <h2 className="font-serif text-2xl text-ink mt-10 mb-4">4. Limitations</h2>
              <p>
                In no event shall Senex Digital or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Senex Digital's website.
              </p>

              <h2 className="font-serif text-2xl text-ink mt-10 mb-4">5. Revisions and Errata</h2>
              <p>
                The materials appearing on Senex Digital's website could include technical, typographical, or photographic errors. Senex Digital does not warrant that any of the materials on its website are accurate, complete, or current.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
