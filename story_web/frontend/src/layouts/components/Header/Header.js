import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faList, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import config from "~/config";
import './Header.scss';
import logo from '~/assets/images/header-logo.png';

const Header = ({ setTheme }) => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [searchValue, setSearchValue] = useState("");

    const toggleDropdown = (menu) => {
        setActiveDropdown(activeDropdown === menu ? null : menu);
    };

    const menuItems = [
        {
            id: "list",
            title: "Danh sách",
            items: [
                { title: "Truyện mới cập nhật", to: "/category" },
                { title: "Truyện Hot", to: "/category" },
                { title: "Truyện Hay", to: "/category" },
                { title: "Truyện Full", to: "/category" }
            ]
        },
        {
            id: "genre",
            title: "Thể loại",
            multiColumn: true,
            columns: [
                [
                    { title: "Tiên Hiệp", to: "/category/tien-hiep" },
                    { title: "Kiếm Hiệp", to: "/category/kiem-hiep" },
                    { title: "Ngôn Tình", to: "/category/ngon-tinh" },
                    { title: "Đam Mỹ", to: "/category/dam-my" },
                    { title: "Quan Trường", to: "/category/quan-truong" },
                    { title: "Võng Du", to: "/category/vong-du" },
                    { title: "Khoa Huyễn", to: "/category/khoa-huyen" },
                    { title: "Hệ Thống", to: "/category/he-thong" },
                    { title: "Huyền Huyễn", to: "/category/huyen-huyen" },
                    { title: "Dị Giới", to: "/category/di-gioi" },
                    { title: "Dị Năng", to: "/category/di-nang" },
                    { title: "Sắc", to: "/category/sac" },
                    { title: "Quân Sự", to: "/category/quan-su" },
                    { title: "Lịch Sử", to: "/category/lich-su" }
                ],
                [
                    { title: "Xuyên Không", to: "/category/xuyen-khong" },
                    { title: "Xuyên Nhanh", to: "/category/xuyen-nhanh" },
                    { title: "Trọng Sinh", to: "/category/trong-sinh" },
                    { title: "Trinh Thám", to: "/category/trinh-tham" },
                    { title: "Thám Hiểm", to: "/category/tham-hiem" },
                    { title: "Linh Dị", to: "/category/linh-di" },
                    { title: "Ngược", to: "/category/nguoc" },
                    { title: "Sủng", to: "/category/sung" },
                    { title: "Cung Đấu", to: "/category/cung-dau" },
                    { title: "Nữ Cường", to: "/category/nu-cuong" },
                    { title: "Gia Đấu", to: "/category/gia-dau" },
                    { title: "Đông Phương", to: "/category/dong-phuong" },
                    { title: "Đô Thị", to: "/category/do-thi" },
                    { title: "Bách Hợp", to: "/category/bach-hop" }
                ],
                [
                    { title: "Hài Hước", to: "/category/hai-huoc" },
                    { title: "Điền Văn", to: "/category/dien-van" },
                    { title: "Cổ Đại", to: "/category/co-dai" },
                    { title: "Mạt Thế", to: "/category/mat-the" },
                    { title: "Truyện Teen", to: "/category/truyen-teen" },
                    { title: "Phương Tây", to: "/category/phuong-tay" },
                    { title: "Nữ Phụ", to: "/category/nu-phu" },
                    { title: "Light Novel", to: "/category/light-novel" },
                    { title: "Việt Nam", to: "/category/viet-nam" },
                    { title: "Đoản Văn", to: "/category/doan-van" },
                    { title: "Review sách", to: "/category/review-sach" },
                    { title: "Khác", to: "/category/khac" }
                ]
            ]
        },
        {
            id: "category",
            title: "Phân loại",
            items: [
                { title: "Dưới 100 chương", to: "/top-truyen/duoi-100-chuong" },
                { title: "100 - 500 chương", to: "/top-truyen/100-500-chuong" },
                { title: "500 - 1000 chương", to: "/top-truyen/500-1000-chuong" },
                { title: "Trên 1000 chương", to: "/top-truyen/tren-1000-chuong" }
            ]
        },
        {
            id: "custom",
            title: "Tùy chỉnh",
            items: [
                { 
                    title: "Màu nền", 
                    submenu: [
                        { title: "Nền đen", action: () => setTheme("dark") },
                        { title: "Nền trắng", action: () => setTheme("light") }
                    ]
                },
                { 
                    title: "Font chữ", 
                    submenu: [
                        { title: "Arial", action: () => updateStyle('fontFamily', 'Arial, sans-serif') },
                        { title: "Times New Roman", action: () => updateStyle('fontFamily', '"Times New Roman", serif') },
                        { title: "Roboto", action: () => updateStyle('fontFamily', '"Roboto", sans-serif') }
                    ]
                },
                { 
                    title: "Cỡ chữ", 
                    submenu: [
                        { title: "Nhỏ (1.6rem)", action: () => updateStyle('fontSize', '1.6rem') },
                        { title: "Vừa (2rem)", action: () => updateStyle('fontSize', '2rem') },
                        { title: "Lớn (2.4rem)", action: () => updateStyle('fontSize', '2.4rem') }
                    ]
                },
                { 
                    title: "Khoảng cách dòng", 
                    submenu: [
                        { title: "Chặt (1.5)", action: () => updateStyle('lineHeight', '1.5') },
                        { title: "Vừa (1.8)", action: () => updateStyle('lineHeight', '1.8') },
                        { title: "Rộng (2.2)", action: () => updateStyle('lineHeight', '2.2') }
                    ]
                }
            ]
        },
        {
            id: "account",
            title: "Tài khoản",
            items: [
                { title: "Đăng nhập", to: "/login" },
                { title: "Đăng ký", to: "/register" }
            ]
        }
    ];

    const updateStyle = (property, value) => {
        const root = document.documentElement;
        
        switch(property) {
            case 'fontSize':
                root.style.setProperty('--chapter-font-size', value);
                break;
            case 'lineHeight':
                root.style.setProperty('--chapter-line-height', value);
                break;
            case 'fontFamily':
                root.style.setProperty('--chapter-font-family', value);
                break;
            case 'backgroundColor':
                root.style.setProperty('--chapter-bg-color', value);
                break;
        }
        
        // Lưu vào localStorage để giữ cài đặt
        localStorage.setItem(`chapterStyle_${property}`, value);
    };

    // Khôi phục cài đặt khi component mount
    useEffect(() => {
        const properties = ['fontSize', 'lineHeight', 'fontFamily', 'backgroundColor'];
        properties.forEach(prop => {
            const savedValue = localStorage.getItem(`chapterStyle_${prop}`);
            if (savedValue) {
                updateStyle(prop, savedValue);
            }
        });
    }, []);

    let navigate = useNavigate();
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchValue.trim() !== "") {
            // Ví dụ chuyển trang tìm kiếm:
            navigate(`/tim-kiem?tukhoa=${encodeURIComponent(searchValue)}`);
        }
    };


    return ( 
        <header className='header'>
            <nav className='header__navbar'>
                <div className='grid wide'>
                    <Link to={config.routes.home} className="navbar-brand">
                        <img src={logo} alt="Logo Web Truyen" className="navbar-image"/>
                    </Link>
                    <ul className='navbar-control'>
                        {menuItems.map((menu) => (
                            <li 
                                key={menu.id}
                                className={`navbar-dropdown ${activeDropdown === menu.id ? "active" : ""}`} 
                                onClick={() => toggleDropdown(menu.id)}
                            >
                                <FontAwesomeIcon icon={faList} className='dropdown-icon'/>
                                {menu.title}
                                <FontAwesomeIcon icon={faCaretDown} className='dropdown-icon__down'/>
                                
                                {activeDropdown === menu.id && (
                                    <div className={`dropdown-menu-container ${menu.multiColumn ? 'multi-column' : ''}`}>
                                        <ul className="dropdown-menu">
                                            {menu.items.map((item) => (
                                                <li key={item.title}>
                                                    {item.submenu ? (
                                                        <>
                                                            <span>{item.title} →</span>
                                                            <ul className="submenu">
                                                                {item.submenu.map((subItem) => (
                                                                    <li 
                                                                        key={subItem.title} 
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            subItem.action();
                                                                        }}
                                                                    >
                                                                        {subItem.title}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </>
                                                    ) : item.to ? (
                                                        <Link to={item.to}>{item.title}</Link>
                                                    ) : (
                                                        <span onClick={item.action}>{item.title}</span>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>

                    <form className="search-form" onSubmit={handleSearch}>
                        <div className="search-input-group">
                            <input
                                aria-label="Từ khóa tìm kiếm"
                                role="search"
                                className="search-input"
                                id="search-input"
                                type="search"
                                name="tukhoa"
                                placeholder="Tìm kiếm truyện..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                required
                            />
                            <button className="search-button" type="submit">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                    </form>
                </div>
            </nav>
            <div className='header__breadcrumb'>
                <div className='grid wide'>
                    Đọc truyện online, đọc truyện chữ, truyện full, truyện hay. Tổng hợp đầy đủ và cập nhật liên tục. 
                </div>
            </div>
        </header>
    );
}

export default Header;