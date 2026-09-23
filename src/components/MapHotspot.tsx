import { useState } from "react";

const HOTSPOTS = [
  {
    id: "canthanh",
    name: "Càn Thanh Điện",
    x: 50,
    y: 35,
    desc: "Điện thờ chính, nơi Hoàng đế thiên triều. Hôm nay long nhan u ám, quần thần thở không nổi."
  },
  {
    id: "haucung",
    name: "Hậu Cung · Hựu Uyển",
    x: 30,
    y: 60,
    desc: "Nơi Phi tần tranh sủng. Hoa điểu thanh, dao kiếm lặng. Một lá thư rơi trước cửa Đức Phi lúc nửa đêm."
  },
  {
    id: "thaiy",
    name: "Thái Y Viện",
    x: 70,
    y: 55,
    desc: "Đầy mùi thuốc và độc dược. Chưởng viện Châu Minh Nguyệt ngày đêm bào chế phương thuốc cứu long thể."
  },
  {
    id: "tinhxa",
    name: "Tinh Xá Tử Vi",
    x: 45,
    y: 75,
    desc: "Khâm Thiên Giám quan sát tinh tú. Đêm qua sao Chổi lại hiện về hướng Tây."
  },
  {
    id: "tieucuc",
    name: "Tiêu Cục (Ngầm)",
    x: 18,
    y: 45,
    desc: "Cơ sở tình báo bí mật của Hoàng đế. Không ai biết cửa vào — kẻ vào không phải lúc nào cũng ra."
  },
  {
    id: "tuulau",
    name: "Tửu Lầu Phồn Hoa",
    x: 82,
    y: 70,
    desc: "Nơi gió trăng công khai, rượu mới tin cũ. Giang hồ gặp triều đình — đều phải qua chốn này."
  }
];

export default function MapHotspot() {
  const [active, setActive] = useState<(typeof HOTSPOTS)[number] | null>(null);

  return (
    <div className="relative">
      <div className="relative aspect-[16/10] rounded overflow-hidden border border-border bg-card">
        <img
          src="https://assets.kleap.io/102911/images/1790162702558-hoang-thanh-map"
          alt="Bản đồ Hoàng Thành"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 to-background/40" />

        {HOTSPOTS.map((h) => (
          <button
            key={h.id}
            onMouseEnter={() => setActive(h)}
            onClick={() => setActive(h)}
            onMouseLeave={() => setActive((cur) => (cur?.id === h.id ? null : cur))}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
            aria-label={h.name}
          >
            <span className="relative grid place-items-center w-9 h-9 rounded-full bg-primary text-primary-foreground border-2 border-accent shadow-lg animate-pulse group-hover:scale-125 transition">
              <span className="text-xs font-bold">碑</span>
              <span className="absolute inset-0 rounded-full border-2 border-primary/40 animate-ping" />
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div className="mt-4 p-5 border-l-4 border-accent bg-card rounded shadow animate-in fade-in">
          <div className="text-xs tracking-widest text-accent uppercase mb-1">Địa danh</div>
          <h4 className="font-serif text-xl font-semibold mb-2">{active.name}</h4>
          <p className="text-sm text-foreground/90 leading-relaxed">{active.desc}</p>
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-4 italic text-center">
        Rê chuột vào từng điểm trên bản đồ để xem tình hình IC đang diễn ra tại địa danh đó.
      </p>
    </div>
  );
}
