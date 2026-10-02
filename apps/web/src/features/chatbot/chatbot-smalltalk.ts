/** Những câu trò chuyện ngắn được đáp lại ngay, kể cả khi AI trực tuyến tạm gián đoạn. */
export function getSmallTalkReply(question: string): string | null {
  const text = question.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
  const personalStatement = /^(toi|minh|tui|em|hom nay|bay gio|buon qua|vui qua)\b/.test(text);
  if (!personalStatement) return null;

  if (/\b(buon|co don|that vong|met moi|stress|ap luc)\b/.test(text)) {
    return 'Dạ, nghe bạn nói vậy em ở đây lắng nghe nè. Nếu bạn muốn, kể em nghe chuyện gì làm bạn buồn nha. Mình nói từ từ cũng được.';
  }
  if (/\b(vui|hanh phuc|phan khoi|hao hung)\b/.test(text)) {
    return 'Dạaaaa, nghe bạn vui em cũng mừng theo nèee! Có chuyện gì vui vậy, kể em nghe với nhaaaa.';
  }
  return null;
}
