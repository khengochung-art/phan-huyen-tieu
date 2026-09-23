import { useState } from "react";

/**
 * Fortune.tsx — "Bốc Quẻ Vận Mệnh" generator.
 * Each pull returns one quẻ (label) + one IC prompt (situation the user can RP).
 */
const QUES = [
  { label: "Quẻ Thượng Thượng · Càn", prompt: "Hôm nay bạn vô tình nghe thấy một bí mật ở Hựu Uyển. Nên im lặng hay dùng nó để uy hiếp?" },
  { label: "Quẻ Khôn · Địa", prompt: "Đêm nay, một sứ giả mặc áo đen tìm bạn ở ngoài cung. Hắn nắm giữ thông tin vận mệnh của ngươi — ngươi mời vào hay đuổi đi?" },
  { label: "Quẻ Trung · Phong", prompt: "Hoàng đế triệu kiến bạn vào Càn Thanh Điện giữa đêm. Không rõ mục đích. Ngươi chuẩn bị áo bào nào?" },
  { label: "Quẻ Ly · Hỏa", prompt: "Đức Phi mời bạn dự tiệc trà. Đồ ăn có mùi lạ — có thể là thử độc. Ngươi làm gì?" },
  { label: "Quẻ Khảm · Thủy", prompt: "Một tên sát thủ đeo mặt nạ lưỡng nghi xuất hiện trong cung. Hắn đi về hướng phủ Thừa Tướng. Ngươi đuổi theo không?" },
  { label: "Quẻ Đoài · Trạch", prompt: "Trong thư phòng có một bức thư tình — không phải của bạn. Tên người gửi bị xé mất. Ngươi giữ kín hay đem ra triều?" },
  { label: "Quẻ Chấn · Lôi", prompt: "Đại Hoàng Tử mời bạn đi săn. Nhưng thị vệ của Tam Hoàng Tử cũng có mặt. Ngươi chọn bên nào?" },
  { label: "Quẻ Cấn · Sơn", prompt: "Bạn mơ thấy một con hạc bay ngang trăng. Sáng dậy, một quẻ treo trước cửa phòng — không biết ai đặt." }
];

export default function Fortune() {
  const [out, setOut] = useState<(typeof QUES)[number] | null>(null);
  const [spinning, setSpinning] = useState(false);

  const pull = () => {
    setSpinning(true);
    setOut(null);
    const steps = 14;
    let i = 0;
    const id = setInterval(() => {
      setOut(QUES[Math.floor(Math.random() * QUES.length)]);
      i++;
      if (i >= steps) {
        clearInterval(id);
        setSpinning(false);
      }
    }, 110);
  };

  return (
    <div className="text-center max-w-2xl mx-auto">
      <p className="text-xs tracking-[0.4em] text-accent uppercase mb-3">Nghi Lễ Mỗi Ngày</p>
      <h3 className="font-serif text-3xl md:text-4xl font-semibold mb-6">
        Bốc Quẻ Vận Mệnh Đầu Ngày
      </h3>
      <p className="text-muted-foreground mb-8 leading-relaxed">
        Một cú lắc, một gợi ý. Hãy để Khâm Thiên Giám chọn cho bạn một tình huống để bắt đầu buổi roleplay hôm nay.
      </p>

      <button
        onClick={pull}
        disabled={spinning}
        className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-serif text-lg rounded hover:scale-105 transition disabled:opacity-60 shadow-2xl"
      >
        <span className="text-2xl">☷</span>
        <span>{spinning ? "Đang xin quẻ…" : "Bốc Quẻ Ngay"}</span>
      </button>

      {out && (
        <div className="mt-10 p-8 border-2 border-accent rounded bg-card shadow-xl animate-in fade-in slide-in-from-bottom-4">
          <div className="font-serif text-xl font-semibold text-primary mb-4">{out.label}</div>
          <p className="text-foreground/90 leading-relaxed">{out.prompt}</p>
        </div>
      )}
    </div>
  );
}
