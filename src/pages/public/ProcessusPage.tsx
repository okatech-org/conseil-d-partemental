import { motion } from "framer-motion";
import { GitBranch, CheckCircle, Clock, Users, FileText, Vote, Megaphone, ChevronDown } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { InstitutionSubHeader } from "@/components/layout/InstitutionSubHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const processSteps = [
  {
    id: 1,
    title: "Proposition",
    description: "Un élu ou le président soumet une proposition de délibération",
    icon: FileText,
    color: "bg-blue-500",
    actors: ["Président", "Vice-présidents", "Conseillers départementaux"],
    duration: "Variable",
    details: "La proposition peut émaner du président, d'un vice-président dans son domaine de compétence, ou d'un groupe de conseillers départementaux. Elle doit être accompagnée d'un exposé des motifs et d'un projet de délibération."
  },
  {
    id: 2,
    title: "Commission thématique",
    description: "Examen en commission spécialisée (social, routes, finances...)",
    icon: Users,
    color: "bg-purple-500",
    actors: ["Membres de la commission", "Experts techniques", "Services départementaux"],
    duration: "1-3 semaines",
    details: "La commission concernée étudie le dossier, auditionne les parties prenantes si nécessaire, et émet un avis motivé. Elle peut proposer des amendements au projet initial."
  },
  {
    id: 3,
    title: "Commission permanente",
    description: "Validation par la commission permanente pour les dossiers courants",
    icon: CheckCircle,
    color: "bg-green-500",
    actors: ["Président", "Vice-présidents", "Membres de la commission permanente"],
    duration: "Session mensuelle",
    details: "La commission permanente, composée du président et des vice-présidents, peut adopter certaines délibérations par délégation de l'assemblée plénière. Elle traite les dossiers ne nécessitant pas de vote en séance plénière."
  },
  {
    id: 4,
    title: "Assemblée plénière",
    description: "Débat et vote en séance publique de l'assemblée départementale",
    icon: Vote,
    color: "bg-orange-500",
    actors: ["Tous les conseillers départementaux", "Président de séance"],
    duration: "Sessions trimestrielles",
    details: "L'assemblée plénière réunit tous les conseillers départementaux. Les débats sont publics. Chaque délibération fait l'objet d'un vote à la majorité simple des suffrages exprimés, sauf cas particuliers."
  },
  {
    id: 5,
    title: "Adoption/Rejet",
    description: "Décision finale : la délibération est adoptée ou rejetée",
    icon: CheckCircle,
    color: "bg-emerald-500",
    actors: ["Secrétariat de l'assemblée"],
    duration: "Immédiat",
    details: "Le résultat du vote est proclamé en séance. En cas d'adoption, la délibération est signée par le président. En cas de rejet, le dossier peut être modifié et représenté ultérieurement."
  },
  {
    id: 6,
    title: "Publication",
    description: "Transmission au contrôle de légalité et publication officielle",
    icon: Megaphone,
    color: "bg-sky-500",
    actors: ["Services juridiques", "Préfecture"],
    duration: "15 jours",
    details: "La délibération est transmise au représentant de l'État pour contrôle de légalité. Elle devient exécutoire après cette transmission et affichage ou publication. Elle est également mise en ligne sur le site du Département."
  },
];

const faqs = [
  {
    question: "Qui peut assister aux séances de l'assemblée départementale ?",
    answer: "Les séances de l'assemblée départementale sont publiques. Tout citoyen peut y assister dans la limite des places disponibles. Il suffit de se présenter à l'accueil de l'Hôtel du Département le jour de la séance."
  },
  {
    question: "Comment sont élus les conseillers départementaux ?",
    answer: "Les conseillers départementaux sont élus au suffrage universel direct pour 6 ans. Chaque canton élit un binôme paritaire (une femme et un homme). Le scrutin est majoritaire à deux tours."
  },
  {
    question: "Quelle est la différence entre commission permanente et assemblée plénière ?",
    answer: "L'assemblée plénière réunit tous les conseillers et vote les grandes orientations et le budget. La commission permanente, plus restreinte, traite les dossiers courants par délégation et se réunit plus fréquemment."
  },
  {
    question: "Combien de temps dure le processus complet ?",
    answer: "En moyenne, une délibération simple prend 1 à 2 mois entre la proposition et la publication. Les dossiers complexes ou nécessitant une concertation peuvent prendre plusieurs mois."
  },
  {
    question: "Peut-on proposer un projet citoyen ?",
    answer: "Les citoyens peuvent adresser des pétitions ou suggestions aux élus. Certains départements ont mis en place des dispositifs de participation citoyenne permettant de soumettre des projets."
  },
];

export const ProcessusPage = () => {
  return (
    <PublicLayout>
      <InstitutionSubHeader 
        icon={GitBranch}
        title="Processus"
        description="Découvrez le parcours d'une délibération, de la proposition à la publication"
      />

      <div className="container mx-auto px-4 py-12">
        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold font-serif mb-8 text-center">
            Le parcours d'une délibération
          </h2>
          
          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
            
            <div className="space-y-8 md:space-y-0">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className={`relative md:flex ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <Card className="inline-block w-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className={`flex items-center gap-3 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                          <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center flex-shrink-0`}>
                            <step.icon className="h-6 w-6 text-white" />
                          </div>
                          <div className={index % 2 === 0 ? 'md:text-right' : ''}>
                            <Badge variant="outline" className="mb-1">Étape {step.id}</Badge>
                            <CardTitle className="text-xl">{step.title}</CardTitle>
                          </div>
                        </div>
                        <CardDescription className="text-base mt-3">
                          {step.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{step.details}</p>
                        <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {step.duration}
                          </Badge>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {step.actors.length} acteurs
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Center dot */}
                  <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 w-6 h-6 rounded-full border-4 border-background z-10" 
                       style={{ backgroundColor: step.color.replace('bg-', '').includes('-') ? '' : '' }}>
                    <div className={`w-full h-full rounded-full ${step.color}`} />
                  </div>
                  
                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Process Cards */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold font-serif mb-8">Détail des étapes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center mb-4`}>
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">#{step.id}</span>
                      {step.title}
                    </CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Acteurs concernés</p>
                        <div className="flex flex-wrap gap-1">
                          {step.actors.map((actor, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {actor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Durée indicative</p>
                        <Badge variant="secondary">{step.duration}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-bold font-serif mb-8">Questions fréquentes</h2>
          <Card>
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="px-6 hover:no-underline hover:bg-muted/50">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
};
