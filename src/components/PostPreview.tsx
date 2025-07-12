import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { BlogPost } from '../types';

interface PostPreviewProps {
  post: BlogPost;
}

const PostPreview: React.FC<PostPreviewProps> = ({ post }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden max-h-[80vh] overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="mb-4">
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
            {post.category}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-4">{post.title}</h1>
        <p className="text-gray-400 mb-4">{post.excerpt}</p>
        
        {/* Meta */}
        <div className="flex items-center space-x-4 text-gray-400 text-sm">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.date)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Image */}
      {post.image && (
        <div className="px-6 py-4">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-48 object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <div 
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
          style={{
            '--tw-prose-body': '#d1d5db',
            '--tw-prose-headings': '#ffffff',
            '--tw-prose-links': '#3b82f6',
            '--tw-prose-bold': '#ffffff',
            '--tw-prose-quotes': '#9ca3af',
            '--tw-prose-quote-borders': '#374151',
            '--tw-prose-code': '#e5e7eb',
            '--tw-prose-pre-code': '#e5e7eb',
            '--tw-prose-pre-bg': '#1f2937',
          } as React.CSSProperties}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-800">
            <h4 className="text-white font-semibold mb-3">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author */}
        {post.author && (
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex items-center space-x-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-white font-semibold">{post.author.name}</h4>
                <p className="text-gray-400 text-sm">{post.author.bio}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPreview;