import Head from './head';
import Header from './header';
import Footer from './footer';

export default function BasePage(props) {
    return (
        <div className='bg-teal-800 min-h-screen flex flex-col'>
            <Head title={props.title} />
            <Header />
            <div className="bg-slate-100 grow px-64 py-8">
                {props.children}
            </div>
            <Footer />
        </div>
    );
}