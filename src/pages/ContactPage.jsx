import { MapPin, Mail, Phone, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactPage = () => {
    return (
        <div className="bg-slate-50 min-h-screen py-24 relative overflow-hidden">
            {/* Ambient Backgrounds */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-200 rounded-full blur-[150px] opacity-40 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-200 rounded-full blur-[150px] opacity-30 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-primary-50 text-primary-600 font-bold text-sm tracking-wider uppercase mb-4 border border-primary-100 shadow-sm">Get in Touch</span>
                    <h1 className="text-5xl font-black text-slate-900 mb-6 drop-shadow-sm">Contact Us</h1>
                    <p className="text-xl text-slate-500 text-center max-w-2xl mx-auto font-medium leading-relaxed">
                        Have questions or need assistance? Our team is always ready to help you optimize your farm's potential.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 rounded-3xl shadow-2xl p-8 lg:p-12 text-white flex flex-col justify-center relative overflow-hidden h-full"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full blur-[80px] opacity-40 transform translate-x-1/3 -translate-y-1/3"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[80px] opacity-30 transform -translate-x-1/3 translate-y-1/3"></div>

                        <h2 className="text-3xl font-black mb-10 relative z-10 tracking-tight">Contact Information</h2>

                        <div className="space-y-8 relative z-10 flex-grow">
                            <motion.div whileHover={{ x: 5 }} className="flex items-start gap-5 group cursor-pointer">
                                <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-primary-500/40 transition-colors border border-white/10">
                                    <MapPin className="h-6 w-6 text-primary-300 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Our Office</h3>
                                    <p className="text-slate-300 mt-1 leading-relaxed">Shani Mandir Chowk,Khandwa M.P.<br /> India 450001</p>
                                </div>
                            </motion.div>

                            <motion.div whileHover={{ x: 5 }} className="flex items-start gap-5 group cursor-pointer">
                                <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-primary-500/40 transition-colors border border-white/10">
                                    <Phone className="h-6 w-6 text-primary-300 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Phone</h3>
                                    <p className="text-slate-300 mt-1">+91 9165814637</p>
                                    <p className="text-slate-400 text-sm mt-1">Mon-Sat 9am to 6pm</p>
                                </div>
                            </motion.div>

                            <motion.div whileHover={{ x: 5 }} className="flex items-start gap-5 group cursor-pointer">
                                <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-primary-500/40 transition-colors border border-white/10">
                                    <Mail className="h-6 w-6 text-primary-300 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Email Address</h3>
                                    <p className="text-slate-300 mt-1">support@krashiai.com</p>
                                    <p className="text-slate-300">info@krashiai.com</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-7 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 lg:p-12 border border-white relative"
                    >
                        <h2 className="text-3xl font-black text-slate-900 mb-8">Send us a message</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                                    <input type="text" id="firstName" className="block w-full rounded-2xl border-0 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-primary-500 bg-slate-50/50 py-4 px-4 text-slate-900 transition-shadow" placeholder="John" />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                                    <input type="text" id="lastName" className="block w-full rounded-2xl border-0 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-primary-500 bg-slate-50/50 py-4 px-4 text-slate-900 transition-shadow" placeholder="Doe" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                <input type="email" id="email" className="block w-full rounded-2xl border-0 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-primary-500 bg-slate-50/50 py-4 px-4 text-slate-900 transition-shadow" placeholder="john@example.com" />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                                <textarea id="message" rows={5} className="block w-full rounded-2xl border-0 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-primary-500 bg-slate-50/50 py-4 px-4 text-slate-900 transition-shadow resize-none" placeholder="How can we help you?"></textarea>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-full shadow-lg shadow-primary-500/30 text-lg font-black text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 focus:outline-none transition-all mt-4"
                            >
                                Send Message <Send className="h-5 w-5" />
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
