import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Minus, Plus, Trash2, ExternalLink, Loader2, Heart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";

export const CartDrawer = () => {
  const { items, isLoading, isSyncing, isOpen, setOpen, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode ?? "CAD";

  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      setOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-primary-soft" aria-label="Panier">
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full bg-background">
        <SheetHeader className="flex-shrink-0 text-left">
          <SheetTitle className="font-serif text-2xl">Votre panier</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Votre panier est vide pour l'instant." : `${totalItems} article${totalItems > 1 ? "s" : ""} prêt${totalItems > 1 ? "s" : ""} pour vous`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center px-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-soft flex items-center justify-center">
                  <Heart className="h-7 w-7 text-primary" />
                </div>
                <p className="text-muted-foreground font-serif text-lg">Prenez soin de vous</p>
                <p className="text-sm text-muted-foreground mt-2">Découvrez nos guides d'accompagnement.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0 space-y-5">
                {items.map((item) => (
                  <div key={item.variantId} className="flex gap-4 pb-5 border-b border-border last:border-0">
                    <div className="w-20 h-24 bg-secondary rounded-sm overflow-hidden flex-shrink-0">
                      {item.product.node.images?.edges?.[0]?.node && (
                        <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-base leading-tight pr-2">{item.product.node.title}</h4>
                      {item.selectedOptions.length > 0 && item.selectedOptions[0].value !== "Default Title" && (
                        <p className="text-xs text-muted-foreground mt-1">{item.selectedOptions.map((o) => o.value).join(" • ")}</p>
                      )}
                      <p className="font-medium mt-2 text-primary-deep">{formatPrice(item.price.amount, item.price.currencyCode)}</p>
                      <div className="flex items-center gap-1 mt-3">
                        <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7 self-start" onClick={() => removeItem(item.variantId)}>
                      <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex-shrink-0 space-y-4 pt-5 border-t border-border bg-background">
                <div className="rounded-sm bg-accent-soft px-4 py-3 text-xs text-foreground/80 flex gap-2 items-start">
                  <Heart className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Téléchargement immédiat de vos guides après le paiement sécurisé.</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-serif text-lg">Sous-total</span>
                  <span className="font-serif text-2xl text-primary-deep">{formatPrice(totalPrice, currency)}</span>
                </div>
                <Button onClick={handleCheckout} className="w-full h-12" size="lg" disabled={items.length === 0 || isLoading || isSyncing}>
                  {isLoading || isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                    <>Passer à la caisse sécurisée<ExternalLink className="w-4 h-4 ml-2" /></>
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground">Paiement sécurisé · Shop Pay · Visa · Mastercard</p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
