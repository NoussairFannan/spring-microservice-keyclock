import React, { useState } from 'react';
import { ShoppingCart, XCircle, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(username, password);

        if (!result.success) {
            setError(result.error);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-emerald-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-teal-200">
                {/* Header */}
                <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 p-8 text-center">
                    <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl border-2 border-white/30">
                        <ShoppingCart className="text-white" size={40} />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Bienvenue</h1>
                    <p className="text-white/90">Gestion Produits & Commandes</p>
                </div>

                {/* Form */}
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Nom d'utilisateur
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="input-field"
                                placeholder="Entrez votre nom d'utilisateur"
                                required
                                autoFocus
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                                placeholder="Entrez votre mot de passe"
                                required
                            />
                        </div>

                        {error && (
                            <div className="bg-rose-50 border-l-4 border-rose-500 text-rose-700 px-4 py-3 rounded-r flex items-center">
                                <XCircle size={20} className="mr-2 flex-shrink-0" />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full py-3 flex items-center justify-center"
                        >
                            {loading ? (
                                <>
                                    <Loader className="animate-spin mr-2" size={20} />
                                    Connexion en cours...
                                </>
                            ) : (
                                'Se connecter'
                            )}
                        </button>
                    </form>

                    {/* Test Accounts */}
                    <div className="mt-8 p-4 bg-gradient-to-r from-teal-50 via-cyan-50 to-emerald-50 rounded-xl border border-teal-200 shadow-sm">
                        <p className="text-xs font-bold text-teal-800 mb-3 uppercase tracking-wide">
                            Comptes de test disponibles
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-teal-700 font-medium">👤 admin</span>
                                <span className="text-teal-400">•</span>
                                <span className="text-teal-600">admin123</span>
                                <span className="bg-gradient-to-r from-amber-200 to-yellow-200 text-amber-800 px-2 py-0.5 rounded-lg text-xs font-semibold shadow-sm">
                  ADMIN
                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-teal-700 font-medium">👤 client1</span>
                                <span className="text-teal-400">•</span>
                                <span className="text-teal-600">client123</span>
                                <span className="bg-gradient-to-r from-emerald-200 to-teal-200 text-emerald-800 px-2 py-0.5 rounded-lg text-xs font-semibold shadow-sm">
                  CLIENT
                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;