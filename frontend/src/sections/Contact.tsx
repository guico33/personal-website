import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Github,
  Linkedin,
  CheckCircle,
  Mail,
  MessageSquare,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { BlurFade } from '../components/magicui/blur-fade';
import { motion, AnimatePresence } from 'motion/react';
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
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null); // Clear any previous errors
    try {
      const response = await fetch(
        import.meta.env.VITE_CONTACT_ENDPOINT ||
          'https://pb59ivxrui.execute-api.eu-west-3.amazonaws.com/prod/contact',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setIsSubmitted(true);
      reset();

      // Show form again after 10 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 10000);
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again or contact me directly via email.',
      );
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-24 bg-yellow-50/50">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <BlurFade delay={0.05} inView>
          <div className="mb-16 text-center">
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
              Get In Touch
            </h2>
            <div className="w-16 h-px bg-sage-300 mt-4 mx-auto"></div>
            <p className="text-lg text-gray-700 font-light mt-6 max-w-2xl mx-auto">
              Interested in working together? Let's discuss your project requirements.
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

          </div>

          {/* Right Column - Contact Form */}
          <div>
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-stone-200 bg-gradient-to-br from-white/40 to-blue-50/30">
                    <CardContent className="p-8">
                      <h3 className="text-xl font-light text-gray-900 mb-6">Send a Message</h3>

                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" role="form" aria-label="Contact form">
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
                            aria-required="true"
                            aria-invalid={errors.name ? 'true' : 'false'}
                            aria-describedby={errors.name ? 'name-error' : undefined}
                            onChange={(e) => {
                              register('name').onChange(e);
                              if (submitError) setSubmitError(null);
                            }}
                          />
                          {errors.name && (
                            <p id="name-error" className="mt-2 text-sm text-red-600" role="alert">{errors.name.message}</p>
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
                            aria-required="true"
                            aria-invalid={errors.email ? 'true' : 'false'}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                            onChange={(e) => {
                              register('email').onChange(e);
                              if (submitError) setSubmitError(null);
                            }}
                          />
                          {errors.email && (
                            <p id="email-error" className="mt-2 text-sm text-red-600" role="alert">{errors.email.message}</p>
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
                            aria-required="true"
                            aria-invalid={errors.message ? 'true' : 'false'}
                            aria-describedby={errors.message ? 'message-error' : undefined}
                            onChange={(e) => {
                              register('message').onChange(e);
                              if (submitError) setSubmitError(null);
                            }}
                          />
                          {errors.message && (
                            <p id="message-error" className="mt-2 text-sm text-red-600" role="alert">{errors.message.message}</p>
                          )}
                        </div>

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gray-900 hover:bg-gray-700 text-white py-3 cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-sage-400"
                          aria-describedby="submit-status"
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                        
                        {/* Screen reader status */}
                        <div id="submit-status" className="sr-only" aria-live="polite">
                          {isSubmitting ? 'Sending your message...' : ''}
                        </div>

                        {/* Error Message */}
                        <AnimatePresence>
                          {submitError && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="flex items-start gap-3 p-4 bg-gradient-to-r from-red-50/50 to-orange-50/50 border border-red-200/50 rounded-lg"
                            >
                              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <AlertCircle className="w-4 h-4 text-red-600" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-red-800 mb-1">
                                  Unable to Send Message
                                </h4>
                                <p className="text-sm text-red-700 leading-relaxed">
                                  {submitError}
                                </p>
                              </div>
                              <button
                                onClick={() => setSubmitError(null)}
                                className="text-red-400 hover:text-red-600 transition-colors p-2 rounded hover:bg-red-50 flex-shrink-0"
                                aria-label="Close error message"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-stone-200 bg-gradient-to-br from-white/40 to-blue-50/30">
                    <CardContent className="p-8">
                      <div className="space-y-8">
                        {/* Success Header */}
                        <div className="text-center space-y-4">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                            className="w-16 h-16 bg-gradient-to-br from-sage-100 to-sage-200 rounded-full flex items-center justify-center mx-auto"
                          >
                            <CheckCircle className="w-8 h-8 text-sage-600" />
                          </motion.div>
                          <div>
                            <h3 className="text-2xl font-light text-gray-900">Message Sent!</h3>
                            <p className="text-stone-600 leading-relaxed mt-2">
                              Thank you for reaching out. Your message has been successfully
                              delivered.
                            </p>
                          </div>
                        </div>

                        {/* Success Details */}
                        <div className="space-y-6">
                          <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-sage-50/50 to-blue-50/50 rounded-lg border border-sage-100/50">
                            <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <Mail className="w-5 h-5 text-sage-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-1">Email Notification</h4>
                              <p className="text-sm text-stone-600 leading-relaxed">
                                I've received your message and will review it shortly. You'll hear
                                back from me soon.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-sage-50/50 to-blue-50/50 rounded-lg border border-sage-100/50">
                            <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <Clock className="w-5 h-5 text-sage-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-1">Response Time</h4>
                              <p className="text-sm text-stone-600 leading-relaxed">
                                Typically within 24 hours. For urgent matters, feel free to reach
                                out via WhatsApp/Telegram.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-sage-50/50 to-blue-50/50 rounded-lg border border-sage-100/50">
                            <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <MessageSquare className="w-5 h-5 text-sage-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-1">Next Steps</h4>
                              <p className="text-sm text-stone-600 leading-relaxed">
                                I'll get back to you with a detailed response and, if needed, we can
                                schedule a call to discuss your project further.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Return to form button */}
                        <div className="pt-4 border-t border-stone-200/50">
                          <Button
                            onClick={() => setIsSubmitted(false)}
                            variant="outline"
                            className="w-full border-stone-200 bg-white/60 hover:bg-white hover:border-sage-300 text-stone-700 hover:text-gray-900 hover:shadow-sm cursor-pointer transition-all duration-200"
                          >
                            Send Another Message
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
