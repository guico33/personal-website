import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Github, Linkedin } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { BlurFade } from '../components/magicui/blur-fade';
import { personalInfo } from '../data/portfolio';

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate form submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log('Form data:', data);
    setIsSubmitted(true);
    reset();

    // Show form again after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact" className="py-24 bg-yellow-50">
      <div className="w-full max-w-6xl mx-auto px-8">
        {/* Section Header */}
        <BlurFade delay={0.25} inView>
          <div className="mb-16 text-center">
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
              Get In Touch
            </h2>
            <div className="w-16 h-px bg-sage-300 mt-4 mx-auto"></div>
            <p className="text-lg text-gray-700 font-light mt-6 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss how we can work together to create
              something exceptional.
            </p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-end">
          {/* Left Column - Contact Information */}
          <div className="flex flex-col h-full">
            {/* Contact Details */}
            <div className="flex-1 space-y-8">
              <div>
                <h3 className="text-xl font-light text-gray-900 mb-6">Contact Information</h3>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <div className="w-2 h-2 bg-sage-400 rounded-full"></div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-stone-600 uppercase tracking-wider mb-1">
                        Email
                      </div>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="text-gray-900 hover:text-sage-600 transition-colors"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  {/* Phone (France) */}
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <div className="w-2 h-2 bg-sage-400 rounded-full"></div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-stone-600 uppercase tracking-wider mb-1">
                        Phone (France)
                      </div>
                      <a
                        href={`tel:${personalInfo.phone}`}
                        className="text-gray-900 hover:text-sage-600 transition-colors"
                      >
                        {personalInfo.phone}
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp/Telegram */}
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <div className="w-2 h-2 bg-sage-400 rounded-full"></div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-stone-600 uppercase tracking-wider mb-1">
                        WhatsApp / Telegram
                      </div>
                      <a
                        href={`https://wa.me/${personalInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-900 hover:text-sage-600 transition-colors"
                      >
                        {personalInfo.whatsapp}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <div className="w-2 h-2 bg-sage-400 rounded-full"></div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-stone-600 uppercase tracking-wider mb-1">
                        Location
                      </div>
                      <div className="text-gray-900">France</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-light text-gray-900 mb-6">Connect</h3>
                <div className="flex gap-6">
                  <a
                    href={`https://${personalInfo.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-stone-600 hover:text-sage-600 transition-colors font-light"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                  <a
                    href={`https://${personalInfo.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-stone-600 hover:text-sage-600 transition-colors font-light"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Response Time Note - positioned at bottom */}
            <Card className="border-stone-200 bg-gradient-to-br from-white/40 to-blue-50/30 mt-8">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Response Time</h4>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    I typically respond to inquiries within 24 hours. For urgent matters, feel free
                    to reach out via WhatsApp/Telegram.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            {!isSubmitted ? (
              <Card className="border-stone-200 bg-gradient-to-br from-white/50 to-sage-50/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-light text-gray-900 mb-6">Send a Message</h3>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-900 mb-2"
                      >
                        Name
                      </label>
                      <input
                        {...register('name')}
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 border border-stone-200 rounded-lg bg-white/60 text-gray-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-sage-400/50 focus:border-sage-300 transition-all"
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-900 mb-2"
                      >
                        Email
                      </label>
                      <input
                        {...register('email')}
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 border border-stone-200 rounded-lg bg-white/60 text-gray-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-sage-400/50 focus:border-sage-300 transition-all"
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-900 mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        {...register('message')}
                        id="message"
                        rows={5}
                        className="w-full px-4 py-3 border border-stone-200 rounded-lg bg-white/60 text-gray-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-transparent transition-all resize-vertical"
                        placeholder="Tell me about your project, ideas, or how we can work together..."
                      />
                      {errors.message && (
                        <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gray-900 hover:bg-gray-700 text-white py-3 cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              // Thank You Message
              <Card className="border-sage-200 bg-sage-50/50">
                <CardContent className="p-8 text-center">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mx-auto">
                      <div className="w-6 h-6 text-sage-600">✓</div>
                    </div>
                    <h3 className="text-xl font-light text-gray-900">Thank You!</h3>
                    <p className="text-stone-600 leading-relaxed">
                      Your message has been received. I'll get back to you within 24 hours.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
