import { Link } from 'react-router-dom';

export default function ChapterListItem({ chapter, storyId, storyName }) {
  return (
    <li>
      <Link to={{
        pathname: `/story/${storyId}/chapter/${chapter.chapternum}`
      }}>
        Chương {chapter.chapternum}: {chapter.chaptername}
      </Link>
    </li>
  );
}