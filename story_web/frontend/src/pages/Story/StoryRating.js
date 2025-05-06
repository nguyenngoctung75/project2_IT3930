import starOn from '~/assets/images/star-on.png';
import starOff from '~/assets/images/star-off.png';
import starHalf from '~/assets/images/star-half.png';

export default function StoryRating() {
  return (
    <div className='rate-story'>
      <div className='rate-story__holder' data-score="8.3">
        <img src={starOn} alt="Star" className='star-on'/>
        <img src={starOn} alt="Star" className='star-on'/>
        <img src={starOn} alt="Star" className='star-on'/>
        <img src={starOn} alt="Star" className='star-on'/>
        <img src={starOn} alt="Star" className='star-on'/>
        <img src={starHalf} alt="Star" className='star-half'/>
        <img src={starOff} alt="Star" className='star-off'/>
        <img src={starOff} alt="Star" className='star-off'/>
      </div>
      <div className='rate-story__value' itemProp='aggregateRating'>
        <em>
          Đánh giá:
          <strong><span itemProp="ratingValue"> 8.3</span></strong>/
          <span itemProp="bestRating"> 10 </span>
          từ
          <strong><span itemProp="ratingCount"> 415 </span>lượt</strong>
        </em>
      </div>
    </div>
  );
}