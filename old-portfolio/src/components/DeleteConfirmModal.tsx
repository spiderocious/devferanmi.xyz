import React from 'react';
import { X, Trash2, AlertTriangle } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  postTitle: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  postTitle
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-organic-fade-up"
        onClick={onCancel}
      ></div>

      {/* Modal */}
      <div className="relative bg-gray-900 p-8 rounded-lg border border-gray-800 shadow-2xl max-w-md w-full mx-4 animate-organic-fade-up delay-200">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Delete Post</h3>
          <p className="text-gray-400 mb-2">
            Are you sure you want to delete this post?
          </p>
          <p className="text-white font-semibold">"{postTitle}"</p>
          <p className="text-red-400 text-sm mt-4">
            This action cannot be undone.
          </p>
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 border border-gray-600 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 hover:scale-105"
          >
            <Trash2 className="w-5 h-5" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;