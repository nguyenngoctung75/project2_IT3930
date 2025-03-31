import Header from '../components/Header';
import './DefaultLayout.module.scss';
function DefaultLayout({ children }) {
    return ( 
        <div>
             <Header />
            <div>
                {children}
            </div>
        </div>
    );
}

export default DefaultLayout;