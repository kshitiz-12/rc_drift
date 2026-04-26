import { Instagram, Twitter, Youtube, Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-border/60 bg-card/40">
      <div className="container mx-auto py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-brand">
                <Zap className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <span className="font-display text-xl font-bold tracking-widest">RC <span className="text-gradient-brand">DRIFT CARS</span></span>
            </a>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              Premium RC drift cars engineered for drivers who never lift. Built in Tokyo. Drifted everywhere.
            </p>
            <div className="flex gap-3 mt-6">
              {[Instagram, Youtube, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-lg glass border border-border/60 hover:border-primary/50 hover:text-primary-glow transition-drift">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Shop", links: ["Drift Series", "Pro Builds", "Beginner", "Accessories"] },
            { title: "Support", links: ["Contact", "Warranty", "Shipping", "Returns"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-bold text-sm tracking-widest uppercase mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary-glow transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} RC Drift Cars. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
