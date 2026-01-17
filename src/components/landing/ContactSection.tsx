import { motion } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Youtube
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Téléphone",
    value: "+241 01 44 XX XX",
    subValue: "Lun - Ven, 8h - 17h"
  },
  {
    icon: Mail,
    title: "Email",
    value: "contact@conseil-gabon.ga",
    subValue: "Réponse sous 24h"
  },
  {
    icon: MapPin,
    title: "Adresse",
    value: "Boulevard Triomphal",
    subValue: "Libreville, Gabon"
  },
  {
    icon: Clock,
    title: "Horaires",
    value: "Lun - Ven",
    subValue: "8h00 - 17h00"
  }
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" }
];

const ContactSection = () => {
  return (
    <section className="py-12 bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <info.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{info.title}</h4>
                <p className="text-foreground">{info.value}</p>
                <p className="text-sm text-muted-foreground">{info.subValue}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground text-center md:text-right">
            © 2026 Direction Générale de la Décentralisation - République Gabonaise
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
