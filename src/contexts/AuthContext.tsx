import { createContext, useContext, useState, ReactNode } from "react";

// Types
type User = {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'admin' | 'beautician';
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isBeautician: boolean;
  register: (
    email: string, 
    password: string, 
    name: string, 
    mobile: string,
    address?: string,
    location?: string
  ) => Promise<boolean>;
};

// Create auth context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Check if user exists in local storage
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Check if user is authenticated
  const isAuthenticated = !!user;
  
  // Check if user is admin
  const isAdmin = user?.role === 'admin';
  
  // Check if user is beautician
  const isBeautician = user?.role === 'beautician';

  // Mock login function (would connect to backend in real app)
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      if (!email || !password) {
        return false;
      }

      // Check for admin and beautician logins
      if (email === 'admin@gmail.com' && password.length >= 6) {
        const adminUser = {
          id: '1',
          name: 'Admin',
          email: email,
          role: 'admin' as const,
        };
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        return true;
      } else if (email === 'beautician@gmail.com' && password.length >= 6) {
        const beauticianUser = {
          id: '3',
          name: 'Beautician',
          email: email,
          role: 'beautician' as const,
        };
        setUser(beauticianUser);
        localStorage.setItem('user', JSON.stringify(beauticianUser));
        return true;
      }

      // Check for regular users in localStorage
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const user = users.find((u: any) => u.email === email);
        
        if (user && password.length >= 6) {
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Add register function
  const register = async (
    email: string, 
    password: string, 
    name: string, 
    mobile: string,
    address?: string,
    location?: string
  ): Promise<boolean> => {
    try {
      if (!email || !password || !name || !mobile) {
        return false;
      }

      // In a real app, this would call your backend API
      // For now, we'll create a regular user account
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: name,
        email: email,
        mobile: mobile,
        address: address || '',
        location: location || '',
        role: 'client' as const,
      };
      
      // Store user in localStorage (simulating database)
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      
      // Also store in users array for future logins
      const storedUsers = localStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAdmin, isBeautician, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}




