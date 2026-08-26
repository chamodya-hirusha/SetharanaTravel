import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { packagesData } from "@/data/travelData";
import { ArrowLeft, MapPin, Clock, CheckCircle2, PhoneCall } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default async function PackageDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pkg = packagesData.find((p) => p.id === id);

  if (!pkg) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-24 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link href="/#packages" className="inline-flex items-center gap-2 text-primary hover:text-secondary mb-8 font-semibold transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Packages
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Image */}
            <div className="relative w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={pkg.image}
                alt={pkg.title}
                fill
                className="object-cover"
                priority
                sizes="(max-w-lg) 100vw, 50vw"
              />
              {pkg.isPopular && (
                <span className="absolute top-6 right-6 z-10 bg-secondary text-primary font-extrabold text-sm px-4 py-2 rounded-full uppercase tracking-wider shadow-md">
                  Most Popular
                </span>
              )}
            </div>

            {/* Right: Content */}
            <div className="flex flex-col">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-4 leading-tight">
                {pkg.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600 font-semibold text-lg">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                  <MapPin className="w-5 h-5 text-secondary" />
                  <span>{pkg.location}</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                  <Clock className="w-5 h-5 text-secondary" />
                  <span>{pkg.duration}</span>
                </div>
              </div>

              <Card className="p-8 border-gray-100 mb-8 bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-primary mb-6">Package Highlights</h3>
                <div className="space-y-4">
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-gray-700 text-lg">
                      <CheckCircle2 className="w-6 h-6 text-[#0E4B3A] mt-0.5 flex-shrink-0" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-8 border-gray-100 bg-primary text-white shadow-xl">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                  <div>
                    <span className="text-white/80 block font-semibold mb-2">Price per person</span>
                    {pkg.originalPrice && (
                      <span className="text-lg text-white/50 line-through block leading-none mb-1">
                        {pkg.originalPrice}
                      </span>
                    )}
                    <span className="text-4xl md:text-5xl font-black text-secondary">
                      {pkg.price}
                    </span>
                  </div>
                  <span className="bg-white/20 px-3 py-1 rounded-md font-semibold">
                    All Inclusive
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={`https://wa.me/94774222970?text=${encodeURIComponent(`Hello, I would like to book the following package:\n\n*Title:* ${pkg.title}\n*Location:* ${pkg.location}\n*Duration:* ${pkg.duration}\n*Price:* ${pkg.price}\n\nPlease provide me with more details.`)}`} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full text-lg font-bold shadow-lg"
                    >
                      Book Now
                    </Button>
                  </a>
                  <a href="tel:0774222970" className="flex-1">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full text-lg font-bold bg-transparent text-white border-white/30 hover:bg-white hover:text-primary transition-all"
                    >
                      <PhoneCall className="w-5 h-5 mr-2" />
                      Call Us
                    </Button>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
