
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Toaster } from "../components/ui/sonner";
import TodayScheduleCard from "../components/beautician/TodayScheduleCard";
import ClientDetailsCard from "../components/beautician/ClientDetailsCard";
import BeauticianNavbar from "../components/beautician/BeauticianNavbar";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const BeauticianDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Notification system for appointments
  useEffect(() => {
    // Check for upcoming appointments and notify the beautician
    const upcomingAppointment = {
      time: "12:30 PM",
      service: "Makeup Session",
      clientName: "Hana Mahmoud"
    };
    
    // Simulate an appointment notification (in a real app, this would check actual times)
    const notificationTimeout = setTimeout(() => {
      toast("Upcoming Appointment", {
        description: `You have ${upcomingAppointment.service} with ${upcomingAppointment.clientName} at ${upcomingAppointment.time}`,
        duration: 10000,
      });
    }, 5000); // Show notification after 5 seconds for demo purposes
    
    return () => clearTimeout(notificationTimeout);
  }, []);
  
  // Always show the dashboard for now - removed authentication checks temporarily
  return (
    <div className="min-h-screen bg-gray-50">
      <BeauticianNavbar />
      <Toaster />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-salon-purple">Beautician Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TodayScheduleCard />
          <ClientDetailsCard />
        </div>
      </main>
    </div>
  );
};

export default BeauticianDashboard;



