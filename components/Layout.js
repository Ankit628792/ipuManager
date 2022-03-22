import Header from "./Header";
import ScrollToTop from "./ScrollToTop";

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <main className="max-w-7xl mx-auto p-2">
                {children}
            </main>
            <ScrollToTop />
            {/* <Footer /> */}
        </>
    )
}
