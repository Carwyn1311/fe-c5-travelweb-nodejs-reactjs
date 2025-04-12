import React from 'react';

interface TextProps {
  content: string
}

const Text: React.FC<TextProps> = ({ content }) => {
  return (
    <div className="text-container">
      {content}
    </div>
  );
};

export default Text;
