// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="text-center text-white space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Pharmacy Technician Career Assessment
        </h1>
        <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8">
          Discover if a pharmacy technician career is right for you with our comprehensive assessment tool
        </p>
        <a 
          href="/assessment" 
          className="inline-block bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/90 transition-colors"
        >
          Start Your Assessment Journey
        </a>
      </div>
    </div>
  );
};

export default Index;
