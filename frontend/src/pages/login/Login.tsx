import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate("/");
        } catch (err) {
            // Fehler wird automatisch im AuthContext abgefangen
            console.log(err)
        }
    };

    return (
        <section className="min-h-screen w-screen bg-(--bgColor) text-(--mainColor) flex items-center justify-center px-6">

            <div className="w-full max-w-md rounded-4xl backdrop-blur-md bg-(--mainColor)/5 border border-(--mainColor)/20 shadow-2xl p-10">

                <h1 className="font-['BebasNeue'] text-6xl text-center mb-12">
                    Login
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    <input
                        type="string"
                        placeholder="Benutzername"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="h-16 px-6 rounded-2xl bg-black/20 border border-(--mainColor)/20 text-xl font-['BebasNeue'] placeholder:text-gray-400 outline-none focus:border-(--mainColor)/60"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Passwort"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-16 px-6 rounded-2xl bg-black/20 border border-(--mainColor)/20 text-xl font-['BebasNeue'] placeholder:text-gray-400 outline-none focus:border-(--mainColor)/60"
                        required
                    />

                    {/* Dynamische Fehlermeldung im passenden Design, falls der Login fehlschlägt */}
                    {error && (
                        <p className="text-red-500 text-center font-['BebasNeue'] text-xl tracking-wide mt-2">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-8 font-['Kosmos'] text-4xl h-18 rounded-4xl flex items-center justify-center text-(--mainColor) backdrop-blur-md bg-(--mainColor)/5 border border-(--mainColor)/20 shadow-lg transition-all duration-300 hover:bg-(--mainColor)/10 hover:scale-[1.03] active:scale-[0.98] disabled:opacity-50 disabled:scale-100"
                    >
                        {isLoading ? "Verbinde..." : "Einloggen"}
                    </button>

                </form>

                <div className="mt-10 text-center text-gray-400 font-['BebasNeue'] text-lg">
                    Kein Konto?
                    <br />

                    <button onClick={() => navigate("/register")} className="mt-2 text-(--mainColor) underline font-['BebasNeue']">
                        Registrieren
                    </button>

                </div>

            </div>

        </section>
    );
}