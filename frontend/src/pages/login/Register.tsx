import { useNavigate } from "react-router-dom";

export default function Register() {

    const navigate = useNavigate();

    return (
        <section className="min-h-screen w-screen bg-(--bgColor) text-(--mainColor) flex items-center justify-center px-6">

            <div className="w-full max-w-md rounded-4xl backdrop-blur-md bg-(--mainColor)/5 border border-(--mainColor)/20 shadow-2xl p-10">
                <h1 className="font-['BebasNeue'] text-6xl text-center mb-12">
                    LOGIN
                </h1>

                <form className="flex flex-col gap-6">
                    <input
                        type="email"
                        placeholder="E-Mail"
                        className="h-16 px-6 rounded-2xl bg-black/20 border border-(--mainColor)/20 text-xl font-['BebasNeue'] placeholder:text-gray-400 outline-none focus:border-(--mainColor)/60"
                    />
                    <input
                        type="password"
                        placeholder="Passwort"
                        className="h-16 px-6 rounded-2xl bg-black/20 border border-(--mainColor)/20 text-xl font-['BebasNeue'] placeholder:text-gray-400 outline-none focus:border-(--mainColor)/60"
                    />
                    <button
                        type="submit"
                        className="mt-8 font-['Kosmos'] text-4xl h-18 rounded-4xl flex items-center justify-center text-(--mainColor) backdrop-blur-md bg-(--mainColor)/5 border border-(--mainColor)/20 shadow-lg transition-all duration-300 hover:bg-(--mainColor)/10 hover:scale-[1.03] active:scale-[0.98]"
                    >
                        Registrieren
                    </button>
                </form>

                <div className="mt-10 text-center text-gray-400 font-['BebasNeue'] text-lg">
                    Bereits ein Konto?
                    <br />
                    <button onClick={() => navigate("/login")} className="mt-2 text-(--mainColor) underline font-['BebasNeue']">
                        Einloggen
                    </button>
                </div>

            </div>

        </section>
    );
}