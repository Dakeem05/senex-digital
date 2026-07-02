import React from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Eyebrow from '../components/Eyebrow.jsx'
import ServiceRow from '../components/ServiceRow.jsx'
import CTABanner from '../components/CTABanner.jsx'
import { services } from '../data/content.js'
import FadeIn from '../components/animations/FadeIn.jsx'
import StaggerContainer from '../components/animations/StaggerContainer.jsx'

export default function Services() {
  return (
    <>
      <PageHeader
        tag="Capabilities"
        title="Full-service, without the bloat."
        sub="Four disciplines, run by people who specialize in them, coordinated by one strategist who owns the outcome."
      />

      <section className="bg-white">
        <div className="max-w-site mx-auto px-6 lg:px-10 py-24">
          <FadeIn direction="up">
            <Eyebrow index="000">The Roster</Eyebrow>
            <p className="text-ink/60 max-w-xl mb-10 leading-relaxed">
              Every engagement starts with a diagnosis of what your brand actually needs,
              not a default bundle. Most clients use two or three of these in
              combination &mdash; the detail below is what each one includes on its own.
            </p>
          </FadeIn>

          <StaggerContainer>
            {services.map((s) => (
              <ServiceRow key={s.id} service={s} expanded />
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CTABanner
        heading="Not sure which combination is right for where you are?"
        sub="That's a strategy question, not a sales question. Walk us through your situation and we'll tell you what we'd actually recommend."
      />
    </>
  )
}
