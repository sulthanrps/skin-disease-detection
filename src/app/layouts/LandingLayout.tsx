import Header from "../components/LandingPage/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Feature from "../components/LandingPage/Features/Feature";
import Faq from "../components/LandingPage/Faqs/Faq";

const LandingLayout = () => {
    return (
        <div className="bg-[#FEF6F8] text-[#0B134A]" style={{ fontFamily: "'Inter', sans-serif" }}>
            <Navbar />
                <main>
                    <Header />
                    <Feature />
                    <Faq />
                </main>
            <Footer />
        </div>
    )
}

export default LandingLayout;