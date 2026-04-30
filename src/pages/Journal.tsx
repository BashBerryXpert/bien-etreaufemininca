import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookOpen } from "lucide-react";

const Journal = () => {
  useEffect(() => {
    document.title = "Le Journal du Bien-être | Bien-être au Féminin";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="bg-hero py-20">
        <div className="container-narrow text-center max-w-2xl">
          <span className="text-xs tracking-[0.3em] uppercase text-primary">Le Journal</span>
          <h1 className="font-serif text-4xl md:text-5xl mt-3 text-primary-deep text-balance">
            Le Journal du Bien-être
          </h1>
          <p className="mt-5 text-foreground/75 leading-relaxed">
            Articles, conseils et témoignages bienveillants pour vous accompagner au quotidien.
          </p>
        </div>
      </section>

      <section className="container-narrow py-20 text-center">
        <BookOpen className="h-12 w-12 text-primary/40 mx-auto mb-5" />
        <p className="font-serif text-xl text-primary-deep">Nos premiers articles arrivent bientôt.</p>
        <p className="mt-2 text-muted-foreground text-sm">Inscrivez-vous à notre infolettre pour ne rien manquer.</p>
      </section>

      <Footer />
    </div>
  );
};

export default Journal;
