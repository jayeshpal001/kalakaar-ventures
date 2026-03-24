import Footer from "@/components/layout/Footer";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/Portfolio";
import Services from "@/components/sections/Services";
// Direct database connection for maximum speed
import { connectToDatabase } from "@/lib/db";
import Project from "@/models/Project";

// Server-side data fetching function
async function getProjects() {
  try {
    await connectToDatabase();
    
    // .lean() converts mongoose documents to plain JS objects for better performance
    const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
    
    // Next.js requires plain objects to be passed to Client Components
    return projects.map((p) => ({
      ...p,
      _id: p._id.toString(),
      createdAt: p.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("Database connection failed:", error);
    return []; // Return an empty array if DB isn't connected yet to prevent crashing
  }
}

export default async function Home() {
  const liveProjects = await getProjects();
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full">
      <Hero/>
     <Portfolio initialProjects={liveProjects} />
      <Services  />
      <Contact />
      <Footer />
      {/* We will drop the Portfolio, Services, and Contact sections below this */}
    </main> 
  );
}