import { useState } from 'react';
import {
    EnvelopeIcon,
    LockClosedIcon,
    EyeIcon,
    EyeSlashIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Todos los campos son obligatorios.');
            return;
        }
        try {
            await login({ email, password });
        } catch (err) {
            setError('Credenciales incorrectas. Por favor, intenta nuevamente.');
        }
    };


    return (
        <div className="w-full max-w-md mx-auto p-10 rounded-2xl shadow-2xl bg-white/30 backdrop-blur-xl">

            {error && (
                <div className="bg-red-100/80 text-red-700 text-sm px-4 py-3 rounded mb-4 shadow">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                    <Label htmlFor="email">Correo electrónico</Label>
                    <div className="relative mt-1">
                        <EnvelopeIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="tu@email.com"
                            className="pl-10 bg-gray-100/60 text-gray-800 placeholder-gray-500 backdrop-blur rounded-xl focus:ring-2 focus:ring-black focus:outline-none"
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <Label htmlFor="password">Contraseña</Label>
                    <div className="relative mt-1">
                        <LockClosedIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="pl-10 pr-10 bg-gray-100/60 text-gray-800 placeholder-gray-500 backdrop-blur rounded-xl focus:ring-2 focus:ring-black focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="h-5 w-5" />
                            ) : (
                                <EyeIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Submit */}
                <div>
                    <Button type="submit" className="w-full text-lg py-6 cursor-pointer rounded-xl">
                        Ingresar
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
