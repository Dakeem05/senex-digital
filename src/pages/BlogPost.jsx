import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Clock, ArrowLeft } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import BracketFrame from '../components/BracketFrame.jsx'
import CTABanner from '../components/CTABanner.jsx'
import { FullPageSpinner } from '../components/ui/Spinner.jsx'
import { ErrorState } from '../components/ui/States.jsx'
import { usePublicBlogPost } from '../hooks/usePublicBlog.js'
import { formatDate } from '../utils/date.js'

function readTimeFor(content) {
  const words = (content || '').trim().split(/\s+/).length
  return `${Math.max(1, Math.round(words / 200))} min read`
}

export default function BlogPost() {
  const { id } = useParams()
  const { data: post, isLoading, isError, error, refetch } = usePublicBlogPost(id)

  if (isLoading) return <FullPageSpinner label="Loading article" />

  if (isError || !post) {
    return (
      <div className="max-w-site mx-auto px-6 py-24">
        <ErrorState message={error?.message || 'Article not found.'} onRetry={isError ? refetch : undefined} />
        <div className="text-center mt-6">
          <Link to="/blog" className="font-mono text-[12px] uppercase tracking-widest2 text-gold-dim hover:underline">
            Back to Field Notes
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <section className="bg-navy dot-grid border-b border-paper/10">
        <div className="max-w-site mx-auto px-6 lg:px-10 pt-16 pb-14">
          <div className="mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest2 text-gold-light hover:text-gold transition-colors"
            >
              <ArrowLeft size={13} /> Back to Field Notes
            </Link>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wide text-gold-light border border-gold-light/40 px-2 py-0.5">
            {post.category?.name}
          </span>
          <h1 className="font-serif text-3xl sm:text-[2.6rem] text-paper mt-5 leading-[1.1] max-w-3xl text-balance">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 mt-6 text-[13px] text-paper/50">
            <span>{post.author?.name}</span>
            <span>&middot;</span>
            <span>{formatDate(post.published_at)}</span>
            <span>&middot;</span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> {readTimeFor(post.content)}
            </span>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-site mx-auto px-6 lg:px-10 py-16">
          {post.featured_image && (
            <BracketFrame
              src={post.featured_image}
              alt={post.title}
              className="h-64 sm:h-96 w-full overflow-hidden mb-12"
            />
          )}
          <div className="max-w-2xl mx-auto prose-blog">
            <ReactMarkdown
              components={{
                p: ({ node, ...props }) => <p className="text-ink/75 leading-relaxed text-[17px] mb-6" {...props} />,
                h2: ({ node, ...props }) => <h2 className="font-serif text-2xl text-ink mt-10 mb-4" {...props} />,
                h3: ({ node, ...props }) => <h3 className="font-serif text-xl text-ink mt-8 mb-3" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc pl-5 text-ink/75 mb-6 space-y-1.5" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal pl-5 text-ink/75 mb-6 space-y-1.5" {...props} />,
                a: ({ node, ...props }) => <a className="text-gold-dim hover:underline" {...props} />,
                strong: ({ node, ...props }) => <strong className="text-ink font-semibold" {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-2 border-gold pl-4 italic text-ink/60 my-6" {...props} />
                ),
              }}
            >
              {post.content || ''}
            </ReactMarkdown>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Want this kind of thinking applied to your brand specifically?"
        sub="We'll start with a free consultation, not a pitch deck."
      />
    </>
  )
}
