import { useEffect, useState } from "react";

/**
 * PowerBalance.tsx — animated horizontal stacked bar for the 3 factions.
 * Numbers are editable constants; on mount they animate from 0 to target.
 */
const FACTIONS = [
  { name: "Phe Hoàng Quan", value: 38, fill: "var(--primary)", desc: "Bảo vệ trật tự hiện tại" },
  { name: "Phe Tranh Cung", value: 45, fill: "var(--accent)", desc: "Đại + Tam Hoàng Tử đối đầu" },
  { name: "Phe Trung Lập / Giang Hồ", value: 17, fill: "var(--muted-foreground)", desc: "Chờ đặt cược phút cuối" }
];

export default function PowerBalance() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(function tick(t: number) {
      const start = performance.now();
      const dur = 1400;
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        setProgress(p);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex h-7 w-full overflow-hidden rounded-sm border border-border">
        {FACTIONS.map((f) => (
          <div
            key={f.name}
            className="relative h-full transition-all duration-1000 ease-out"
            style={{
              width: `${f.value * progress}%`,
              background: f.fill,
              boxShadow: "inset 0 0 12px rgba(0,0,0,.18)"
            }}
            title={`${f.name}: ${f.value}%`}
          />
        ))}
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {FACTIONS.map((f) => (
          <div key={f.name} className="border border-border rounded p-4 bg-card">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full" style={{ background: f.fill }} />
              <span className="font-serif font-semibold">{f.name}</span>
            </div>
            <div className="text-3xl font-serif font-bold text-primary tabular-nums">
              {Math.round(f.value * progress)}%
            </div>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground italic text-center">
        Cập nhật sau arc "Huyền Minh năm thứ 32 · Chương IV: Bão Tố Vạn Lý". Ban Quản Lý sẽ điều chỉnh sau mỗi sự kiện lớn.
      </p>
    </div>
  );
}
