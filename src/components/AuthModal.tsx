import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import GoogleMapLocation from "./GoogleMapLocation";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  redirectTo?: string;
  initialView?: "login" | "signup";
}

function AuthModal({ open, onClose, redirectTo, initialView = "login" }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Reset to login view whenever modal opens
  useEffect(() => {
    if (open) {
      setIsLogin(initialView === "login");
    }
  }, [open, initialView]);

  // Handle map location selection
  const handleMapLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
  };

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
        
        if (email === 'admin@gmail.com') {
          navigate("/admin");
        } else if (email === 'beautician@gmail.com') {
          navigate("/beautician");
        } else if (redirectTo) {
          navigate(redirectTo);
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
      if (!email || !password || !name || !mobile || !address) {
        toast({
          variant: "destructive",
          title: "Missing information",
          description: "Please fill in all required fields.",
        });
        return;
      }
      
      const success = await register(email, password, name, mobile, address, location);
      
      if (success) {
        toast({
          title: "Account created",
          description: "Your account has been created successfully. You are now logged in.",
        });
        
        onClose();
        if (redirectTo) {
          navigate(redirectTo);
        }
      } else {
        toast({
          variant: "destructive",
          title: "Sign up failed",
          description: "Could not create your account. Please try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign up error",
        description: "An unexpected error occurred.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isLogin ? "Login" : "Create Account"}</DialogTitle>
        </DialogHeader>
        
        {isLogin ? (
          <>
            <form onSubmit={handleLogin} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full bg-salon-pink hover:bg-salon-dark-pink text-white">Login</Button>
            </form>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500 mb-2">Don't have an account?</p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </Button>
            </div>
          </>
        ) : (
          <>
            <form onSubmit={handleSignup} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-mobile">Mobile Number</Label>
                <Input
                  id="signup-mobile"
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
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
              
              {/* Google Maps Integration */}
              <div className="space-y-2">
                <Label className="mb-2 block">Confirm on Map</Label>
                <GoogleMapLocation 
                  address={address} 
                  onLocationSelect={handleMapLocationSelect} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full bg-salon-pink hover:bg-salon-dark-pink text-white">Sign Up</Button>
            </form>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500 mb-2">Already have an account?</p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsLogin(true)}
              >
                Login
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;








