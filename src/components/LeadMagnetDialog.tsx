import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Gift } from "lucide-react";
import { toast } from "sonner";
import tisane1 from "@/assets/tisane-1.jpeg";
import tisane2 from "@/assets/tisane-2.jpeg";
import tisane3 from "@/assets/tisane-3.jpeg";
import tisane4 from "@/assets/tisane-4.jpeg";
import tisane5 from "@/assets/tisane-5.jpeg";

const STORAGE_KEY = "lead-magnet-dismissed";

export const LeadMagnetDialog = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setOpen(true), 12000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Merci !", {
      description: "Votre guide gratuit arrive dans votre boîte courriel.",
      position: "top-center",
    });
    setEmail("");
    close();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => (o ? setOpen(true) : close())}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="relative bg-primary-soft p-3 grid grid-cols-2 gap-2">
            <img src={tisane5} alt="Recette Tisane Anti-Stress Camomille & Mélisse" loading="lazy" className="col-span-2 w-full h-full object-cover rounded-sm aspect-square" />
            {[tisane1, tisane2, tisane3, tisane4].map((src, i) => (
              <img key={i} src={src} alt={`Aperçu tisane ${i + 1}`} loading="lazy" className="w-full h-full object-cover rounded-sm aspect-square" />
            ))}
          </div>
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <span className="inline-flex items-center gap-1.5 text-xs tracking-[0.25em] uppercase text-primary mb-3">
              <Gift className="h-3.5 w-3.5" /> Cadeau gratuit
            </span>
            <DialogHeader className="text-left space-y-2">
              <DialogTitle className="font-serif text-2xl md:text-3xl text-primary-deep leading-tight">
                Téléchargez mon Guide Gratuit : 5 Tisanes Anti-Stress
              </DialogTitle>
              <DialogDescription className="text-foreground/70 leading-relaxed">
                Apprenez à préparer des infusions apaisantes (Camomille, Mélisse, Lavande...) pour
                calmer votre esprit naturellement.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <Input
                type="email"
                placeholder="Votre adresse courriel"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 bg-background"
              />
              <Button type="submit" size="lg" className="w-full h-11">
                Recevoir mon guide gratuit
              </Button>
            </form>
            <div className="flex flex-wrap gap-4 mt-5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> 100% gratuit</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Désinscription en 1 clic</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
