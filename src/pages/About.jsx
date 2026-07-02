import React from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Eyebrow from '../components/Eyebrow.jsx'
import StatLedger from '../components/StatLedger.jsx'
import BracketFrame from '../components/BracketFrame.jsx'
import CTABanner from '../components/CTABanner.jsx'
import { stats, valueProps, process, teamImage } from '../data/content.js'
import FadeIn from '../components/animations/FadeIn.jsx'
import StaggerContainer from '../components/animations/StaggerContainer.jsx'

export default function About() {
  return (
    <>
      <PageHeader
        tag="About Senex Digital"
        title="The agency that's been through enough trend cycles to know which ones matter."
        sub="Founded on the belief that judgment, applied consistently, beats hype applied loudly."
      />

      {/* Story */}
      <section className="bg-white">
        <div className="max-w-site mx-auto px-6 lg:px-10 py-24">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <FadeIn direction="right" className="h-[420px] w-full relative">
              <BracketFrame
                src={teamImage}
                alt="Senex Digital team in a planning session"
                className="h-full w-full overflow-hidden"
              />
            </FadeIn>
            <FadeIn direction="left">
              <Eyebrow index="001">Our Story</Eyebrow>
              <h2 className="font-serif text-3xl text-ink leading-tight text-balance">
                We started Senex because most agency advice has a shelf life of one
                platform update.
              </h2>
              <div className="mt-5 space-y-4 text-ink/65 leading-relaxed">
                <p>
                  Senex Digital opened with three people and one rule: every
                  recommendation has to survive being asked &ldquo;why&rdquo; three
                  times in a row. Most marketing tactics don&rsquo;t. The ones that do
                  are usually less exciting than the ones that don&rsquo;t &mdash; and
                  that&rsquo;s exactly why they work.
                </p>
                <p>
                  Five years and 150-plus brands later, that rule hasn&rsquo;t changed.
                  We&rsquo;ve added strategists, creators, and performance marketers,
                  but every account still gets the same scrutiny the first one did.
                </p>
                <p>
                  We named the studio after the Latin word for elder on purpose.
                  Marketing rewards the loudest voice in the room far too often. We&rsquo;d
                  rather be the most experienced one.
                </p>
              </div>
            </FadeIn>
          </div>

          <div className="mt-20">
            <StatLedger stats={stats} />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-paper">
        <div className="max-w-site mx-auto px-6 lg:px-10 py-24">
          <FadeIn direction="up">
            <Eyebrow index="002">How We Think</Eyebrow>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight max-w-2xl text-balance">
              Four working principles that show up in every account, whether you notice
              them or not.
            </h2>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 gap-px bg-line mt-12 border border-line">
            {valueProps.map((v) => (
              <div key={v.title} className="bg-white p-8">
                <h3 className="font-serif text-xl text-ink">{v.title}</h3>
                <p className="mt-3 text-ink/60 leading-relaxed text-[15px]">{v.body}</p>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white">
        <div className="max-w-site mx-auto px-6 lg:px-10 py-24">
          <FadeIn direction="up">
            <Eyebrow index="003">How We Work</Eyebrow>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight max-w-2xl text-balance">
              One process, run the same way for a startup&rsquo;s first campaign or a
              rebrand&rsquo;s hundredth.
            </h2>
          </FadeIn>

          <StaggerContainer className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, i) => (
              <div key={step.id} className="relative pt-6 border-t-2 border-gold">
                <span className="font-mono text-sm text-gold-dim">{step.id}</span>
                <h3 className="font-serif text-xl text-ink mt-2">{step.name}</h3>
                <p className="mt-2.5 text-[14px] text-ink/60 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CTABanner
        heading="Curious whether we're the right fit before you commit to a call?"
        sub="Send us three lines about where growth has stalled. We'll tell you plainly if this is something we can fix."
      />
    </>
  )
}
