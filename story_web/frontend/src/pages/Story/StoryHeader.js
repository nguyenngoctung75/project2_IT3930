import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

export default function StoryHeader() {
  return (
    <div className='row head-title-global' style={{marginBottom: '12px'}}>
      <div className='head-title-global__left col c-6 m-4 l-4'>
        <span className='head-title-global__content'>Thông tin truyện</span>
        <FontAwesomeIcon icon={faBookOpen}/>
      </div>
    </div>
  );
}