import React, { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Eyebrow from '../components/Eyebrow.jsx'
import CaseStudyCard from '../components/CaseStudyCard.jsx'
import CTABanner from '../components/CTABanner.jsx'
import { caseStudies } from '../data/content.js'
import FadeIn from '../components/animations/FadeIn.jsx'
import StaggerContainer from '../components/animations/StaggerContainer.jsx'

export default function Portfolio() {
  const categories = useMemo(
    () => ['All', ...new Set(caseStudies.map((c) => c.category))],
    []
  )
  const [active, setActive] = useState('All')

  const filtered =
    active === 'All' ? caseStudies : caseStudies.filter((c) => c.category === active)

  return (
    <>
      <PageHeader
        tag="Selected Work"
        title="Case files from brands we've helped lead their category."
        sub="A sample of engagements across industries. Every number below is from a client-approved case study, not a projection."
      />

      <section className="bg-white">
        <div className="max-w-site mx-auto px-6 lg:px-10 py-24">
          <FadeIn direction="up">
            <Eyebrow index="000">Filter by Category</Eyebrow>

            <div className="flex flex-wrap gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`font-mono text-[11px] uppercase tracking-wide px-4 py-2 border transition-colors ${
                    active === cat
                      ? 'bg-ink text-paper border-ink'
                      : 'border-line text-ink/60 hover:border-ink hover:text-ink'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" key={active}>
            {filtered.map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </StaggerContainer>

          {filtered.length === 0 && (
            <p className="text-ink/50 text-center py-16">
              No case files in this category yet &mdash; check back soon.
            </p>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  )
}
