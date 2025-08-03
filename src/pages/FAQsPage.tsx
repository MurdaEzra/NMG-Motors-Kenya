import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
interface FAQ {
  question: string;
  answer: string;
}
const FAQsPage: React.FC = () => {
  const [openFAQs, setOpenFAQs] = useState<number[]>([]);
  const faqs: FAQ[] = [{
    question: 'What types of vehicles do you offer?',
    answer: 'We offer a wide range of vehicles including sedans, SUVs, trucks, and luxury vehicles from various manufacturers. Our inventory is regularly updated with both new and pre-owned vehicles to provide our customers with extensive options.'
  }, {
    question: 'Do you offer financing options?',
    answer: 'Yes, we provide flexible financing options to suit different budgets and credit situations. We work with multiple financial institutions to ensure our customers get competitive rates and terms. Our finance team can help you explore various financing plans and find the one that best meets your needs.'
  }, {
    question: 'What is your warranty policy?',
    answer: "All our new vehicles come with the manufacturer's warranty. For pre-owned vehicles, we offer various warranty packages depending on the vehicle's age, mileage, and condition. Our standard used car warranty covers major mechanical components for a specified period. Extended warranty options are also available for additional coverage and peace of mind."
  }, {
    question: 'Can I trade in my current vehicle?',
    answer: 'Absolutely! We accept trade-ins and offer fair market value for your current vehicle. Our team will evaluate your vehicle and provide a competitive offer that can be applied towards the purchase of your new vehicle. This can significantly reduce your out-of-pocket expenses.'
  }, {
    question: 'How do I schedule a test drive?',
    answer: "Scheduling a test drive is easy. You can contact us through our website, give us a call, or visit our showroom in person. We recommend scheduling in advance to ensure the specific vehicle you're interested in is available, but walk-ins are also welcome. Our sales team will be happy to assist you with the test drive process."
  }, {
    question: 'What documents do I need to purchase a vehicle?',
    answer: "To purchase a vehicle, you'll typically need a valid driver's license, proof of insurance, and proof of income if financing. If you're planning to finance the vehicle, additional documentation may be required such as proof of residence and references. Our sales team will guide you through the specific requirements based on your situation."
  }, {
    question: 'Do you ship vehicles to other locations?',
    answer: 'Yes, we can arrange vehicle shipping both domestically and internationally. Shipping costs and delivery times vary depending on the destination. Please contact our sales team for more information about shipping options and to get a quote for your specific location.'
  }, {
    question: 'What is your return policy?',
    answer: "We stand behind the quality of our vehicles. We offer a 7-day/1,000 km exchange policy on most vehicles (subject to certain terms and conditions). If you're not completely satisfied with your purchase, you can exchange it for another vehicle of equal or greater value (price difference will apply). Please note that this policy may not apply to certain specialized vehicles or sales."
  }, {
    question: 'How often is your inventory updated?',
    answer: 'Our inventory is updated daily. As vehicles are sold and new ones arrive, our online inventory is refreshed to reflect these changes. We recommend checking our website regularly or signing up for our newsletter to stay informed about new arrivals and special offers.'
  }, {
    question: 'Do you service the vehicles you sell?',
    answer: 'Yes, we have a full-service maintenance and repair center staffed by certified technicians. We can handle everything from routine maintenance to major repairs. Our service center is equipped with state-of-the-art diagnostic tools and uses genuine parts to ensure your vehicle performs at its best.'
  }];
  const toggleFAQ = (index: number) => {
    setOpenFAQs(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };
  return <div className="w-full bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[30vh] flex items-center" style={{
      backgroundImage: "url('https://img.freepik.com/free-photo/customer-service-representative-working_23-2149069582.jpg')",
      backgroundPosition: 'center'
    }}>
        <div className="absolute inset-0 bg-[#001514] bg-opacity-70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-montserrat">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-white max-w-2xl font-cambria">
            Find answers to common questions about our vehicles and services
          </p>
        </div>
      </section>
      {/* FAQs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
            {faqs.map((faq, index) => <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none" onClick={() => toggleFAQ(index)}>
                  <h3 className="text-lg font-semibold font-montserrat">
                    {faq.question}
                  </h3>
                  {openFAQs.includes(index) ? <ChevronUpIcon className="h-5 w-5 text-[#A3320B]" /> : <ChevronDownIcon className="h-5 w-5 text-[#A3320B]" />}
                </button>
                {openFAQs.includes(index) && <div className="px-6 pb-4 font-cambria">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  </div>}
              </div>)}
          </div>
        </div>
      </section>
      {/* Contact CTA */}
      <section className="py-12 bg-[#001514] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 font-montserrat">
            Still have questions?
          </h2>
          <p className="mb-6 max-w-2xl mx-auto font-cambria">
            Our team is here to help you with any other questions you might have
            about our vehicles or services.
          </p>
          <a href="/contact" className="inline-block bg-[#A3320B] hover:bg-[#6B0504] text-white font-bold py-3 px-6 rounded-lg transition-colors font-cambria">
            Contact Us
          </a>
        </div>
      </section>
    </div>;
};
export default FAQsPage;