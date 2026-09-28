import { useEffect, useRef, useState } from 'react';
import { Bot, ChatBubble, Close, Copy, RotateCcw, Send, Sparkles } from '../../components/Icons';
import type { ChatMessage } from './chatbot-types';
import { getEffectiveApiKey, sendChatMessage } from './chatbot-service';
import { QUICK_SUGGESTIONS } from './chatbot-knowledge';
import { ChatMarkdown } from './ChatMarkdown';
import './chatbot.css';

const STORAGE_CHAT_HISTORY = 'htsv_chatbot_history_v1';

const INITIAL_BOT_MESSAGE: ChatMessage = {
  id: 'msg-welcome',
  role: 'assistant',
  content: `Xin chào! Tôi là **Trợ lý AI HTSV - DNC** ✨\n\nTôi sẵn sàng hỗ trợ bạn như một AI đa năng thông minh (tương tự **ChatGPT** & **Gemini**):\n* 🎓 **Đại học Nam Cần Thơ (DNC):** 86 ngành đào tạo, 4 phương thức xét tuyển, học phí ổn định, Ký túc xá & Bệnh viện DNC...\n* 🏛️ **Cổng Sinh viên HTSV:** Thủ tục học vụ một cửa, đăng ký Ký túc xá, tra cứu lịch học & học phí, Confession...\n* 💻 **Lập trình & CNTT:** Giải thích công nghệ, viết code, sửa lỗi, lộ trình Web, Python, AI...\n* 📚 **Học tập & Nghiên cứu:** Viết luận, giải bài tập, phương pháp học đại học...\n\nBạn có thể gõ câu hỏi bất kỳ hoặc chọn gợi ý nhanh bên dưới nhé!`,
  timestamp: 0,
  isMock: true,
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
  extra?: { status?: 'sending' | 'success' | 'error'; isMock?: boolean }
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
    const saved = localStorage.getItem(STORAGE_CHAT_HISTORY);
    if (saved) {
      const parsed = JSON.parse(saved) as ChatMessage[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore parse error
  }
  return [INITIAL_BOT_MESSAGE];
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => getInitialMessages());
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Save history on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CHAT_HISTORY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // focus input when opening on non-touch devices
      if (window.innerWidth >= 640) {
        inputRef.current?.focus();
      }
    }
  }, [isOpen, messages, isLoading]);

  // Handle escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const hasApiKey = Boolean(getEffectiveApiKey());

  const handleSendMessage = async (userText: string) => {
    const text = userText.trim();
    if (!text || isLoading) return;

    const userMessage = createMessage('user', text, { status: 'success' });
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage(updatedMessages);
      const botMessage = createMessage('assistant', response.text, {
        status: 'success',
        isMock: response.isMock,
      });
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Đã có lỗi xảy ra khi kết nối tới trợ lý AI.';
      const errorMessage = createMessage(
        'assistant',
        `⚠️ **Lỗi:** ${errorMsg}\n\nVui lòng thử lại sau giây lát hoặc liên hệ ban quản trị.`,
        { status: 'error' }
      );
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([INITIAL_BOT_MESSAGE]);
    try {
      localStorage.removeItem(STORAGE_CHAT_HISTORY);
    } catch {
      // ignore
    }
  };

  const handleCopyText = (content: string, id: string) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  // Render markdown with rich styling like ChatGPT/Gemini
  const renderMessageContent = (content: string, isUser: boolean) => {
    return <ChatMarkdown content={content} isUser={isUser} />;
  };

  return (
    <div className="chatbot-widget-container">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group fixed right-6 bottom-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-white/80 bg-linear-to-br from-blue-600 via-sky-600 to-indigo-600 text-white shadow-xl shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/35 focus:ring-4 focus:ring-blue-400/40 focus:outline-hidden sm:right-8 sm:bottom-8"
          aria-label="Mở Trợ lý Ảo HTSV"
        >
          <div className="relative">
            <ChatBubble className="h-7 w-7 transition-transform group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900" />
            </span>
          </div>
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-xl bg-slate-900/90 px-3 py-1.5 text-xs font-medium text-white shadow-md backdrop-blur-xs transition-opacity group-hover:block dark:bg-white/90 dark:text-slate-900">
            Trợ lý Sinh viên HTSV ✨
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          role="region"
          aria-label="Cửa sổ trò chuyện HTSV"
          className="htsv-chat-window fixed right-0 bottom-0 z-40 flex h-[88vh] max-h-[640px] w-full flex-col overflow-hidden sm:right-6 sm:bottom-6 sm:w-[410px] sm:rounded-3xl"
        >
          {/* Header */}
          <div className="htsv-chat-header flex items-center justify-between px-4 py-3.5">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
                <Bot className="h-5 w-5" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="htsv-chat-title text-sm font-bold">
                    Trợ lý Sinh viên HTSV
                  </h3>
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="htsv-chat-subtitle text-[11px] font-medium">
                    {hasApiKey ? 'AI Trực tuyến' : 'Cơ sở dữ liệu mẫu'}
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
                onClick={() => setIsOpen(false)}
                title="Thu nhỏ"
                className="htsv-chat-action-btn rounded-xl p-2 focus:outline-hidden"
                aria-label="Đóng cửa sổ"
              >
                <Close className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Message List */}
          <div className="htsv-chat-body flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm shadow-xs ${
                      isUser
                        ? 'rounded-br-xs bg-linear-to-r from-blue-600 to-indigo-600 text-white'
                        : msg.status === 'error'
                        ? 'rounded-bl-xs border border-red-200 bg-red-50 text-red-900 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200'
                        : 'htsv-chat-bubble-ai rounded-bl-xs'
                    }`}
                  >
                    {renderMessageContent(msg.content, isUser)}

                    <div
                      className={`mt-1.5 flex items-center gap-1.5 text-[10px] ${
                        isUser
                          ? 'justify-end text-blue-100/90'
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
                          <button
                            type="button"
                            onClick={() => handleCopyText(msg.content, msg.id)}
                            className="htsv-chat-action-btn flex items-center gap-0.5 rounded px-1.5 py-0.5"
                            title="Sao chép nội dung"
                          >
                            <Copy className="h-3 w-3" />
                            <span>{copiedId === msg.id ? 'Đã chép' : 'Chép'}</span>
                          </button>
                        </div>
                      )}
                      <span>{formatTime(msg.timestamp)}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing Loader */}
            {isLoading && (
              <div className="flex items-start">
                <div className="htsv-chat-bubble-ai flex items-center gap-1 rounded-2xl rounded-bl-xs px-4 py-3 shadow-xs">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />
                  <span className="htsv-chat-subtitle ml-2 text-xs">
                    Trợ lý đang soạn câu trả lời...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          {messages.length <= 2 && !isLoading && (
            <div className="htsv-chat-suggestions p-3">
              <p className="htsv-chat-subtitle mb-2 text-[11px] font-semibold">
                Gợi ý câu hỏi phổ biến:
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_SUGGESTIONS.map((q) => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => handleSendMessage(q.prompt)}
                    className="htsv-chat-chip rounded-xl px-3 py-1.5 text-left text-[11px] font-medium"
                  >
                    {q.label}
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
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDownInput}
                placeholder="Hỏi bất kỳ điều gì (lập trình, học tập, thủ tục HTSV)..."
                className="htsv-chat-textarea max-h-28 min-h-[44px] flex-1 resize-none rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
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
