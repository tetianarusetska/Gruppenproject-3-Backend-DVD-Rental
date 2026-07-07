import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import img2 from "../../assets/images/img2.jpg";

export default function Hero() {
    const container = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <section
            ref={container}
            style={{ clipPath: "polygon(0% 0,100% 0%,100% 100%,0 100%)" }}
            className="relative h-screen w-screen overflow-hidden"
        >
            <motion.div
                style={{ y }}
                className="absolute inset-0"
            >
                <img
                    src={img2}
                    alt="DVD Rental"
                    className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/45" />
            </motion.div>

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                <h1
                    className="font-['Kosmos'] text-6xl md:text-8xltext-white drop-shadow-2xl
                    "
                >
                    DVD RENTAL
                </h1>

                <p
                    className="mt-10 max-w-4xl font-['Lecturis'] text-xl md:text-4xl text-gray-200 leading-relaxed"
                >
                    Filme verwalten. Ausleihen verfolgen.
                    <br />
                    Übersicht behalten.
                </p>

                <button
                    className="mt-20 font-['Itsajump'] text-4xl mx-auto p-3 rounded-4xl w-62.5 h-18 flex items-center justify-center text-(--mainColor) backdrop-blur-md bg-(--mainColor)/5 border border-(--mainColor)/20 shadow-lg transition-all duration-300 hover:bg-(--mainColor)/10 hover:scale-[1.03] active:scale-[0.98]"
                >
                    Jetzt starten
                </button>
            </div>
        </section>
    );
}