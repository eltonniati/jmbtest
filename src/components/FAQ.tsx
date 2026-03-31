import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What electrical services do you offer in Pretoria?",
    answer: "We offer comprehensive electrical services including residential wiring, commercial electrical installations, electrical repairs, maintenance, COC (Certificate of Compliance), DB board upgrades, and 24/7 emergency electrical services throughout Pretoria and surrounding areas."
  },
  {
    question: "Do you install solar panels and inverters?",
    answer: "Yes! We specialize in solar panel installations, inverter systems, battery backup solutions, and complete off-grid setups. We help you save on electricity costs and provide reliable power during load shedding."
  },
  {
    question: "How much does a solar installation cost?",
    answer: "Solar installation costs vary based on your energy needs, system size, and equipment chosen. We offer free consultations and quotes to assess your requirements and provide a customized solution that fits your budget. Contact us for a no-obligation assessment."
  },
  {
    question: "Do you install electric fences?",
    answer: "Yes, we provide professional electric fence installation and maintenance for residential and commercial properties in Pretoria. Our electric fences comply with SANS standards and include energizers, brackets, and warning signs for enhanced property security."
  },
  {
    question: "Do you install CCTV cameras and surveillance systems?",
    answer: "Absolutely! We install complete CCTV surveillance systems including HD and IP cameras, DVR/NVR recorders, remote viewing setup, and night vision cameras. Monitor your property 24/7 from your phone or computer."
  },
  {
    question: "Do you install gate motors and access control systems?",
    answer: "Yes, we install automated gate motors for sliding and swing gates, intercom systems, remote access controls, and smart access solutions. We work with top brands like CENTURION, ET Nice, and Gemini."
  },
  {
    question: "Do you provide emergency electrical services?",
    answer: "Yes, we offer 24/7 emergency electrical services in Pretoria. Whether it's a power outage, electrical fault, or urgent repair needed, our qualified electricians are available around the clock to assist you."
  },
  {
    question: "Are your electricians certified and qualified?",
    answer: "All our electricians are fully qualified, registered with the Department of Labour, and hold valid wireman's licenses. We adhere to SANS 10142 standards and provide Certificates of Compliance (COC) for all electrical work."
  },
  {
    question: "What areas do you service?",
    answer: "We primarily service Pretoria and the greater Gauteng area, including Centurion, Midrand, Johannesburg North, and surrounding suburbs. Contact us to confirm service availability in your area."
  },
  {
    question: "Do you sell solar panels, inverters and electrical products online?",
    answer: "Yes! We have an online shop where you can browse and purchase solar panels, inverters, batteries, and electrical accessories. Visit our Shop section to see available products and place an order."
  },
  {
    question: "How can I get a quote for electrical or solar work?",
    answer: "Getting a quote is easy! You can contact us via phone, email, WhatsApp, or fill out the contact form on our website. We'll schedule a site visit if needed and provide a detailed, no-obligation quote within 24-48 hours."
  },
  {
    question: "Do you offer warranties on your work?",
    answer: "Yes, we stand behind our workmanship with warranties on all installations. Solar equipment typically comes with manufacturer warranties ranging from 10-25 years. We also provide ongoing maintenance and support services."
  }
];

const FAQ = () => {
  // JSON-LD structured data for FAQ
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-muted/30">
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our electrical and solar services in Pretoria
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background border border-border rounded-lg px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help!
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
