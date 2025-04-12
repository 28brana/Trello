import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../redux/slice/auth.slice';

const MainLayout = ({ children }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logoutAction());
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-white">
            <header className="bg-neutral-800 shadow-md p-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">T</span>
                    </div>
                    <h1 className="text-2xl font-semibold text-white">Trello Clone</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-right">
                        <p className="text-sm text-neutral-300"> {user?.username || 'Welcome!'}</p>
                        <p className="text-xs text-neutral-400">{user?.email}</p>
                    </div>
                    <button
                        data-cy="logout-button"
                        onClick={handleLogout}
                        className="ml-4 px-4 py-1 rounded bg-red-600 hover:bg-red-700 text-sm focus:outline-none"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="p-6">{children}</main>
        </div>
    );
};

export default MainLayout;
