'use client'; // Next.js-Direktive: diese Datei läuft im Browser, nicht auf dem Server
import Lenis from 'lenis'
import { useEffect } from 'react'
import { useAuth } from "../../context/useAuth"
import { useNavigate } from "react-router-dom"

import Hero from "./Hero"
import MainArea from "./MainArea.tsx"
import RentalDashboard from "./RentalDashboard"
import Footer from '../../components/footer/Footer';
import FooterIntro from '../../components/footer/FooterIntro';


export default function Home() {
    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

    // Routen-Schutz: Wenn die Session-Prüfung fertig ist und der Nutzer nicht eingeloggt ist -> Weiterleitung zum Login
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, isLoading, navigate]);

    useEffect(() => {
        // Lenis initialisieren: sorgt für weicheres, angenehmeres Scroll-Verhalten
        const lenis = new Lenis()
        // raf = requestAnimationFrame: wird jeden Frame aufgerufen
        // Lenis braucht das, um die Scroll-Animation flüssig zu berechnen

        const raf = (time: number) => {
            lenis.raf(time); // Lenis mit dem aktuellen Zeitstempel aktualisieren
            requestAnimationFrame(raf); // nächsten Frame anfordern → Endlosschleife
        };
        
        requestAnimationFrame(raf) // Schleife starten
    }, [])

    // Während das Backend das Cookie validiert, wird die UI blockiert, damit das Dashboard nicht kurz aufblitzt
    if (isLoading) {
        return null; 
    }

    // Falls nicht eingeloggt (wird durch das useEffect oben umgeleitet), rendern wir nichts
    if (!isAuthenticated) {
        return null;
    }

    return (
        <>
            <Hero />
            <MainArea />
            <RentalDashboard />
            <FooterIntro />
            <Footer />
        </>
    );
}