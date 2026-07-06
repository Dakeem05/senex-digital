import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import Logo from './Logo.jsx'
import { services, contactInfo } from '../data/content.js'

const social = [
  { icon: Facebook, label: 'Facebook', link: "https://www.facebook.com/share/1Bk9JPibkp/?mibextid=wwXIfr" },
  { icon: Twitter, label: 'X', link: "https://x.com/senexdigital_?s=21" },
  { icon: Linkedin, label: 'LinkedIn', link: "https://www.linkedin.com/company/senexdigital/" },
  { icon: Instagram, label: 'Instagram', link: "https://www.instagram.com/senexcreatives?igsh=NGY0a2dzdGc1NzJj" },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-paper">
      <div className="max-w-site mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-12">
          <div>
            <Logo dark />
            <p className="mt-5 text-paper/60 text-[15px] leading-relaxed max-w-sm">
              We don&rsquo;t chase trend cycles. Strategic creativity and measurable
              performance, built for brands that want to lead their industry for longer
              than a quarter.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {social.map(({ icon: Icon, label, link }) => (
                <a
                  key={label}
                  href={link}
                  target="_blank"
                  aria-label={label}
                  className="h-9 w-9 flex items-center justify-center border border-paper/20 text-paper/70 hover:border-gold hover:text-gold transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-widest2 text-gold-light mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    to="/services"
                    className="text-paper/65 text-[14px] hover:text-paper transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-widest2 text-gold-light mb-5">
              Contact
            </h3>
            <ul className="space-y-3.5 text-[14px] text-paper/65">
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-gold-light shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-paper">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-gold-light shrink-0" />
                <span>{contactInfo.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={14} className="text-gold-light shrink-0" />
                <span>{contactInfo.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-paper/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-paper/45">
          <p>&copy; {new Date().getFullYear()} Senex Digital. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-paper/70">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-paper/70">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
