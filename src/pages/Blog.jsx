import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Hash } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Eyebrow from '../components/Eyebrow.jsx'
import BracketFrame from '../components/BracketFrame.jsx'
import { FullPageSpinner } from '../components/ui/Spinner.jsx'
import { ErrorState, EmptyState } from '../components/ui/States.jsx'
import { usePublicBlogPosts, usePublicBlogCategories } from '../hooks/usePublicBlog.js'
import { formatDate } from '../utils/date.js'

function readTimeFor(content) {
  const words = (content || '').trim().split(/\s+/).length
  return `${Math.max(1, Math.round(words / 200))} min read`
}

function PostRow({ post }) {
  return (
    <Link to={`/blog/${post.id}`} className="group flex gap-5 sm:gap-6 py-6 border-b border-line">
      <BracketFrame
        src={post.featured_image}
        alt={post.title}
        className="w-28 sm:w-40 h-24 sm:h-28 shrink-0 overflow-hidden"
      />
      <div className="flex-1 min-w-0">
        <span className="font-mono text-[10px] uppercase tracking-wide text-teal border border-teal/30 px-2 py-0.5">
          {post.category?.name}
        </span>
        <h3 className="font-serif text-lg sm:text-xl text-ink mt-2 leading-snug group-hover:text-gold-dim transition-colors">
          {post.title}
        </h3>
        <div className="flex items-center gap-3 mt-2 text-[12px] text-ink/45">
          <span>{post.author?.name}</span>
          <span>&middot;</span>
          <span className="flex items-center gap-1">
            <Clock size={11} /> {readTimeFor(post.content)}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function Blog() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const posts = usePublicBlogPosts()
  const categories = usePublicBlogCategories()

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

  if (posts.isLoading) return <FullPageSpinner label="Loading articles" />
  if (posts.isError) {
    return (
      <div className="max-w-site mx-auto px-6 py-24">
        <ErrorState message={posts.error.message} onRetry={posts.refetch} />
      </div>
    )
  }

  const allPosts = posts.data?.data || []

  if (allPosts.length === 0) {
    return (
      <>
        <PageHeader
          tag="Insights & Expertise"
          title="Field notes on what's actually working, written by the people doing the work."
          sub="No listicles of fifteen trends. We publish when we have something specific to say."
        />
        <div className="max-w-site mx-auto px-6 py-24">
          <EmptyState title="No articles published yet" description="Check back soon." />
        </div>
      </>
    )
  }

  const featured = allPosts[0]
  const rest = allPosts.slice(1)
  const blogTags = (categories.data || []).map((c) => c.name)

  return (
    <>
      <PageHeader
        tag="Insights & Expertise"
        title="Field notes on what's actually working, written by the people doing the work."
        sub="No listicles of fifteen trends. We publish when we have something specific to say."
      />

      <section className="bg-white">
        <div className="max-w-site mx-auto px-6 lg:px-10 py-20">
          <div className="grid lg:grid-cols-[1fr_340px] gap-16">
            <div>
              {/* Featured post */}
              <Eyebrow index="000">Featured</Eyebrow>
              <Link to={`/blog/${featured.id}`} className="group block mb-16">
                <BracketFrame
                  src={featured.featured_image}
                  alt={featured.title}
                  className="h-64 sm:h-80 w-full overflow-hidden"
                />
                <div className="flex items-center gap-2 mt-6">
                  <span className="font-mono text-[10px] uppercase tracking-wide text-teal border border-teal/30 px-2 py-0.5">
                    {featured.category?.name}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wide text-gold-dim border border-gold/40 px-2 py-0.5">
                    Featured
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-ink mt-4 leading-tight group-hover:text-gold-dim transition-colors text-balance">
                  {featured.title}
                </h2>
                <p className="mt-3 text-ink/60 leading-relaxed max-w-xl">{featured.description}</p>
                <div className="flex items-center gap-3 mt-4 text-[13px] text-ink/45">
                  <span>{featured.author?.name}</span>
                  <span>&middot;</span>
                  <span>{formatDate(featured.published_at)}</span>
                  <span>&middot;</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {readTimeFor(featured.content)}
                  </span>
                </div>
              </Link>

              {rest.length > 0 && (
                <>
                  <Eyebrow index="001">More Field Notes</Eyebrow>
                  <div>
                    {rest.map((post) => (
                      <PostRow key={post.id} post={post} />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-10">
              <div className="bg-ink dot-grid p-7">
                <h3 className="font-serif text-xl text-paper">Stay Updated</h3>
                <p className="text-paper/55 text-[14px] mt-2 leading-relaxed">
                  One email when we publish something worth your time. Nothing else.
                </p>
                {subscribed ? (
                  <p className="mt-5 font-mono text-[12px] uppercase tracking-wide text-gold-light">
                    You&rsquo;re on the list.
                  </p>
                ) : (
                  <form onSubmit={handleSubscribe} className="mt-5 space-y-3">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-navy-light border border-paper/20 px-4 py-3 text-[14px] text-paper placeholder:text-paper/35 focus-visible:outline-gold"
                    />
                    <button
                      type="submit"
                      className="w-full bg-gold text-paper font-mono text-[11px] uppercase tracking-widest2 px-4 py-3 hover:bg-gold-light transition-colors"
                    >
                      Subscribe Now
                    </button>
                  </form>
                )}
              </div>

              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-widest2 text-gold-dim mb-4 flex items-center gap-2">
                  <Clock size={13} /> Recent Posts
                </h3>
                <div className="space-y-4">
                  {allPosts.slice(0, 4).map((post) => (
                    <Link key={post.id} to={`/blog/${post.id}`} className="flex gap-3 group items-center">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-14 h-14 object-cover shrink-0 border border-line"
                      />
                      <div className="min-w-0">
                        <p className="text-[13px] text-ink leading-snug group-hover:text-gold-dim transition-colors line-clamp-2">
                          {post.title}
                        </p>
                        <p className="text-[11px] text-ink/40 mt-1">
                          {formatDate(post.published_at)} &middot; {readTimeFor(post.content)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {blogTags.length > 0 && (
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-widest2 text-gold-dim mb-4 flex items-center gap-2">
                    <Hash size={13} /> Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {blogTags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] text-ink/60 border border-line px-2.5 py-1 hover:border-gold hover:text-ink transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
