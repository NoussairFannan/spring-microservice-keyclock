import React from 'react';
import { ShoppingCart, Package, LogOut, User, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = ({ currentPage, setCurrentPage }) => {
    const { user, logout, isAdmin } = useAuth();

    return (
        <nav className="bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 shadow-xl border-b border-teal-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo et Navigation */}
                    <div className="flex items-center space-x-8">
                        <div className="flex items-center">
                            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg mr-3 border border-white/30">
                                <ShoppingCart className="text-white" size={24} />
                            </div>
                            <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                                E-Commerce
                            </h1>
                        </div>

                        <div className="hidden md:flex space-x-2">
                            <button
                                onClick={() => setCurrentPage('produits')}
                                className={`flex items-center px-4 py-2 rounded-lg font-medium transition duration-200 ${
                                    currentPage === 'produits'
                                        ? 'bg-white/20 backdrop-blur-sm text-white shadow-md border border-white/30'
                                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <Package size={18} className="mr-2" />
                                Produits
                            </button>
                            <button
                                onClick={() => setCurrentPage('commandes')}
                                className={`flex items-center px-4 py-2 rounded-lg font-medium transition duration-200 ${
                                    currentPage === 'commandes'
                                        ? 'bg-white/20 backdrop-blur-sm text-white shadow-md border border-white/30'
                                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <ShoppingCart size={18} className="mr-2" />
                                Commandes
                            </button>
                        </div>
                    </div>

                    {/* User Info et Logout */}
                    <div className="flex items-center space-x-4">
                        <div className="text-right hidden sm:block">
                            <div className="flex items-center">
                                <p className="font-semibold text-white">{user.username}</p>
                                {isAdmin() && (
                                    <Shield className="ml-2 text-yellow-300" size={16} />
                                )}
                            </div>
                            <p className="text-xs text-white/80">
                                {isAdmin() ? 'Administrateur' : 'Client'}
                            </p>
                        </div>
                        <button
                            onClick={logout}
                            className="flex items-center bg-rose-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-rose-600 transition duration-200 shadow-md hover:shadow-lg border border-rose-600"
                        >
                            <LogOut size={18} className="mr-2" />
                            <span className="hidden sm:inline">Déconnexion</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;