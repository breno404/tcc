import { useEffect, useState } from 'react';

interface TokenData {
    id: string, name: string
    // ...
}

const useToken = (): { token: string; data: TokenData } | null => {
    const [tokenData, setTokenData] = useState<{ token: string; data: TokenData } | null>(null);

    useEffect(() => {
        // Função para obter o token do armazenamento local (localStorage, sessionStorage, etc.)
        const getToken = (): string | null => {
            return localStorage.getItem('token');
        };

        const token = getToken();

        if (token) {
            // Decodificar o token JWT e extrair os dados
            const decodedToken = decodeToken(token);

            if (decodedToken) {
                setTokenData({ token, data: decodedToken });
            } else {
                // Token inválido, fazer o logout ou tratar o erro de acordo com sua lógica
                logout();
            }
        } else {
            // Token ausente, fazer o logout ou redirecionar para a página de login
            logout();
        }
    }, []);

    const decodeToken = (token: string): TokenData | null => {
        try {
            // Decodificar o token JWT
            const decoded = JSON.parse(atob(token.split('.')[1]));
            // Retornar os dados do token
            return decoded;
        } catch (error) {
            // Erro ao decodificar o token, retornar null
            return null;
        }
    };

    const logout = () => {
        // Lógica para fazer o logout do usuário (ex: remover o token do armazenamento local)
        localStorage.removeItem('token');
        setTokenData(null);
        // Redirecionar para a página de login ou tomar a ação desejada
    };

    return tokenData;
};

export default useToken;