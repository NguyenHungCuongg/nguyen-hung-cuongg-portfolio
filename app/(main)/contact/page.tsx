import { Contact } from "@/components/sections/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | N4C",
  description: "Get in touch for software engineering opportunities and technical collaboration.",
};

export default async function ContactPage() {
  // Artificial delay to show the retro loading spinner
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="flex-1 flex flex-col justify-center min-h-[calc(100vh-160px)]">
      <Contact />
    </div>
  );
}
