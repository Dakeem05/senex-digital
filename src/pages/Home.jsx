import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Button from '../components/Button.jsx'
import Eyebrow from '../components/Eyebrow.jsx'

import BracketFrame from '../components/BracketFrame.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import CaseStudyCard from '../components/CaseStudyCard.jsx'
import TestimonialQuote from '../components/TestimonialQuote.jsx'
import CTABanner from '../components/CTABanner.jsx'
import {
  stats,
  services,
  caseStudies,
  testimonials,
  officeImage,
} from '../data/content.js'

import FadeIn from '../components/animations/FadeIn.jsx'
import StaggerContainer from '../components/animations/StaggerContainer.jsx'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy min-h-screen flex flex-col justify-center pt-24 pb-12">
        <div className="absolute inset-0">
          <img
            src={officeImage}
            alt="Senex Digital strategy session"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/70 to-navy" />
        </div>

        <FadeIn direction="up" delay={0.2} className="max-w-site mx-auto px-6 lg:px-10 relative z-10 w-full flex flex-col items-center text-center mt-12">
          <h1 className="font-sans text-[2.8rem] sm:text-6xl md:text-7xl leading-[1.1] text-white font-bold tracking-tight text-balance max-w-5xl mx-auto">
            We Grow Brands That <br className="hidden sm:block" />
            <span className="text-gold">People Remember</span>
          </h1>
          <p className="mt-6 text-paper/80 text-[17px] sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Strategic creativity meets measurable results. We transform brands through content marketing, social media growth, and performance advertising.
          </p>
          <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
            <Button to="/contact" variant="primary" className="!px-7 !py-3.5 !text-white !bg-gold !border-gold hover:!bg-gold-light hover:!border-gold-light">
              Let's Build Your Brand
            </Button>
            <Button to="/portfolio" variant="outline-light" className="!px-7 !py-3.5" icon={false}>
              View Our Work
            </Button>
          </div>
          
          <div className="mt-24 w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <FadeIn key={stat.label} delay={0.4 + i * 0.1} direction="up" className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</div>
                  <div className="text-[13px] text-paper/60 mt-2">{stat.label}</div>
                </FadeIn>
              ))}
            </div>
          </div>
          
          <FadeIn delay={1} direction="none" className="mt-16 text-white/50">
            <div className="w-6 h-9 border-2 border-white/30 rounded-full flex justify-center p-1 mx-auto">
              <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce" />
            </div>
          </FadeIn>
        </FadeIn>
      </section>

      {/* About preview */}
      <section className="bg-white">
        <div className="max-w-site mx-auto px-6 lg:px-10 py-24">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <FadeIn direction="right" className="order-2 lg:order-1 relative">
              <BracketFrame
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop"
                alt="Senex Digital team reviewing strategy"
                className="h-[380px] w-full overflow-hidden"
              />
            </FadeIn>

            <FadeIn direction="left" className="order-1 lg:order-2">
              <Eyebrow index="002">Why Senex</Eyebrow>
              <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight text-balance">
                We Don't Just Manage Brands — We Shape Them
              </h2>
              <p className="mt-5 text-ink/65 leading-relaxed">
                Founded on the belief that every brand has the potential to lead its industry, Senex Digital combines strategic thinking with creative execution to deliver transformational results.
              </p>
              <p className="mt-4 text-ink/65 leading-relaxed">
                Our team of strategists, creators, and performance marketers work together to build brands that don't just compete — they dominate. We measure success not just in metrics, but in the lasting impact we create for our clients.
              </p>
              <p className="mt-4 text-ink/65 leading-relaxed">
                From startups finding their voice to established companies reinventing themselves, we've helped over 150 brands achieve remarkable growth through data-driven creativity and strategic innovation.
              </p>

              <StaggerContainer className="grid grid-cols-3 gap-4 mt-9">
                {['Creative Strategy', 'Data-Driven', 'Results-Focused'].map((t) => (
                  <div key={t} className="border-t-2 border-gold pt-3">
                    <span className="text-[13px] font-medium text-ink/80 leading-snug">{t}</span>
                  </div>
                ))}
              </StaggerContainer>

              <Link
                to="/about"
                className="mt-9 inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-widest2 text-ink hover:text-gold transition-colors"
              >
                More About Us <ArrowRight size={14} />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-paper">
        <div className="max-w-site mx-auto px-6 lg:px-10 py-24">
          <FadeIn direction="up" className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-4">
            <div className="max-w-xl">
              <Eyebrow index="003">What We Do</Eyebrow>
              <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight text-balance">
                Everything a brand needs to lead its category &mdash; minus the parts
                that don&rsquo;t move the needle.
              </h2>
            </div>
            <Button to="/services" variant="ghost" className="px-0">
              View All Services
            </Button>
          </FadeIn>

          <StaggerContainer className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Case studies preview */}
      <section className="bg-white">
        <div className="max-w-site mx-auto px-6 lg:px-10 py-24">
          <FadeIn direction="up" className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <Eyebrow index="004">Proof, Not Promises</Eyebrow>
              <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight text-balance">
                Results that held up after the campaign ended.
              </h2>
            </div>
            <Button to="/portfolio" variant="ghost" className="px-0">
              View Full Portfolio
            </Button>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.slice(0, 3).map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-navy dot-grid">
        <div className="max-w-site mx-auto px-6 lg:px-10 py-24">
          <TestimonialQuote testimonials={testimonials} />
        </div>
      </section>

      <CTABanner />
    </>
  )
}
