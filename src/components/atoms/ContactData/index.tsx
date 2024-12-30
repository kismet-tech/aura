import React from 'react';
import { FaLinkedin, FaInstagram, FaFacebook, FaGlobe, FaWhatsapp } from 'react-icons/fa';

export interface ContactDataSource {
  type: 'LinkedIn' | 'Instagram' | 'Facebook' | 'Web' | 'WhatsApp';
  url: string;
}

export interface ContactDataProps {
  sources: ContactDataSource[];
  className?: string;
  size?: number;
}

const getIcon = (type: ContactDataSource['type'], size: number) => {
  const iconProps = { size, className: 'text-current' };
  switch (type) {
    case 'LinkedIn':
      return <FaLinkedin {...iconProps} />;
    case 'Instagram':
      return <FaInstagram {...iconProps} />;
    case 'Facebook':
      return <FaFacebook {...iconProps} />;
    case 'Web':
      return <FaGlobe {...iconProps} />;
    case 'WhatsApp':
      return <FaWhatsapp {...iconProps} />;
  }
};

export const ContactData: React.FC<ContactDataProps> = ({
  sources,
  className = '',
  size = 16
}) => {
  if (!sources.length) return null;

  return (
    <span className={`inline-flex gap-1 mr-1 ${className}`}>
      {sources.map((source, index) => (
        <a
          key={`${source.type}-${index}`}
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          style={{ width: size, height: size }}
        >
          {getIcon(source.type, size * 0.75)}
        </a>
      ))}
    </span>
  );
}; 