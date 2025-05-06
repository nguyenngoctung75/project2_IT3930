import { useRef, useEffect, useState } from 'react';
import sanitizeStoryContent from '~/utils/sanitizeStoryContent';

export default function StoryContent({ content, isExpanded, setIsExpanded }) {
  const contentRef = useRef(null);
  const [needsToggle, setNeedsToggle] = useState(false);

  useEffect(() => {
    if (contentRef.current && content) {
      const originalLineClamp = contentRef.current.style.WebkitLineClamp;
      contentRef.current.style.WebkitLineClamp = '6';
      const isOverflowing = contentRef.current.scrollHeight > contentRef.current.clientHeight;
      setNeedsToggle(isOverflowing);
      contentRef.current.style.WebkitLineClamp = originalLineClamp;
    }
  }, [content, isExpanded]);

  return (
    <div className='story-detail__top--desc'>
      <div
        ref={contentRef}
        style={{
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: isExpanded ? 'unset' : 6,
          WebkitBoxOrient: 'vertical',
          textOverflow: 'ellipsis'
        }}
        dangerouslySetInnerHTML={{ __html: sanitizeStoryContent(content) }}
      />
      {needsToggle && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="toggle-btn"
        >
          {isExpanded ? 'Thu gọn' : 'Xem thêm'}
        </button>
      )}
    </div>
  );
}