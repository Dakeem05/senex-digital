// Centralized copy + data for Senex Digital.
// Keeping it here means design components stay dumb/reusable
// and all the "voice" of the brand lives in one auditable place.

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Buy services', to: '/discover' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export const stats = [
  { value: '150+', label: 'Brands guided through a growth phase' },
  { value: '3.2x', label: 'Average paid-channel ROAS lift' },
  { value: '5M+', label: 'Audience built and engaged from scratch' },
  { value: '98%', label: 'Client retention past year one' },
]

export const services = [
    {
    id: '01',
    slug: 'social-media-growth',
    name: 'Social media Growth',
    short: 'Organic Growth on all social media platforms',
    description: "People tends to trust brands with high number of followers, engagement more and it will increase your sales and brand value",
    deliverables: [
      'Content Strategy & Creation',
      'Social Media Management',
      'Paid Ads & Performance Marketing',
      'Brand Positioning & Identity',
      'Web Development',
      'Social Media Growth',
    ],
    tags: ['Linkendin', 'Instagram', 'TikTok', 'Youtube', "Facebook"],
  },
  {
    id: '02',
    slug: 'content-strategy',
    name: 'Content Strategy & Creation',
    short: 'Compelling content that resonates with your audience and drives meaningful engagement across all platforms.',
    description:
      "Stop guessing what content your audience wants. We start with data — analyzing what your audience actually searches for, shares, and engages with — then build an editorial system that delivers results long after we're gone.",
    deliverables: [
      'Audience & competitor content audits',
      'Editorial calendars built for cadence, not vanity',
      'Long-form, video, and on-site copywriting',
      'SEO optimization baked in, not bolted on',
    ],
    tags: ['Content Planning', 'Copywriting', 'Visual Content', 'SEO Optimization'],
  },
  {
    id: '03',
    slug: 'social-media-management',
    name: 'Social Media Management',
    short: 'Strategic social media growth through authentic engagement, community building, and viral content creation.',
    description:
      "Social media should be a growth engine, not a time sink. We combine data-driven strategy, creative storytelling, and community-first engagement to build your brand's presence and drive measurable results across every platform.",
    deliverables: [
      'Channel strategy & content calendars',
      'Community management & response SLAs',
      'Influencer & creator partnerships',
      'Monthly reporting against growth targets',
    ],
    tags: ['Community Management', 'Content Scheduling', 'Influencer Partnerships', 'Analytics & Reporting'],
  },
  {
    id: '04',
    slug: 'paid-performance-marketing',
    name: 'Paid Ads & Performance Marketing',
    short: 'High-converting ad campaigns that maximize ROI through precise targeting and continuous optimization.',
    description:
      "Stop wasting money on ads that don't convert. We design and manage high-performance ad campaigns across Google, Meta, LinkedIn, and other platforms — optimizing every dollar for maximum ROI. Every campaign is built with a clear hypothesis, continuous A/B testing, and ongoing optimization to ensure your budget works harder and smarter.",
    deliverables: [
      'Google, Meta & LinkedIn campaign management',
      'Landing page & funnel optimization',
      'Conversion tracking & attribution setup',
      'Weekly budget reallocation based on data',
    ],
    tags: ['Google Ads', 'Facebook & Instagram Ads', 'LinkedIn Advertising', 'Conversion Tracking'],
  },
  {
    id: '05',
    slug: 'brand-positioning-identity',
    name: 'Brand Positioning & Identity',
    short: 'Distinctive brand identities that differentiate you in the market and create lasting emotional connections.',
    description:
      "Your brand is your most valuable asset — it's what makes you memorable, trustworthy, and magnetic. We help you build a brand that stands out in crowded markets, connects deeply with your audience, and drives long-term growth.",
    deliverables: [
      'Positioning & messaging frameworks',
      'Visual identity & brand guidelines',
      'Market & competitive positioning maps',
      'Brand voice documentation',
    ],
    tags: ['Brand Strategy', 'Visual Identity', 'Brand Guidelines', 'Market Positioning'],
  },
  {
    id: '06',
    slug: 'web-development',
    name: 'Web Development',
    short: 'High-performance websites that convert visitors into customers.',
    description:
      "Your website is your hardest-working salesperson. We build fast, secure, and conversion-optimized websites that work 24/7 to grow your business. From simple landing pages to complex e-commerce platforms, we deliver exceptional user experiences that drive real results.",
    deliverables: [
      'Custom website design & development',
      'E-commerce platform development',
      'Website speed & performance optimization',
      'SEO optimized structure',
    ],
    tags: ['Web Design', 'Web Development', 'E-commerce Development', 'Website Optimization'],
  },

]

