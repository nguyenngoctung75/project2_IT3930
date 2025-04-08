import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faList } from '@fortawesome/free-solid-svg-icons';
import config from "~/config";
import './Header.scss';
import logo from '~/assets/images/header-logo.png';

const Header = ({ setTheme }) => {
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleDropdown = (menu) => {
        setActiveDropdown(activeDropdown === menu ? null : menu);
    };

    const menuItems = [
        {
            id: "list",
            title: "Danh sách",
            items: [
                { title: "Truyện mới cập nhật", to: "/truyen-moi" },
                { title: "Truyện Hot", to: "/truyen-hot" },
                { title: "Truyện Hay", to: "/truyen-hay" },
                { title: "Truyện Full", to: "/truyen-full" }
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
                { title: "Màu nền Đen", action: () => setTheme("dark") },
                { title: "Màu nền Trắng", action: () => setTheme("light") }
            ]
        }
    ];

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
                                        {menu.multiColumn ? (
                                            <div className='row'>
                                                {menu.columns.map((column, index) => (
                                                    <ul key={index} className="dropdown-menu col c-4">
                                                        {column.map((item) => (
                                                            <li key={item.title}>
                                                                <Link to={item.to} title={item.title}>{item.title}</Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ))}
                                            </div>
                                        ) : (
                                            <ul className="dropdown-menu">
                                                {menu.items.map((item) => (
                                                    <li key={item.title} onClick={item.action || null}>
                                                        {item.to ? (
                                                            <Link to={item.to} title={item.title}>{item.title}</Link>
                                                        ) : (
                                                            item.title
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
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