import { getSession } from "next-auth/react";
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
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    return {
        props: {
            session
        }
    }
}
