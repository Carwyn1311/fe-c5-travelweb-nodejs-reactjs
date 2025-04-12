// DoctoHTML.tsx
import React, { useState, useEffect } from 'react';
import mammoth from 'mammoth';
import { CircularProgress, Typography } from '@mui/material';

const BASE_URL = process.env.REACT_APP_BASE_URL;

interface DoctoHTMLProps {
  url?: string;  // Make url optional
  filePath?: string;  // Make filePath optional
}

const DoctoHTML: React.FC<DoctoHTMLProps> = ({ url, filePath }) => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const convertDocxToHtml = async (buffer: ArrayBuffer) => {
    try {
      const result = await mammoth.convertToHtml({ arrayBuffer: buffer });
      
      // Optional: Clean up the HTML if needed
      const cleanedHtml = result.value
        .replace(/<p>\s*<\/p>/g, '') // Remove empty paragraphs
        .replace(/<strong><\/strong>/g, ''); // Remove empty strong tags

      setHtmlContent(cleanedHtml);
    } catch (err) {
      console.error('Conversion error:', err);
      throw new Error('Failed to convert document: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const fetchAndConvertFile = async () => {
    setLoading(true);
    setError(null);

    try {
      // Determine the full URL based on url or filePath
      const fullUrl = url 
        ? url.startsWith('http') 
          ? url 
          : `${BASE_URL}${url}`
        : filePath 
          ? `${BASE_URL}${filePath}`
          : null;

      if (!fullUrl) {
        throw new Error('No URL or file path provided');
      }

      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const buffer = await response.arrayBuffer();
      
      if (buffer.byteLength === 0) {
        throw new Error('Empty file buffer');
      }

      await convertDocxToHtml(buffer);
    } catch (err) {
      console.error('File fetch/convert error:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (url || filePath) {
      fetchAndConvertFile();
    }
  }, [url, filePath]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div 
      dangerouslySetInnerHTML={{ __html: htmlContent }} 
      className="docx-content"
      style={{ 
        maxWidth: '100%', 
        overflowWrap: 'break-word',
        padding: '16px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px'
      }}
    />
  );
};

export default DoctoHTML;