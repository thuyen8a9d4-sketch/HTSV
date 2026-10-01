import { useEffect, useRef, useState } from 'react';
import { BotAvatar, botAvatarTypes } from 'bot-avatars';
import type { BotAvatarType } from 'bot-avatars';
import {
  Banknote,
  Building,
  ChatBubble,
  Close,
  Copy,
  GraduationCap,
  HeartPulse,
  HelpCircle,
  Laptop,
  RotateCcw,
  School,
  Send,
} from '../../components/Icons';
import { useTheme } from '../../lib/theme';
import type { ChatMessage, QuickSuggestion } from './chatbot-types';
import { getEffectiveApiKey, sendChatMessage } from './chatbot-service';
import { QUICK_SUGGESTIONS, generateFollowUpSuggestions } from './chatbot-knowledge';
import { ChatMarkdown } from './ChatMarkdown';
import './chatbot.css';

const STORAGE_CHAT_HISTORY = 'htsv_chatbot_history_v2';

function cleanEmojis(text: string): string {
  if (!text) return '';
  return text
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    .replace(/[ ]{2,}/g, ' ');
}

function SuggestionIcon({ type }: { type?: QuickSuggestion['iconType'] }) {
  const iconClass = 'h-3.5 w-3.5 shrink-0';
  switch (type) {
    case 'school':
      return <School className={`${iconClass} text-indigo-500`} />;
    case 'graduation':
      return <GraduationCap className={`${iconClass} text-blue-500`} />;
    case 'tuition':
      return <Banknote className={`${iconClass} text-amber-500`} />;
    case 'tech':
      return <Laptop className={`${iconClass} text-sky-500`} />;
    case 'medical':
      return <HeartPulse className={`${iconClass} text-rose-500`} />;
    case 'building':
      return <Building className={`${iconClass} text-emerald-500`} />;
    default:
      return <ChatBubble className={`${iconClass} text-slate-400`} />;
  }
}

const INITIAL_BOT_MESSAGE: ChatMessage = {
  id: 'msg-welcome',
  role: 'assistant',
  content: `Xin chào bạn! Tôi là **Tư vấn & Hỗ trợ Sinh viên DNC**.\n\nTôi sẵn sàng đồng hành và giải đáp các thông tin học vụ, đời sống cho bạn:\n* **Đại học Nam Cần Thơ (DNC):** 86 ngành đào tạo, 4 phương thức xét tuyển, học phí ổn định, Ký túc xá & Bệnh viện DNC...\n* **Cổng Sinh viên HTSV:** Thủ tục học vụ một cửa, đăng ký Ký túc xá, tra cứu lịch học & học phí, Confession...\n* **Học tập & CNTT:** Giải thích công nghệ, hỗ trợ code, phương pháp học tập đại học...\n* **Quy chế & Chế độ chính sách:** Học bổng, rèn luyện, vay vốn ngân hàng, BHYT sinh viên...\n\nBạn có thể gửi câu hỏi hoặc chọn các chủ đề gợi ý bên dưới nhé!`,
  timestamp: 0,
  isMock: true,
  followUps: [
    'Học phí các ngành năm 2026 là bao nhiêu?',
    'Phương thức xét học bạ vào DNC như thế nào?',
    'Thông tin ngành Công nghệ thông tin & AI',
  ],
};

function formatTime(timestamp: number) {
  if (!timestamp) return 'Vừa xong';
  return new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));
}

let messageCounter = 0;
function createMessage(
  role: 'user' | 'assistant' | 'system',
  content: string,
  extra?: { status?: 'sending' | 'success' | 'error'; isMock?: boolean; followUps?: string[]; isStreaming?: boolean }
): ChatMessage {
  messageCounter += 1;
  return {
    id: `msg-${Date.now()}-${messageCounter}`,
    role,
    content,
    timestamp: Date.now(),
    ...extra,
  };
}

function getInitialMessages(): ChatMessage[] {
  try {
    localStorage.removeItem('htsv_chatbot_history_v1');
    const saved = localStorage.getItem(STORAGE_CHAT_HISTORY);
    if (saved) {
      const parsed = JSON.parse(saved) as ChatMessage[];
      if (Array.isArray(parsed) && parsed.length > 0 && parsed.every((m) =>
        m && typeof m.id === 'string' && typeof m.content === 'string' &&
        ['user', 'assistant', 'system'].includes(m.role) && Number.isFinite(m.timestamp) &&
        (m.followUps === undefined || (Array.isArray(m.followUps) && m.followUps.every((item) => typeof item === 'string')))
      )) {
        return parsed.map((m) => {
          if (m.id === 'msg-welcome') {
            return { ...INITIAL_BOT_MESSAGE, timestamp: m.timestamp };
          }
          return {
            ...m,
            content: cleanEmojis(m.content),
          };
        });
      }
    }
  } catch {
    // ignore parse error
  }
  return [INITIAL_BOT_MESSAGE];
}

export function ChatbotWidget() {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [avatarType, setAvatarType] = useState<BotAvatarType>('clover');
  const [messages, setMessages] = useState<ChatMessage[]>(() => getInitialMessages());
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messageListRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const streamIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const requestVersion = useRef(0);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up streaming timer on unmount
  useEffect(() => {
    return () => {
      requestVersion.current += 1;
      if (copyTimer.current) clearTimeout(copyTimer.current);
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }
    };
  }, []);

  // Save history on changes (don't save while streaming to avoid partial content writes)
  useEffect(() => {
    if (isStreaming) return;
    try {
      localStorage.setItem(STORAGE_CHAT_HISTORY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages, isStreaming]);

  useEffect(() => {
    if (isOpen) {
      const list = messageListRef.current;
      list?.scrollTo({
        top: messages.length === 1 ? 0 : list.scrollHeight,
        behavior: isStreaming || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    }
  }, [isOpen, messages, isLoading, isStreaming]);

  useEffect(() => {
    if (isOpen && window.matchMedia('(pointer: fine)').matches) inputRef.current?.focus();
  }, [isOpen]);

  // Handle escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const hasApiKey = Boolean(getEffectiveApiKey());
  const avatarState = isLoading || isStreaming ? 'working' : 'default';

  const handleChangeAvatar = () => {
    const otherSkins = botAvatarTypes.filter((type) => type !== avatarType);
    setAvatarType(otherSkins[Math.floor(Math.random() * otherSkins.length)] ?? 'clover');
  };

  const handleSendMessage = async (userText: string) => {
    const text = userText.trim();
    if (!text || isLoading || isStreaming) return;

    // Clear previous streaming if any
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
      setIsStreaming(false);
    }

    const userMessage = createMessage('user', text, { status: 'success' });
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    const version = ++requestVersion.current;

    try {
      const response = await sendChatMessage(updatedMessages);
      if (version !== requestVersion.current) return;
      const fullText = response.text;
      const followUps = generateFollowUpSuggestions(text, fullText);
      setIsLoading(false);

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setMessages((prev) => [...prev, createMessage('assistant', fullText, { status: 'success', isMock: response.isMock, followUps })]);
        return;
      }

      // Start streaming typewriter animation
      const newBotMessage = createMessage('assistant', '', {
        status: 'success',
        isMock: response.isMock,
        isStreaming: true,
        followUps,
      });
      const botMessageId = newBotMessage.id;

      setMessages((prev) => [...prev, newBotMessage]);
      setIsStreaming(true);

      const totalLen = fullText.length;
      // Dynamic chunk step: keeps typewriter snappy (~1.2s - 2.0s)
      const stepChars = totalLen > 1200 ? 14 : totalLen > 500 ? 7 : 3;
      let currentIdx = 0;

      streamIntervalRef.current = setInterval(() => {
        currentIdx += stepChars;
        if (currentIdx >= totalLen) {
          if (streamIntervalRef.current) {
            clearInterval(streamIntervalRef.current);
            streamIntervalRef.current = null;
          }
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botMessageId
                ? { ...m, content: fullText, isStreaming: false }
                : m
            )
          );
          setIsStreaming(false);
        } else {
          const partial = fullText.slice(0, currentIdx);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botMessageId
                ? { ...m, content: partial }
                : m
            )
          );
        }
      }, 16);
    } catch (err) {
      if (version !== requestVersion.current) return;
      setIsLoading(false);
      setIsStreaming(false);
      const errorMsg = err instanceof Error ? err.message : 'Đã có lỗi xảy ra khi kết nối tới trợ lý AI.';
      const errorMessage = createMessage(
        'assistant',
        `**Lỗi:** ${errorMsg}\n\nVui lòng thử lại sau giây lát hoặc liên hệ ban quản trị.`,
        { status: 'error' }
      );
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleClearHistory = () => {
    requestVersion.current += 1;
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }
    setIsStreaming(false);
    setIsLoading(false);
    setMessages([INITIAL_BOT_MESSAGE]);
    try {
      localStorage.removeItem(STORAGE_CHAT_HISTORY);
    } catch {
      // ignore
    }
  };

  const handleCopyText = (content: string, id: string) => {
    if (!navigator.clipboard) return;
    void navigator.clipboard.writeText(content).then(() => {
      setCopiedId(id);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopiedId(null), 2000);
    }).catch(() => { setCopiedId(null); });
  };

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  // Render markdown with rich styling like ChatGPT/Gemini
  const renderMessageContent = (content: string, isUser: boolean) => {
    const text = isUser ? content : cleanEmojis(content);
    return <ChatMarkdown content={text} isUser={isUser} />;
  };

  return (
    <div className="chatbot-widget-container">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          ref={triggerRef}
          onClick={() => setIsOpen(true)}
          aria-expanded={false}
          aria-controls="htsv-chat-panel"
          className="htsv-chat-trigger"
          aria-label="Mở Tư vấn Sinh viên HTSV"
        >
          <BotAvatar type={avatarType} state={avatarState} size="100%" theme={theme} aria-hidden="true" />
          <span className="htsv-chat-trigger-tooltip">Tư vấn Sinh viên HTSV</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          id="htsv-chat-panel"
          role="region"
          aria-label="Cửa sổ trò chuyện HTSV"
          className="htsv-chat-window"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="htsv-chat-header flex items-center justify-between gap-2 px-4 py-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <button
                type="button"
                className="htsv-chat-avatar"
                onClick={handleChangeAvatar}
                title="Đổi skin ngẫu nhiên"
                aria-label="Đổi skin chatbot ngẫu nhiên"
              >
                <BotAvatar
                  type={avatarType}
                  state={avatarState}
                  size="100%"
                  theme={theme}
                  aria-hidden="true"
                />
              </button>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="htsv-chat-title text-sm font-bold">
                    Tư vấn Sinh viên HTSV
                  </h3>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-xs" title="Đang trực tuyến" aria-label="Đang trực tuyến" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="htsv-chat-subtitle text-[11px] font-medium">
                    {hasApiKey ? 'Hỗ trợ trực tuyến 24/7' : 'Giải đáp thông tin sinh viên'}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearHistory}
                title="Làm mới đoạn hội thoại"
                className="htsv-chat-action-btn rounded-xl p-2 focus:outline-hidden"
                aria-label="Làm mới hội thoại"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => { setIsOpen(false); requestAnimationFrame(() => triggerRef.current?.focus()); }}
                title="Thu nhỏ"
                className="htsv-chat-action-btn rounded-xl p-2 focus:outline-hidden"
                aria-label="Đóng cửa sổ"
              >
                <Close className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Message List */}
          <div ref={messageListRef} className="htsv-chat-body flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              const isLastMessage = index === messages.length - 1;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`htsv-chat-message max-w-[92%] rounded-2xl px-4 py-3 text-xs sm:text-sm shadow-xs ${
                      isUser
                        ? 'htsv-chat-bubble-user rounded-br-xs'
                        : msg.status === 'error'
                        ? 'htsv-chat-bubble-error rounded-bl-xs'
                        : 'htsv-chat-bubble-ai rounded-bl-xs'
                    }`}
                  >
                    {renderMessageContent(msg.content, isUser)}
                    {msg.isStreaming && <span className="htsv-chat-cursor" aria-hidden="true" />}

                    <div
                      className={`mt-1.5 flex items-center gap-1.5 text-[10px] ${
                        isUser
                          ? 'htsv-chat-user-time justify-end'
                          : 'justify-between htsv-chat-subtitle'
                      }`}
                    >
                      {!isUser && (
                        <div className="flex items-center gap-1">
                          {msg.isMock && (
                            <span className="htsv-chat-mock-badge rounded-md px-1.5 py-0.5 text-[9px] font-semibold">
                              Mẫu HTSV
                            </span>
                          )}
                          {!msg.isStreaming && (
                            <button
                              type="button"
                              onClick={() => handleCopyText(msg.content, msg.id)}
                              className="htsv-chat-action-btn flex items-center gap-0.5 rounded px-1.5 py-0.5"
                              title="Sao chép nội dung"
                            >
                              <Copy className="h-3 w-3" />
                              <span>{copiedId === msg.id ? 'Đã chép' : 'Chép'}</span>
                            </button>
                          )}
                        </div>
                      )}
                      <span>{formatTime(msg.timestamp)}</span>
                    </div>
                  </div>

                  {/* Follow-up Prompt Chips (chỉ hiển thị ở câu trả lời mới nhất khi đã gõ xong) */}
                  {!isUser && !msg.isStreaming && !isLoading && isLastMessage && msg.followUps && msg.followUps.length > 0 && (
                    <div className="htsv-followup-wrapper mt-2.5 flex flex-col gap-1.5 w-full max-w-[85%]">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                        <HelpCircle className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                        <span>Câu hỏi thường gặp liên quan:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.followUps.map((chip, idx) => (
                          <button
                            key={idx}
                            type="button"
                            disabled={isLoading || isStreaming}
                            onClick={() => handleSendMessage(chip)}
                            className="htsv-followup-chip"
                          >
                            <ChatBubble className="h-3 w-3 shrink-0 text-emerald-600 dark:text-emerald-400" />
                            <span>{chip}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Loader */}
            {isLoading && (
              <div className="flex items-start" role="status">
                <div className="htsv-chat-bubble-ai flex items-center gap-1 rounded-2xl rounded-bl-xs px-4 py-3 shadow-xs">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />
                  <span className="htsv-chat-subtitle ml-2 text-xs">
                    Đang tìm thông tin hỗ trợ...
                  </span>
                </div>
              </div>
            )}

          </div>

          {/* Quick Suggestions Chips (Khi mới bắt đầu đoạn chat) */}
          {messages.length <= 1 && !isLoading && !isStreaming && (
            <div className="htsv-chat-suggestions p-3">
              <p className="htsv-chat-subtitle mb-2 text-[11px] font-semibold">
                Chủ đề hỗ trợ nhanh:
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_SUGGESTIONS.map((q) => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => handleSendMessage(q.prompt)}
                    className="htsv-chat-chip flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-left text-[11px] font-medium"
                  >
                    <SuggestionIcon type={q.iconType} />
                    <span>{q.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="htsv-chat-footer p-3"
          >
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                aria-label="Tin nhắn cho trợ lý HTSV"
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDownInput}
                placeholder="Nhập câu hỏi của bạn…"
                className="htsv-chat-textarea max-h-28 min-h-[44px] min-w-0 flex-1 resize-none rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading || isStreaming}
                className="htsv-chat-send-btn flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl focus:outline-hidden"
                aria-label="Gửi tin nhắn"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
