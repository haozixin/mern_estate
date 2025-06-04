import React, { useState } from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess, signInFailure } from '../redux/userSlice';

export const OAuth = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleGoogleClick = async () => {
        try {
            setLoading(true);
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });
            
            const data = await res.json();
            if (res.ok) {
                dispatch(signInSuccess(data));
                console.log('Google sign in successful:', data);
                navigate('/');
            } else {
                dispatch(signInFailure(data.message || 'Google sign in failed'));
                console.error('Google sign in failed:', data.message);
            }
        } catch (error) {
            dispatch(signInFailure('Could not sign in with Google'));
            console.error('Could not sign in with google', error);
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <button
            type="button"
            onClick={handleGoogleClick}
            disabled={loading}
            className={`w-full py-2 sm:py-3 px-4 rounded-lg sm:rounded-xl font-medium border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 shadow-lg text-sm sm:text-base flex items-center justify-center group ${
                loading 
                    ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 hover:shadow-xl hover:scale-[1.02]'
            }`}
        >
            {loading ? (
                <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mr-2 sm:mr-3"></div>
                    <span>Connecting...</span>
                </>
            ) : (
                <>
                    {/* Google Logo SVG */}
                    <svg 
                        className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            fill="#4285F4" 
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path 
                            fill="#34A853" 
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path 
                            fill="#FBBC05" 
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path 
                            fill="#EA4335" 
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    <span className="group-hover:text-gray-900 transition-colors duration-200">
                        Continue with Google
                    </span>
                </>
            )}
        </button>
    )
} 