const items = [
  "DRIFT MODE",
  "1:10 SCALE",
  "BRUSHLESS POWER",
  "CARBON CHASSIS",
  "PRO TUNED",
  "FREE SHIPPING $150+",
  "2-YEAR WARRANTY",
];

const Marquee = () => {
  return (
    <div className="relative border-y border-border/60 bg-card/30 overflow-hidden py-4">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <div key={i} className="flex items-center gap-8 px-8 font-display text-sm font-bold tracking-[0.3em] text-muted-foreground">
            {t}
            <span className="text-primary">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
