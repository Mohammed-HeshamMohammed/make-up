
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Calendar, Check } from "lucide-react";

interface Appointment {
  id: string;
  time: string;
  service: string;
  clientName: string;
  status: "upcoming" | "in-progress" | "completed" | "cancelled";
}

const TodayScheduleCard = () => {
  // Mock data for today's appointments
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      time: "10:00 AM",
      service: "Hair Styling",
      clientName: "Fatima Ahmed",
      status: "upcoming",
    },
    {
      id: "2",
      time: "12:30 PM",
      service: "Makeup Session",
      clientName: "Hana Mahmoud",
      status: "upcoming",
    },
    {
      id: "3",
      time: "3:00 PM",
      service: "Nail Art",
      clientName: "Laila Samir",
      status: "upcoming",
    },
  ]);

  // Handle start service
  const handleStartService = (id: string) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: "in-progress" } : apt
      )
    );
    toast.success("Service started! Client has been notified.");
    
    // In a real app, this would call the API
    console.log("API call would be: PATCH /api/bookings/" + id, { status: "in-progress" });
  };

  // Handle finish service
  const handleFinishService = (id: string) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: "completed" } : apt
      )
    );
    toast.success("Service completed! Thank you for your work.");
    
    // In a real app, this would call the API
    console.log("API call would be: PATCH /api/bookings/" + id, { status: "completed" });
  };

  return (
    <Card className="shadow-md border-none h-[350px]">
      <CardHeader className="bg-salon-pink/10 pb-4">
        <CardTitle className="flex items-center text-lg">
          <Calendar className="h-5 w-5 mr-2 text-salon-purple" />
          Today's Schedule
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[286px] overflow-y-auto">
          {appointments.length > 0 ? (
            <div className="divide-y">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{appointment.time}</p>
                      <p className="text-sm font-bold">{appointment.service}</p>
                      <p className="text-sm text-gray-600">{appointment.clientName}</p>
                    </div>
                    <div>
                      {appointment.status === "upcoming" && (
                        <Button
                          size="sm"
                          onClick={() => handleStartService(appointment.id)}
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Start
                        </Button>
                      )}
                      {appointment.status === "in-progress" && (
                        <Button
                          size="sm"
                          onClick={() => handleFinishService(appointment.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Finish
                        </Button>
                      )}
                      {appointment.status === "completed" && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Completed
                        </span>
                      )}
                      {appointment.status === "cancelled" && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                          Cancelled
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6">
              <p className="text-gray-500 text-center">No appointments scheduled for today</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayScheduleCard;


