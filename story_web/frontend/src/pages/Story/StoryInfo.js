export default function StoryInfo({ story }) {
    return (
      <div className='story-detail__bottom--info col c-12 m-12 l-3'>
        <p style={{marginBottom: '4px'}}>
          <strong>Tác giả: </strong>
          {story.author || 'Chưa có thông tin'}
        </p>
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap'}}>
          <strong style={{marginRight: '4px'}}>Thể loại:</strong>
          {story.types && story.types.length > 0 ? (
            story.types.map((type, index) => (
              <span key={index}>
                {type.story_type}
                {index < story.types.length - 1 && ','}
                &nbsp;
              </span>
            ))
          ) : (
            <span>Chưa có thông tin</span>
          )}
        </div>
      </div>
    );
}