export const caseStudies = [
  {
    id: 'techflow-solutions',
    name: 'TechFlow Solutions',
    category: 'B2B SaaS',
    summary: 'Full brand transformation and demand-gen strategy for a Series B SaaS company stuck below category awareness.',
    stats: [
      { value: '400%', label: 'pipeline growth' },
      { value: '2.5K', label: 'qualified leads' },
      { value: '$1.2M', label: 'revenue influenced' },
    ],
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'ecoliving-brand',
    name: 'EcoLiving Brand',
    category: 'Sustainable Products',
    summary: 'Social-first content strategy and community build for a direct-to-consumer lifestyle brand entering a crowded category.',
    stats: [
      { value: '350%', label: 'audience growth' },
      { value: '125K', label: 'followers' },
      { value: '8.5%', label: 'engagement rate' },
    ],
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'fitcore-fitness',
    name: 'FitCore Fitness',
    category: 'Health & Wellness',
    summary: 'Performance marketing overhaul that fixed a leaky membership funnel for a regional gym chain expanding nationally.',
    stats: [
      { value: '275%', label: 'membership growth' },
      { value: '15K', label: 'active members' },
      { value: '92%', label: 'annual retention' },
    ],
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'luxe-fashion-house',
    name: 'Luxe Fashion House',
    category: 'Fashion & Retail',
    summary: 'Brand repositioning and influencer strategy for a premium fashion retailer competing against fast-fashion pricing pressure.',
    stats: [
      { value: '500%', label: 'organic growth' },
      { value: '$3.8M', label: 'sales influenced' },
      { value: '2.1M', label: 'campaign reach' },
    ],
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
  },
]

export const testimonials = [
  {
    quote:
      "Senex didn't just run our campaigns — they rebuilt how we think about growth. Membership sign-ups jumped 275% and retention followed. Their read on the data is the best we've worked with.",
    name: 'Emily Thompson',
    role: 'Marketing Director, FitCore Fitness',
  },
  {
    quote:
      "We'd burned through two agencies before Senex. The difference is they say no to tactics that won't compound, even when we ask for them. Slower at first, much faster by month six.",
    name: 'David Kim',
    role: 'Founder, TechFlow Solutions',
  },
  {
    quote:
      "They treat our brand voice like it's load-bearing, because it is. Every piece of content sounds like us, scaled past what our internal team could produce alone.",
    name: 'Maria Alvarez',
    role: 'Head of Growth, EcoLiving Brand',
  },
]

export const valueProps = [
  {
    title: 'Judgment over hype',
    body: "We've tracked enough campaigns long enough to know which tactics compound and which ones spike and vanish. We'll tell you when a trend isn't worth chasing.",
  },
  {
    title: 'Data with context',
    body: "A dashboard full of green arrows means nothing if it isn't tied to revenue. We report on the three numbers that matter and ignore the forty that don't.",
  },
  {
    title: 'Craft over templates',
    body: 'Every deliverable is built for your specific market position, not pulled from a swipe file. If it could run on a competitor\u2019s account too, we scrap it.',
  },
  {
    title: 'Built to compound',
    body: 'Brand equity and SEO and community trust take longer to build and longer to lose. We optimize for the twelve-month number, not the thirty-day one.',
  },
]

export const process = [
  {
    id: '01',
    name: 'Diagnose',
    body: 'We audit what you have — content, channels, funnel, positioning — and tell you plainly what is and isn\u2019t working before we propose anything new.',
  },
  {
    id: '02',
    name: 'Plan',
    body: 'A written strategy with specific channels, budgets, timelines, and the metric each one is accountable to. No 60-slide decks nobody rereads.',
  },
  {
    id: '03',
    name: 'Build',
    body: 'Strategists, creators, and performance marketers execute in parallel. You get one point of contact and weekly visibility into what shipped.',
  },
  {
    id: '04',
    name: 'Compound',
    body: 'We review what worked against what we predicted, cut what didn\u2019t, and reinvest in what did. The system gets sharper every quarter, not just busier.',
  },
]

