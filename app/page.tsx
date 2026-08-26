import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Packages from "@/components/sections/Packages";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import FloatingButtons from "@/components/ui/FloatingButtons";
import { getContactSettings } from "@/utils/contact-settings";
import { getGallery } from "@/app/admin/actions/gallery";
import { getPackages } from "@/app/admin/actions/packages";
import { getTestimonials } from "@/app/admin/actions/testimonials";
import { getFaqs } from "@/app/admin/actions/faqs";

export const dynamic = "force-dynamic";

export default async function Home() {
  const contactSettings = await getContactSettings();
  const dbGallery = await getGallery();
  const dbPackages = await getPackages();
  const dbTestimonials = await getTestimonials();
  const dbFaqs = await getFaqs();

  return (
    <>
      <Navbar contactSettings={contactSettings} />
      <main className="flex-grow">
        <Hero contactSettings={contactSettings} />
        <About />
        <Services />
        <Packages contactSettings={contactSettings} initialData={dbPackages} />
        <Gallery initialData={dbGallery} />
        <Testimonials initialData={dbTestimonials} />
        <FAQ initialData={dbFaqs} />
        <Contact contactSettings={contactSettings} />
      </main>
      <Footer contactSettings={contactSettings} />
      <FloatingButtons contactSettings={contactSettings} />
    </>
  );
}
