import Footer from "../../components/footer/Footer";
import FooterIntro from "../../components/footer/FooterIntro";
import Dashboard from "../dashboard/Dashboard";

export default function DashboardPage() {
return (
    <>
     <h1 className='text-[4vw] leading-[0.8] mt-10 font-["Kosmos"] text-purple-600'>RetroVision Video</h1>
    <Dashboard />
    <FooterIntro />
    <Footer />
    </>
)

}