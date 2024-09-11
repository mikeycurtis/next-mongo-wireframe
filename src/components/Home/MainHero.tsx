'use client'
import { useRouter } from 'next/navigation';
export default function MainHero() {
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/register'); // Replace with your target page path
      };

    return(
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                <h1 className="text-5xl font-bold">Craft Beautiful Thank-you Notes in Seconds.</h1>
                <p className="py-6">Meet Thanku, your personal AI thank-you note assistant. Give Thanku a description of you item/items you want thank-you notes for and watch the magic happen!</p>
                <button className="btn btn-primary" onClick={handleRedirect} >Get Started</button>
                </div>
            </div>
        </div>
    )
}