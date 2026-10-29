import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function ContactInfoSection() {
  const { contact, social } = siteConfig;

  return (
    <section
      className="section-padding bg-navy-900"
      aria-labelledby="contact-info-heading"
    >
      <div className="container-max">
        <div className="text-center mb-12">
          <span className="inline-block rounded-full bg-teal-500/20 border border-teal-400/30 px-4 py-1.5 text-sm font-semibold text-teal-300 mb-4">
            Contact Details
          </span>
          <h2 id="contact-info-heading" className="text-3xl font-bold text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-navy-200">
            Reach us by phone, email, or WhatsApp. We are here to answer your
            questions and help you explore financial options.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
          <a
            href={`tel:${contact.phone}`}
            className="flex items-start gap-4 rounded-xl bg-navy-800 border border-navy-700 p-5 hover:border-teal-500 transition-colors group"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-500/20">
              <Phone className="h-5 w-5 text-blue-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs text-navy-400 mb-1">Phone (Tap to call)</p>
              <p className="font-semibold text-white group-hover:text-teal-300 transition-colors">
                {contact.phone}
              </p>
            </div>
          </a>

          <a
            href={social.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 rounded-xl bg-navy-800 border border-navy-700 p-5 hover:border-teal-500 transition-colors group"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-green-500/20">
              <MessageCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs text-navy-400 mb-1">WhatsApp</p>
              <p className="font-semibold text-white group-hover:text-teal-300 transition-colors">
                {contact.whatsapp}
              </p>
            </div>
          </a>

          <a
            href={`mailto:${contact.email}`}
            className="flex items-start gap-4 rounded-xl bg-navy-800 border border-navy-700 p-5 hover:border-teal-500 transition-colors group"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-500/20">
              <Mail className="h-5 w-5 text-teal-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs text-navy-400 mb-1">Email</p>
              <p className="font-semibold text-white group-hover:text-teal-300 transition-colors break-all">
                {contact.email}
              </p>
            </div>
          </a>

          <div className="flex items-start gap-4 rounded-xl bg-navy-800 border border-navy-700 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-amber-500/20">
              <MapPin className="h-5 w-5 text-amber-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs text-navy-400 mb-1">Address</p>
              <p className="font-semibold text-white">{contact.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl bg-navy-800 border border-navy-700 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-purple-500/20">
              <Clock className="h-5 w-5 text-purple-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs text-navy-400 mb-1">Business Hours</p>
              <p className="font-semibold text-white">{contact.hours}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