export const blogPosts = [
  {
    slug: 'future-of-brand-storytelling-2024',
    title: 'The Future of Brand Storytelling in 2024',
    category: 'Brand Strategy',
    featured: true,
    excerpt:
      'Authentic storytelling is reshaping how brands build connections — and the ones still broadcasting instead of conversing are losing ground fast.',
    body: `Most brand storytelling advice from the last decade assumed an audience that would sit still and listen. That audience is gone. What's left is a much harder room: people who skip, mute, and scroll past anything that smells like a pitch.

The brands gaining ground right now aren't telling better stories — they're telling fewer, truer ones, and letting their audience do the broadcasting for them. That means less polish and more proof: real customers, real timelines, real numbers, shown rather than claimed.

Three shifts we're seeing work in practice: founders and operators on camera instead of stock-photo "lifestyle" imagery, long-form explainer content that respects the audience's intelligence, and a willingness to show the unglamorous middle of the process, not just the launch and the result.

None of this is about chasing a format. It's about respecting that trust is earned in public, slowly, and lost in a single bad post. Plan your content calendar around that fact and the tactics mostly take care of themselves.`,
    author: 'Sarah Chen',
    date: 'Jan 15, 2024',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop',
  },
  {
    slug: 'mastering-social-roi',
    title: 'Mastering Social Media ROI: A Data-Driven Approach',
    category: 'Social Media',
    featured: false,
    excerpt:
      'Most social reporting tracks vanity metrics that have no connection to revenue. Here\u2019s the smaller dashboard that actually predicts growth.',
    body: `If your monthly social report is mostly follower counts and likes, you're measuring activity, not outcome. Neither metric has a reliable link to revenue on its own.

The dashboard we build for clients tracks four numbers instead: cost per engaged follower, content-to-site click rate, assisted conversions from social touchpoints, and audience growth rate among people who match your actual customer profile — not just anyone who double-taps.

Getting those numbers usually requires proper UTM discipline and a CRM that can credit social touches in a multi-touch journey, which is the unglamorous infrastructure work most teams skip. Do it once and every report after becomes ten times more useful.`,
    author: 'Marcus Rodriguez',
    date: 'Jan 10, 2024',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    slug: 'content-marketing-trends',
    title: 'Content Marketing Trends That Will Dominate This Year',
    category: 'Content Marketing',
    featured: false,
    excerpt:
      'Forget the listicle of fifteen trends. Three structural shifts are worth your team\u2019s time this year — the rest is noise.',
    body: `Trend round-ups tend to bury the few things that matter under a pile of tactics that won't survive the next platform algorithm change. Three shifts are structural enough to actually plan around this year.

First, search behavior is fragmenting across AI answer engines, which rewards content that directly answers a specific question over content optimized purely for keyword density. Second, short-form video has matured past novelty — the brands winning now treat it as a top-of-funnel discovery channel, not a replacement for deeper content. Third, owned audiences — email lists, communities, SMS — are becoming the hedge against rising paid acquisition costs and platform dependency.

None of these require new tools so much as a willingness to invest in formats that compound: an answer-first content library, a short-form content engine with a real production process, and a first-party audience you actually own.`,
    author: 'Lisa Zhang',
    date: 'Jan 8, 2024',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1200&auto=format&fit=crop',
  },
  {
    slug: 'brand-authority-thought-leadership',
    title: 'Building Brand Authority Through Thought Leadership',
    category: 'Brand Strategy',
    featured: false,
    excerpt:
      'Thought leadership has a credibility problem. Here\u2019s how to build authority that survives scrutiny instead of just sounding confident.',
    body: `"Thought leadership" has become shorthand for confident-sounding LinkedIn posts with no evidence behind them, which means the bar to stand out is lower than most teams think — and higher than most teams deliver.

Real authority gets built on specificity: naming the exact mechanism behind a result, publishing the data that could be wrong, and being willing to disagree publicly with consensus in your category. Vague optimism is forgettable. A precise, falsifiable claim is what gets screenshotted and shared.

The operational unlock is usually access — getting your most knowledgeable people, who are often not your CEO, comfortable publishing in their own voice on a predictable cadence. Ghostwriting can bridge the gap, but the insight still has to come from someone who actually does the work.`,
    author: 'David Kim',
    date: 'Jan 5, 2024',
    readTime: '15 min read',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1200&auto=format&fit=crop',
  },
  {
    slug: 'ai-personalization-digital-marketing',
    title: 'AI-Powered Personalization in Digital Marketing',
    category: 'Technology',
    featured: false,
    excerpt:
      'AI personalization is revolutionizing how brands connect with customers — but only when it\u2019s grounded in real segmentation, not gimmicks.',
    body: `AI personalization tools promise one-to-one marketing at scale, and most implementations deliver one-to-segment marketing with a chatbot bolted on. The gap between the promise and the delivery is almost always a data problem, not a model problem.

Personalization that actually moves revenue starts with clean first-party data and segments built around behavior, not demographics. From there, AI is genuinely useful for dynamic content variants, send-time optimization, and surfacing the next-best-action for a given customer — work that's tedious at scale for a human team and well suited to a model.

The failure mode to watch for is using AI to generate more content faster without a strategy underneath it. Personalization at volume, pointed in the wrong direction, just means your mistakes also happen at volume.`,
    author: 'Alex Thompson',
    date: 'Jan 3, 2024',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop',
  },
]

export const blogTags = ['Branding', 'Social Media', 'Strategy', 'Paid Media', 'SEO', 'Technology', 'Case Studies']

export const officeImage =
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1400&auto=format&fit=crop'

export const teamImage =
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1400&auto=format&fit=crop'

export const contactInfo = {
  email: 'senexdigital@gmail.com',
  phone: '+2348062874006',
  location: 'Nigeria',
}
