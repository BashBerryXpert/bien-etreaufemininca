import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import portrait from "@/assets/chantal-portrait.jpg";
import { Quote, Heart, Leaf, Sparkles, Users } from "lucide-react";

const About = () => {
  useEffect(() => {
    document.title = "À propos de Chantal | Bien-être au Féminin";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="bg-hero py-20">
        <div className="container-narrow grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-primary">Naturopathe & Herboriste</span>
            <h1 className="font-serif text-4xl md:text-5xl mt-3 text-primary-deep text-balance">
              Chantal
            </h1>
            <p className="mt-5 text-lg text-foreground/75 italic font-serif">
              « Maman, grand-maman et passionnée des richesses de la nature, je vous accompagne avec
              tendresse vers une santé globale et naturelle. »
            </p>
          </div>
          <img
            src={portrait}
            alt="Chantal, naturopathe et herboriste"
            loading="lazy"
            className="rounded-sm shadow-elegant w-full max-w-sm h-[460px] object-cover mx-auto"
          />
        </div>
      </section>

      <section className="container-narrow py-20 max-w-3xl">
        <div className="prose prose-lg max-w-none">
          <h2 className="font-serif text-3xl text-primary-deep">Mon histoire</h2>
          <p className="text-foreground/80 leading-relaxed">
            Maman de quatre enfants et aujourd'hui grand-maman, j'ai consacré ma vie à soigner ma
            famille avec les richesses de la nature. Ce qui était d'abord une pratique personnelle
            est devenu une vocation : je me suis formée en naturopathie et en herboristerie pour
            approfondir ce savoir.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            Aujourd'hui, dans la cinquantaine, je traverse la ménopause avec sérénité grâce à ces
            outils naturels. Mon souhait est de partager ces solutions douces et éprouvées avec
            vous, peu importe votre étape de vie.
          </p>

          <div className="my-12 p-8 bg-accent-soft rounded-sm relative">
            <Quote className="h-8 w-8 text-primary absolute -top-4 left-8 bg-background p-1 rounded-full" />
            <p className="font-serif text-xl text-primary-deep italic">
              Vous n'êtes pas seule. Et surtout, vous n'êtes pas brisée. Votre corps suit simplement
              une nouvelle saison.
            </p>
          </div>

          <h2 className="font-serif text-3xl text-primary-deep">Ma promesse</h2>
          <p className="text-foreground/80 leading-relaxed">
            Une approche éducative, accessible et profondément rassurante. Pas de promesses
            miraculeuses — uniquement des outils concrets, validés par la tradition et la
            naturopathie, faciles à intégrer dans votre quotidien.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mt-14">
          {[
            { icon: Leaf, title: "Naturopathie", desc: "Une science ancienne au service de votre équilibre." },
            { icon: Sparkles, title: "Herboristerie", desc: "Le pouvoir des plantes, transmis simplement." },
            { icon: Users, title: "Toutes les femmes", desc: "Quelle que soit votre étape de vie." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-card rounded-sm p-6 shadow-card-soft text-center">
              <Icon className="h-6 w-6 text-primary mx-auto mb-3" />
              <h3 className="font-serif text-lg mb-2 text-primary-deep">{title}</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button asChild size="lg">
            <Link to="/guides"><Heart className="h-4 w-4 mr-2" /> Découvrir mes guides</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
