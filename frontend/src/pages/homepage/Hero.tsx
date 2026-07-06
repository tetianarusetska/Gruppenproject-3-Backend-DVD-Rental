import { useRef } from "react"
import { useScroll, useTransform, motion } from 'framer-motion'
import img1 from "../../assets/images/img1.jpg";

export default function Hero() {

    const container = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({        //ein Hook von Framer Motion, er gibt ScrollYProgress zurück(0 sichtbar -> 1 verschnwindet)
        target: container,
        offset: ["start end", 'end start']         //mit dem Parameter offset wird definiert wann den Messbereich begint und endet
    })

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);  //wandelt den ScrollYProgress-Wert in einen CSS-Wert
    //das Bild bewegt sich langsamer als die Seite scrollt

    return (
        <div
            ref={container}
            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}  //clipPath schneidet das Bild von unten nach oben weg
            className="w-screen h-screen"
        >
            <motion.div                //ein spezieller div von Framer-Motion, die animierte Werte(y) direkt im Style-Prop akzeptiert
                style={{ y }}          //und perfomant auf der GPU rendert
            >
                <img
                    src={img1} alt="img1"
                    className="w-screen h-screen object-cover"
                />
                <p
                    className="absolute top-100 left-100 text-8xl font-['Kosmos']"
                >
                    DVD RENTAL
                </p>
                <p
                    className="absolute top-160 left-35 text-6xl font-['BebasNeue']"
                >
                    Filme verwalten. Ausleihen verfolgen. Übersicht behalten.
                </p>
            </motion.div>
        </div>
    );
}