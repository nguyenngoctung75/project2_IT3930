import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
import logo from '~/assets/images/footer.png';
function Footer() {
  const tags = [
    { name: "Đánh nhau", path: "/danh-nhau" },
    { name: "Truyện xuyên không", path: "/xuyen-khong" },
    { name: "Truyện Teen Hay", path: "/teen" },
    { name: "Truyện Tiên Hiệp Hay", path: "/tien-hiep" },
    { name: "Đánh nhau", path: "/danh-nhau" },
    { name: "Truyện xuyên không", path: "/xuyen-khong" },
    { name: "Truyện Teen Hay", path: "/teen" },
    { name: "Truyện Tiên Hiệp Hay", path: "/tien-hiep" }
  ];

  return (
    <footer id="footer" className="footer">
      <div className="grid wide">
        <div className="row">
          <div className="footer__info col c-12 m-5">
            <strong>Say Truyen </strong> 
            <Link to="/" title="Đọc truyện online" className="footer__link">
                - Đọc truyện online một cách nhanh nhất. Hỗ trợ mọi thiết bị như di động và máy tính bảng.
            </Link>
          </div>
          
          <div className='col c-12 m-7'>
            <ul className="footer__tags">
                {tags.map((tag, index) => (
                <li key={index} className="footer__tag-item">
                    <span className="footer__tag-badge">
                    <Link to={tag.path} className="footer__tag-link" title={tag.name}>
                        {tag.name}
                    </Link>
                    </span>
                </li>
                ))}
            </ul>
          </div>

          <div className="footer__license col c-12">
            <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
              <img 
                alt="Creative Commons License" 
                className="footer__license-img"
                src={logo}
              />
            </a>
            <br />
            <p className="footer__license-text">
              Website hoạt động dưới Giấy phép truy cập mở 
              &nbsp;
              <a 
                rel="license"
                className="footer__license-link"
                href="http://creativecommons.org/licenses/by/4.0/"
              >
                Creative Commons Attribution 4.0 International License
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;