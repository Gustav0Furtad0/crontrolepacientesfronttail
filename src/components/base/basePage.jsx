import Head from './head';
import Header from './header';
import Footer from './footer';

export default function BasePage(props) {
    return (
        <div className='bg-teal-800 min-h-screen flex flex-col'>
            <Head title={props.title} />
            <Header />
            <div className="bg-slate-100 grow px-4 py-8 sm:px-8 md:px-16 lg:px-32 xl:px-64">
                {props.children}
            </div>
            <Footer />
        </div>
    );
}