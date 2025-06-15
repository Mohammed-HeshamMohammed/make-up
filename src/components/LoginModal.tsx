
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";
import { useAuth } from "../contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const isLoggedIn = await login(email, password);
      if (isLoggedIn) {
        toast({
          title: "Login successful",
          description: "You have been logged in successfully.",
        });
        onClose();
        
        // Redirect based on email
        if (email === 'admin@gmail.com') {
          navigate("/admin");
        } else if (email === 'beautician@gmail.com') {
          navigate("/beautician");
        }
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Please check your credentials and try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login error",
        description: "An unexpected error occurred.",
      });
    }
  };
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Basic validation
      if (!email || !password || !name || !mobile) {
        toast({
          variant: "destructive",
          title: "Missing information",
          description: "Please fill in all required fields.",
        });
        return;
      }
      
      // Here you would typically call an API to register the user
      // For now, we'll just show a success message
      toast({
        title: "Account created",
        description: "Your account has been created successfully. You can now log in.",
      });
      
      // Reset form and switch to login view
      setIsLogin(true);
      setEmail("");
      setPassword("");
      setName("");
      setMobile("");
      setAddress("");
      setLocation("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign up error",
        description: "An unexpected error occurred.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isLogin ? "Login to your account" : "Create an account"}</DialogTitle>
          <DialogDescription>
            {isLogin 
              ? "Enter your email and password to access your account." 
              : "Fill in your details to create a new account."}
          </DialogDescription>
        </DialogHeader>
        
        {isLogin ? (
          <form onSubmit={handleLogin}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter className="flex flex-col gap-2 sm:flex-row">
              <Button type="submit" className="w-full">Login</Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => setIsLogin(false)}
              >
                Create Account
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="01xxxxxxxxx"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Select onValueChange={setLocation} value={location}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Maadi">Maadi</SelectItem>
                    <SelectItem value="Heliopolis">Heliopolis</SelectItem>
                    <SelectItem value="New Cairo">New Cairo</SelectItem>
                    <SelectItem value="6th October">6th October</SelectItem>
                    <SelectItem value="Sheikh Zayed">Sheikh Zayed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="flex flex-col gap-2 sm:flex-row">
              <Button type="submit" className="w-full">Sign Up</Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => setIsLogin(true)}
              >
                Back to Login
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}




