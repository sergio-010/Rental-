'use client';

import { useAuth } from "@clerk/nextjs";

export default function GetUserIdPage() {
    const { userId } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Tu ID de Usuario</h1>
            {userId ? (
                <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-md">
                    <p className="font-medium text-center">Copia este ID para configurar el administrador:</p>
                    <div className="bg-white p-3 rounded mt-2 border border-gray-300 break-all">
                        {userId}
                    </div>
                    <p className="mt-4 text-sm text-gray-600">
                        Para convertirte en administrador, añade este ID a la variable
                        NEXT_PUBLIC_ADMINISTRATOR en tu archivo .env
                    </p>
                </div>
            ) : (
                <p className="text-red-500">Debes iniciar sesión para ver tu ID de usuario</p>
            )}
        </div>
    );
}
