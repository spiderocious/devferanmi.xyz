import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`${sizeClasses[size]} border-2 border-blue-500 border-t-transparent rounded-full animate-spin ${className}`}></div>
  );
};

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isLoading, 
  children, 
  message = 'Loading...' 
}) => {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 shadow-2xl">
            <div className="flex items-center space-x-3">
              <LoadingSpinner size="md" />
              <span className="text-white font-medium">{message}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const BlogCardSkeleton: React.FC = () => (
  <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 animate-pulse">
    <div className="h-48 bg-gray-800"></div>
    <div className="p-6">
      <div className="flex items-center space-x-4 mb-3">
        <div className="h-4 bg-gray-800 rounded w-20"></div>
        <div className="h-4 bg-gray-800 rounded w-16"></div>
      </div>
      <div className="h-6 bg-gray-800 rounded w-3/4 mb-3"></div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-800 rounded"></div>
        <div className="h-4 bg-gray-800 rounded w-4/5"></div>
      </div>
      <div className="flex space-x-2">
        <div className="h-6 bg-gray-800 rounded w-16"></div>
        <div className="h-6 bg-gray-800 rounded w-20"></div>
      </div>
    </div>
  </div>
);

export const BlogListSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array.from({ length: count }, (_, index) => (
      <BlogCardSkeleton key={index} />
    ))}
  </div>
);

export const BlogDetailSkeleton: React.FC = () => (
  <div className="animate-pulse">
    {/* Hero Section */}
    <section className="pt-20 pb-16 bg-gradient-to-br from-gray-900 to-black">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="h-8 bg-gray-800 rounded w-24 mx-auto mb-6"></div>
          <div className="h-16 bg-gray-800 rounded w-4/5 mx-auto mb-6"></div>
          <div className="h-6 bg-gray-800 rounded w-3/5 mx-auto mb-8"></div>
          <div className="flex justify-center space-x-6 mb-8">
            <div className="h-4 bg-gray-800 rounded w-20"></div>
            <div className="h-4 bg-gray-800 rounded w-16"></div>
            <div className="h-4 bg-gray-800 rounded w-18"></div>
          </div>
        </div>
      </div>
    </section>

    {/* Image */}
    <section className="py-8 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="w-full h-64 md:h-96 bg-gray-800 rounded-lg"></div>
        </div>
      </div>
    </section>

    {/* Content */}
    <section className="py-16 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3 space-y-4">
            {Array.from({ length: 8 }, (_, index) => (
              <div key={index} className={`h-4 bg-gray-800 rounded ${index % 3 === 0 ? 'w-full' : index % 3 === 1 ? 'w-4/5' : 'w-3/4'}`}></div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-gray-900 p-6 rounded-lg space-y-4">
              <div className="h-6 bg-gray-800 rounded w-3/4"></div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-800 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-20"></div>
                  <div className="h-3 bg-gray-800 rounded w-16"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export const AdminTableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden animate-pulse">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-800 border-b border-gray-700">
          <tr>
            {Array.from({ length: 5 }, (_, index) => (
              <th key={index} className="py-4 px-6">
                <div className="h-4 bg-gray-700 rounded w-full"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-800">
              <td className="py-4 px-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-800 rounded-lg"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-800 rounded w-32"></div>
                    <div className="h-3 bg-gray-800 rounded w-48"></div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="h-6 bg-gray-800 rounded w-20"></div>
              </td>
              <td className="py-4 px-6">
                <div className="space-y-1">
                  <div className="h-4 bg-gray-800 rounded w-24"></div>
                  <div className="h-3 bg-gray-800 rounded w-16"></div>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="h-6 bg-gray-800 rounded w-20"></div>
              </td>
              <td className="py-4 px-6">
                <div className="flex space-x-2 justify-end">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg"></div>
                  <div className="w-8 h-8 bg-gray-800 rounded-lg"></div>
                  <div className="w-8 h-8 bg-gray-800 rounded-lg"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
