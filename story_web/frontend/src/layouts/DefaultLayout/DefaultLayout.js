import Header from '../components/Header';
import './DefaultLayout.module.scss';
import { useState, useEffect } from "react"
function DefaultLayout({ children }) {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.body.className = theme + "-theme";
        localStorage.setItem("theme", theme);
    }, [theme]);
    return ( 
        <div>
            <Header setTheme={setTheme} />
            <div>
                {children}
            </div>
        </div>
    );
}

export default DefaultLayout;