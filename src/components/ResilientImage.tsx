import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  imgClassName = 'object-center',
  fallbackTitle,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-200/80 text-zinc-500 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <ImageOff className="w-6 h-6 mb-2 text-zinc-400" strokeWidth={1.5} />
        <span className="text-xs font-medium text-zinc-600 max-w-[22ch] text-balance">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-zinc-100 ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover ${imgClassName} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
