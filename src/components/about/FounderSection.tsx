import Image from "next/image";
import { User } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function FounderSection() {
  const { founder } = siteConfig;

  return (
    <section
      className="section-padding bg-white"
      aria-labelledby="founder-heading"
    >
      <div className="container-max">
        <div className="text-center mb-12">
          <span className="section-tag">Our Founder</span>
          <h2 id="founder-heading" className="section-title">
            Meet {founder.name}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Photo */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="h-72 w-72 rounded-2xl overflow-hidden bg-gray-100 border-4 border-navy-100 shadow-xl">
                {/* Try to load founder photo; show placeholder if not available */}
                <div className="relative h-full w-full">
                  <div className="absolute inset-0 flex items-center justify-center bg-navy-50">
                    <div className="text-center">
                      <User className="h-24 w-24 text-navy-300 mx-auto mb-3" aria-hidden="true" />
                      <p className="text-sm text-navy-400 font-medium">{founder.name}</p>
                      <p className="text-xs text-navy-300">{founder.designation}</p>
                      <p className="text-xs text-gray-400 mt-2 max-w-[200px]">
                        Replace this placeholder with the actual founder photograph.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative element */}
              <div
                className="absolute -bottom-4 -right-4 h-20 w-20 rounded-2xl bg-teal-500 opacity-20"
                aria-hidden="true"
              />
              <div
                className="absolute -top-4 -left-4 h-12 w-12 rounded-xl bg-navy-700 opacity-20"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-2xl font-bold text-navy-900 mb-1">{founder.name}</h3>
            <p className="text-teal-600 font-semibold mb-5">{founder.designation}</p>
            <div className="space-y-4">
              {founder.bio.split("\n\n").map((para, i) => (
                <p key={i} className="text-gray-700 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
            <div className="mt-6 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
              <p className="text-xs text-amber-700">
                <strong>Note:</strong> The biography above is a placeholder. Please replace it with
                {" "}Madhu Modi's actual professional background, qualifications, experience, and
                personal vision before publishing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
