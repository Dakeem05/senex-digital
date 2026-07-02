import React from 'react'
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react'
import ContactForm from '../components/ContactForm.jsx'
import { contactInfo } from '../data/content.js'
import FadeIn from '../components/animations/FadeIn.jsx'

const reasons = [
  {
    title: 'Proven Track Record',
    body: '150+ brands grown with an average 3.2x lift in performance metrics.',
  },
  {
    title: 'Strategic Approach',
    body: 'Data-driven strategies combined with creative excellence for maximum impact.',
  },
  {
    title: 'Full-Service Solutions',
    body: 'Everything you need under one roof, from strategy through to execution.',
  },
]

const included = [
  'Brand audit and competitive analysis',
  'Custom growth strategy recommendations',
  'ROI projections and timeline',
]

export default function Contact() {
  return (
    <section className="bg-navy dot-grid">
      <div className="max-w-site mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <FadeIn direction="up" className="text-center mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl text-paper leading-[1.1] text-balance">
            Let&rsquo;s elevate your brand &mdash; book a free consultation.
          </h1>
          <p className="mt-5 text-paper/55 max-w-xl mx-auto text-[16px] leading-relaxed">
            Ready to transform your brand and achieve extraordinary growth? Let&rsquo;s
            discuss how we can help you lead your market.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <FadeIn direction="right">
            <h2 className="font-serif text-2xl text-paper mb-7">Why Choose Senex Digital?</h2>
            <div className="space-y-6">
              {reasons.map((r) => (
                <div key={r.title} className="flex gap-3.5">
                  <CheckCircle size={18} className="text-gold-light shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-paper font-medium">{r.title}</h3>
                    <p className="text-paper/55 text-[14px] leading-relaxed mt-1">{r.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9 bg-navy-light border border-paper/15 p-6">
              <h3 className="font-serif text-lg text-paper mb-3">
                What You&rsquo;ll Get in Your Free Consultation
              </h3>
              <ul className="space-y-2.5">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[14px] text-paper/70">
                    <span className="text-gold-light mt-0.5">&rarr;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-9 grid sm:grid-cols-3 gap-5 pt-7 border-t border-paper/10">
              <div className="flex items-center gap-2.5 text-paper/70 text-[14px]">
                <Mail size={15} className="text-gold-light shrink-0" />
                <span className="break-all">{contactInfo.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-paper/70 text-[14px]">
                <Phone size={15} className="text-gold-light shrink-0" />
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 text-paper/70 text-[14px]">
                <MapPin size={15} className="text-gold-light shrink-0" />
                <span>{contactInfo.location}</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <ContactForm />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
