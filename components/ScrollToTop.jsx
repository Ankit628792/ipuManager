import { useState, useEffect } from 'react'

function ScrollToTop() {
    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const [scrolled, setScrolled] = useState(false)
    const checkScrollTop = () => {
        if (window.pageYOffset > 75) {
            setScrolled(true)
        } else if (window.pageYOffset <= 75) {
            setScrolled(false)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop)
        return () => {
            window.removeEventListener('scroll', checkScrollTop)
        }
    }, [scrolled])
    return (
        <>
            <button className="btn__float bg-purple-700 hover:bg-purple-800 shadow-xl shadow-purple-300 p-3 fixed bottom-10 right-10 font-bold text-white rounded-full"
                onClick={scrollTop}
                style={{ display: scrolled ? 'flex' : 'none' }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 font-semibold text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
            </button>
        </>
    )
}

export default ScrollToTop