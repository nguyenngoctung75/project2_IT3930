import convertToSlug  from '~/utils/convertToSlug';
import { Link } from 'react-router-dom';

function ListCateGory() {
    const listCategoryItems = [
        { id: 1, name: 'Ngôn Tình' },
        { id: 2, name: 'Trọng Sinh' },
        { id: 3, name: 'Cổ Đại' },
        { id: 4, name: 'Tiên Hiệp' },
        { id: 5, name: 'Huyền Huyễn' },
        { id: 6, name: 'Khác' },
        { id: 7, name: 'Ngược' },
        { id: 8, name: 'Dị Giới' },
        { id: 9, name: 'Xuyên Không' },
        { id: 10, name: 'Sủng' },
        { id: 11, name: 'Cung Đấu' },
        { id: 12, name: 'Gia Đấu' },
        { id: 13, name: 'Điền Văn' },
        { id: 14, name: 'Đô Thị' },
        { id: 15, name: 'Truyện Teen' },
        { id: 16, name: 'Xuyên Nhanh' },
        { id: 17, name: 'Hài Hước' },
        { id: 18, name: 'Mạt Thế' },
        { id: 19, name: 'Đông Phương' },
        { id: 20, name: 'Đam Mỹ' },
        { id: 21, name: 'Trinh Thám' },
        { id: 22, name: 'Kiếm Hiệp' },
        { id: 23, name: 'Quan Trường' },
        { id: 24, name: 'Quân Sự' },
        { id: 25, name: 'Linh Dị' },
        { id: 26, name: 'Xuyên Nhanh' },
        { id: 27, name: 'Hệ Thống' },
        { id: 28, name: 'Nữ Cường' },
    ];
    return ( 
        <div className='row'>
            <div className='col c-12'>
                <div className='section-list-category'>
                    <div className='row head-title-global'>
                        <div className='head-title-global__left col c-12'>
                            <span className='head-title-global__content' style={{display: 'block'}}>
                                Thể loại truyện
                            </span>
                        </div>
                    </div>
                    <div className='row'>
                        <ul className='list-category'>
                            {listCategoryItems.map((item) => (
                                <li key={item.id}>
                                    <Link to={`/category/${convertToSlug(item.name)}`}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListCateGory;