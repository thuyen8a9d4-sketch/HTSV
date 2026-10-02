import { useEffect, useRef, useState } from 'react';
import { GlassButton } from '../../components/GlassButton';
import { interviewQuestions } from './interview-questions-data';

type RecordState = 'idle' | 'recording' | 'recorded' | 'unsupported' | 'denied';

export function InterviewPracticePanel() {
  const [index, setIndex] = useState(0);
  const [state, setState] = useState<RecordState>('idle');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  const question = interviewQuestions[index];

  useEffect(() => {
    audioUrlRef.current = audioUrl;
  }, [audioUrl]);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
    };
  }, []);

  const resetRecording = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setState('idle');
  };

  const changeQuestion = (next: number) => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    resetRecording();
    setIndex(next);
  };

  const startRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setState('unsupported');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (event) => { if (event.data.size > 0) chunksRef.current.push(event.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioUrl(URL.createObjectURL(blob));
        setState('recorded');
        stream.getTracks().forEach((track) => track.stop());
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setState('recording');
    } catch {
      setState('denied');
    }
  };

  const stopRecording = () => mediaRecorderRef.current?.stop();

  return (
    <section aria-labelledby="interview-heading" id="interview-practice" className="space-y-7">
      <div className="student-section-heading">
        <div>
          <p className="student-eyebrow">Ghi âm câu trả lời · Gợi ý tham khảo</p>
          <h2 id="interview-heading">Luyện phỏng vấn</h2>
        </div>
      </div>

      <div className="liquid-glass-card p-5 sm:p-6">
        <p className="text-xs text-slate-600">
          Bản ghi âm chỉ lưu tạm trong phiên làm việc này, không gửi lên máy chủ. Gợi ý bên dưới là mẹo tham khảo chung, chưa phải nhận xét AI thật trên câu trả lời của bạn.
        </p>
      </div>

      <div className="liquid-glass-card space-y-5 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="liquid-pill">{question.category}</span>
          <span className="text-xs text-slate-500">Câu {index + 1}/{interviewQuestions.length}</span>
        </div>
        <p className="text-lg font-semibold">{question.question}</p>

        {state === 'unsupported' && <p role="alert" className="text-sm text-red-700">Trình duyệt này không hỗ trợ ghi âm. Hãy thử trên Chrome, Edge hoặc Firefox bản mới.</p>}
        {state === 'denied' && <p role="alert" className="text-sm text-red-700">Chưa thể truy cập micro — hãy cho phép quyền micro cho trang này rồi thử lại.</p>}

        <div className="flex flex-wrap items-center gap-3">
          {state !== 'recording' && (
            <GlassButton variant="primary" onClick={startRecording}>{state === 'recorded' ? 'Ghi âm lại' : 'Bắt đầu ghi âm'}</GlassButton>
          )}
          {state === 'recording' && (
            <>
              <GlassButton variant="danger" onClick={stopRecording}>Dừng ghi âm</GlassButton>
              <span className="flex items-center gap-1.5 text-sm text-red-600"><span className="h-2 w-2 animate-pulse rounded-full bg-red-600" aria-hidden="true" />Đang ghi âm…</span>
            </>
          )}
        </div>

        {audioUrl && (
          <div className="space-y-3 border-t border-slate-100 pt-4">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption -- bản ghi âm tự tạo của người dùng, không có nội dung để phụ đề */}
            <audio controls src={audioUrl} className="w-full" />
            <div className="rounded-xl bg-blue-50 p-3 text-sm text-blue-900 dark:bg-blue-500/10 dark:text-blue-200">
              <p className="font-semibold">Gợi ý trả lời tốt</p>
              <p className="mt-1">{question.tip}</p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap justify-between gap-2 border-t border-slate-100 pt-4">
          <GlassButton disabled={index === 0} onClick={() => changeQuestion(index - 1)}>← Câu trước</GlassButton>
          <GlassButton disabled={index === interviewQuestions.length - 1} onClick={() => changeQuestion(index + 1)}>Câu tiếp →</GlassButton>
        </div>
      </div>
    </section>
  );
}
