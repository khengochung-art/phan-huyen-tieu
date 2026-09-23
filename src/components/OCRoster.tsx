import { useMemo, useState } from "react";

type OC = {
  name: string;
  role: string;
  faction: "Hoàng Quan" | "Tranh Cung" | "Trung Lập" | "Huyền Môn";
  age: number;
  quote: string;
  img: string;
  bio: string;
  skills: string;
};

const ROSTER: OC[] = [
  {
    name: "Lý Trường Ninh",
    role: "Đại Hoàng Tử",
    faction: "Tranh Cung",
    age: 28,
    quote: "Gươm sắc không bằng lòng người.",
    img: "/uploads/on-x.jpg",
    bio: "Con của Hoàng Hậu Trần thị, mẫu nghi thiên hạ. Ninh nặng binh quyền biên cương, thân với Đại Tướng Quân.",
    skills: "Binh pháp · Cưỡi ngựa · Kiếm thuật"
  },
  {
    name: "Lâm Thù Nghi",
    role: "Đức Phi",
    faction: "Tranh Cung",
    age: 22,
    quote: "Hồng nhan họa nước, cũng là vì nước.",
    img: "/uploads/1785027887729-134945827711147686-6975393912130612660-1064cd30fc13108e21f5833623dcfe5d.jpg",
    bio: "Con gái Lâm gia — thế gia văn quan ba đời. Gia tộc hậu thuẫn Tam Hoàng Tử, mưu lược thâm sâu.",
    skills: "Tấu chương · Trà nghệ · Tế lễ"
  },
  {
    name: "Cố Thanh Hành",
    role: "Đại Tướng Quân",
    faction: "Hoàng Quan",
    age: 51,
    quote: "Biên cương còn, Trẫm còn.",
    img: "/uploads/on-x.jpg",
    bio: "Trấn thủ Vân Môn Quan 18 năm. Trung thần tuyệt đối với Hoàng đế, ghét nhất là hậu cung thao túng quốc sự.",
    skills: "Binh pháp · Thương thuật · Ngoại giao biên cương"
  },
  {
    name: "Tô Vãn Ninh",
    role: "Tả Thừa Tướng",
    faction: "Trung Lập",
    age: 47,
    quote: "Văn như nước, tĩnh mà thấm.",
    img: "/uploads/1785027887729-134945827711147686-6975393912130612660-1064cd30fc13108e21f5833623dcfe5d.jpg",
    bio: "Đứng đầu văn quan, nhưng luôn giữ thế trung lập. Không thiên vị phe nào, chỉ nghe lẽ phải.",
    skills: "Tấu chương · Luật pháp · Đàm phán"
  },
  {
    name: "Tiết Ứng Hàn",
    role: "Chưởng Tiêu Cục",
    faction: "Huyền Môn",
    age: 34,
    quote: "Bóng tối trung thành hơn hoàng đế.",
    img: "/uploads/on-x.jpg",
    bio: "Đứng đầu Tiêu Cục — tổ chức tình báo bí mật chỉ nghe lệnh Hoàng đế. Không ai biết mặt thật của hắn.",
    skills: "Bí ẩn ám sát · Gián điệp · Cải trang"
  },
  {
    name: "Châu Minh Nguyệt",
    role: "Thái Y Viện Chưởng Viện",
    faction: "Trung Lập",
    age: 56,
    quote: "Một phương thuốc, một vận mệnh.",
    img: "/uploads/1785027887729-134945827711147686-6975393912130612660-1064cd30fc13108e21f5833623dcfe5d.jpg",
    bio: "Nắm giữ bí mật về long thể Hoàng đế. Bị mọi phe dòm ngó nhưng không ai dám động thủ vì ông quá cần thiết.",
    skills: "Y thuật · Độc dược · Châm cứu"
  },
  {
    name: "Hà Cảnh Thời",
    role: "Nhị Hoàng Tử",
    faction: "Hoàng Quan",
    age: 25,
    quote: "Trẫm không cần ngai vàng, trẫm chỉ cần cha sống thêm một năm.",
    img: "/uploads/on-x.jpg",
    bio: "Con thứ hai, mẹ là Thường tại nhưng được Hoàng đế yêu quý nhất vì hiền lành, không tham vọng.",
    skills: "Thư pháp · Thơ · Y học (tự học)"
  },
  {
    name: "Phùng Châu Yến",
    role: "Đại Công Chúa",
    faction: "Trung Lập",
    age: 26,
    quote: "Hòa thân là gông cùm, nhưng cũng là cánh cửa.",
    img: "/uploads/1785027887729-134945827711147686-6975393912130612660-1064cd30fc13108e21f5833623dcfe5d.jpg",
    bio: "Chị cả các Hoàng tử. Sắp được gả cho quốc vương nước ngoài để liên minh — biến thành con cờ chính trị.",
    skills: "Ngoại giao · Cầm nghệ · Kiếm thuật (tự học)"
  }
];

const FILTERS = ["Tất cả", "Hoàng Quan", "Tranh Cung", "Trung Lập", "Huyền Môn"] as const;

export default function OCRoster() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Tất cả");
  const [open, setOpen] = useState<OC | null>(null);

  const list = useMemo(
    () => (filter === "Tất cả" ? ROSTER : ROSTER.filter((o) => o.faction === filter)),
    [filter]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm rounded border transition ${
              filter === f
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-foreground border-border hover:border-primary"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {list.map((oc) => (
          <button
            key={oc.name}
            onClick={() => setOpen(oc)}
            className="group text-left bg-card border border-border rounded overflow-hidden hover:border-primary hover:-translate-y-1 transition"
          >
            <div className="aspect-[3/4] overflow-hidden bg-muted">
              <img
                src={oc.img}
                alt={oc.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
            </div>
            <div className="p-4">
              <div className="text-[10px] tracking-widest text-accent uppercase mb-1">{oc.faction}</div>
              <div className="font-serif font-semibold leading-tight">{oc.name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {oc.role} · {oc.age} tuổi
              </div>
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm grid place-items-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-card border-2 border-primary rounded overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setOpen(null)}
              className="absolute top-3 right-3 w-9 h-9 grid place-items-center rounded-full bg-background/80 border border-border"
              aria-label="Đóng"
            >
              ✕
            </button>
            <div className="grid md:grid-cols-2">
              <div className="aspect-square md:aspect-auto bg-muted">
                <img src={open.img} alt={open.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 md:p-8">
                <div className="text-xs tracking-[0.3em] text-accent uppercase mb-2">
                  Cáo Thị · {open.faction}
                </div>
                <h3 className="font-serif text-3xl font-semibold mb-1">{open.name}</h3>
                <p className="text-sm text-muted-foreground mb-5">
                  {open.role} · {open.age} tuổi
                </p>
                <blockquote className="border-l-2 border-accent pl-4 italic text-foreground/90 mb-5">
                  "{open.quote}"
                </blockquote>
                <p className="text-sm leading-relaxed mb-4">{open.bio}</p>
                <p className="text-xs">
                  <span className="text-accent font-semibold uppercase tracking-widest">Sở trường: </span>
                  {open.skills}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
