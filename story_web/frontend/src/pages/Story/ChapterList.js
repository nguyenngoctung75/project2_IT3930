
import Pagination from '~/utils/pagination';
import ChapterListItem from './ChapterListItem';

export default function ChapterList({ storyName, chapters, currentPage, totalPages, onPageChange, storyId }) {
  const itemsPerPage = 50;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentChapters = chapters.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className='story-detail__list-chapter'>
      <div className='story-detail__list-chapter--list' style={{ marginBottom: '16px' }}>
        <div className='row'>
          <div className='col c-12 m-6 l-6 story-detail__list-chapter--list__item'>
            <ul>
              {currentChapters.slice(0, Math.ceil(currentChapters.length/2)).map((chap) => (
                <ChapterListItem key={chap.id} chapter={chap} storyId={storyId} storyName={storyName}/>
              ))}
            </ul>
          </div>
          <div className='col c-12 m-6 l-6 story-detail__list-chapter--list__item'>
            <ul>
              {currentChapters.slice(Math.ceil(currentChapters.length/2)).map((chap) => (
                <ChapterListItem key={chap.id} chapter={chap} storyId={storyId} storyName={storyName}/>
              ))}
            </ul>
          </div>
        </div>
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}