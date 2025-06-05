import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '~/utils/AuthContext';
import { toast } from '~/utils/toast-message';
import './SearchPage.scss';

function SearchPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const searchValue = searchParams.get('tukhoa');

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!searchValue) {
                setSearchResults([]);
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get(`http://localhost:5000/api/stories/search?tukhoa=${encodeURIComponent(searchValue)}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSearchResults(res.data);
            } catch (err) {
                setError(`Lỗi khi tìm kiếm: ${err.response?.data?.message || err.message}`);
                toast({
                    title: 'Thất bại!',
                    message: `Lỗi khi tìm kiếm: ${err.response?.data?.message || err.message}`,
                    type: 'error',
                    duration: 3000,
                });
            } finally {
                setLoading(false);
            }
        };
        fetchSearchResults();
    }, [searchValue, token]);

    if (loading) return <div>Đang tải kết quả...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="search-page">
            <h2>Kết quả tìm kiếm cho: "{searchValue}"</h2>
            {searchResults.length > 0 ? (
                <ul className="search-results">
                    {searchResults.map((result) => (
                        <li key={result.id} className="search-item">
                            <a href={`/story/${result.id}`} className="result-link">
                                {result.storyname}
                            </a>
                            <p>{result.author}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Không tìm thấy kết quả nào.</p>
            )}
        </div>
    );
}

export default SearchPage;