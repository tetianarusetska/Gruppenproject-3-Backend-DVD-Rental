'use client'; // Next.js-Direktive: diese Datei läuft im Browser, nicht auf dem Server
import Lenis from 'lenis'
import { useEffect } from 'react'

import Hero from "./Hero"


export default function Home() {

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


    return (
        <>
            <Hero />
        </>
    );
}