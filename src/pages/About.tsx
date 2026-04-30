import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import portrait from "@/assets/chantal-portrait.jpg";
import { Quote, Heart } from "lucide-react";

const About = () => {
  useEffect(() => {
    document.title = "À propos de Chantal Brisson | Bien-être au Féminin";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="bg-hero py-20">
        <div className="container-narrow grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-primary">Votre mentor en bien-être</span>
            <h1 className="font-serif text-4xl md:text-5xl mt-3 text-primary-deep text-balance">
              Chantal Brisson
            </h1>
            <p className="mt-5 text-lg text-foreground/75 italic font-serif">
              « Une grande sœur bienveillante qui vous accompagne, sans jugement, vers votre meilleure version. »
            </p>
          </div>
          <img src={portrait} alt="Chantal Brisson" loading="lazy" className="rounded-sm shadow-elegant w-full max-w-sm h-[460px] object-cover mx-auto" />
        </div>
      </section>

      <section className="container-narrow py-20 max-w-3xl">
        <div className="prose prose-lg max-w-none">
          <h2 className="font-serif text-3xl text-primary-deep">Mon histoire</h2>
          <p className="text-foreground/80 leading-relaxed">
            Il y a plus de quinze ans, j'ai traversé moi-même les bouleversements de la périménopause.
            Comme tant de femmes, je cherchais des réponses claires, sans alarmisme, sans jargon
            médical. J'ai fait le constat qu'il existait un immense vide d'information bienveillante
            pour les femmes du Québec.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            J'ai donc consacré ma vie professionnelle à combler ce manque : étudier, vulgariser,
            accompagner. Aujourd'hui, des milliers de Québécoises me font confiance pour les guider
            vers un mieux-être hormonal naturel.
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
            miraculeuses, pas de pression commerciale — uniquement des outils concrets, validés et
            faciles à intégrer dans votre quotidien.
          </p>
        </div>

        <div className="mt-12 text-center">
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
