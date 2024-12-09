import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does the QR code tag system work?",
    answer: "When someone scans your pet's QR code tag, they'll instantly see your pet's profile with contact information and important details. This helps them quickly get in touch with you if they find your pet."
  },
  {
    question: "Are the QR code tags waterproof?",
    answer: "Yes! All our tags are made with durable, waterproof materials designed to withstand daily wear and tear, including swimming and rainy weather."
  },
  {
    question: "What information is displayed when someone scans the QR code?",
    answer: "The QR code displays your pet's name, photo, description, and your contact information. You control what information is visible and can update it anytime."
  },
  {
    question: "How do I attach the QR tag to my pet's collar?",
    answer: "Our tags come with secure attachment options for all common collar types. The Basic and Premium tags use a split ring attachment, while the Deluxe Set includes various mounting options."
  },
  {
    question: "Can I update my pet's information after purchasing?",
    answer: "Yes! You can update your pet's profile information anytime by logging into your account. The QR code remains the same, but the displayed information will be updated instantly."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          <button
            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className="font-medium text-gray-900">{faq.question}</span>
            {openIndex === index ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>
          {openIndex === index && (
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}