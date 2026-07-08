import img1 from "../../assets/images/img1.jpg";
import { useNavigate } from "react-router-dom";


export default function MainArea() {

    const navigate = useNavigate();

    return (
        <section className="mt-40 w-screen min-h-screen bg-(--bgColor) text-(--mainColor) flex items-center justify-center px-8">
            <div className="max-w-7xl w-full">
                <div className="flex flex-col items-center justify-between gap-20">

                    <div className="flex w-full items-center justify-between gap-24">
                        <div className="flex-1 pl-10">
                            <h2 className="text-7xl font-black uppercase leading-none mb-10">
                                Alles an <br />
                                einem Ort.
                            </h2>
                            <p className="text-2xl leading-relaxed text-gray-300 font-['Lecturis'] max-w-xl">
                                Verwalte Filme, organisiere Kundendaten,
                                verfolge Ausleihen und behalte alle wichtigen
                                Informationen in einem zentralen System.
                            </p>
                        </div>
                        <div className="flex-1 flex justify-center">
                            <img
                                src={img1}
                                className="w-105 h-100 rounded-xl shadow-2xl object-cover"
                            />
                        </div>

                    </div>
                </div>

                <div className="grid grid-cols-4 gap-12 mt-28 font-['Lecturis']">
                    <div className="text-center">
                        <h3 className="text-7xl font-black">599+</h3>
                        <p className="uppercase tracking-[0.25em] text-gray-400 mt-4">
                            Kunden
                        </p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-7xl font-black">1000</h3>
                        <p className="uppercase tracking-[0.25em] text-gray-400 mt-4">
                            Filme
                        </p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-7xl font-black">16K+</h3>
                        <p className="uppercase tracking-[0.25em] text-gray-400 mt-4">
                            Ausleihen
                        </p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-7xl font-black">2</h3>
                        <p className="uppercase tracking-[0.25em] text-gray-400 mt-4">
                            Filialen
                        </p>
                    </div>

                </div>
                <div className="flex justify-center mt-24">
                    <button
                        onClick={() => navigate("/login")}
                        className="font-['Itsajump'] text-4xl p-3 rounded-4xl w-72 h-18 flex items-center justify-center text-(--mainColor) backdrop-blur-md bg-(--mainColor)/5 border border-(--mainColor)/20 shadow-lg transition-all duration-300 hover:bg-(--mainColor)/10 hover:scale-[1.03] active:scale-[0.98]"
                    >
                        Direkt starten
                    </button>
                </div>

            </div>
        </section>
    );
}