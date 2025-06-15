import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  // Remove the hardcoded testimonials array. If you want to fetch from the database, implement a useTestimonials hook and use it here. Otherwise, leave a placeholder for future dynamic data.

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h5 className="text-salon-purple mb-2 font-medium">Testimonials</h5>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it – hear from our satisfied clients who have experienced our luxury mobile salon services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Placeholder for future dynamic data */}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
