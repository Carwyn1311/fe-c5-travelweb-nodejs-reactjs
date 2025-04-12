import React from 'react';
import '../.css/Avatar.css';

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  onClick?: () => void;  // Add onClick as an optional prop
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size, onClick }) => {
  return (
    <div className="avatar" style={{ width: size, height: size }} onClick={onClick}>  {/* Add onClick to the div */}
      <img src={src} alt={alt} className="avatar-img" />
    </div>
  );
};

export default Avatar;
