import { useState } from 'react';
import { GlassButton } from '../../components/GlassButton';
import { Check, Close, Eye, EyeOff, Settings } from '../../components/Icons';
import type { ChatbotSettings, ChatProvider } from './chatbot-types';
import { saveChatbotSettings } from './chatbot-service';

interface ChatbotSettingsModalProps {
  open: boolean;
  onClose: () => void;
  settings: ChatbotSettings;
  onSave: (newSettings: ChatbotSettings) => void;
}

const GEMINI_MODELS = [
  { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash (Nhanh & Chuẩn xác nhất)' },
  { id: 'gemini-2.5-flash-lite', label: 'Gemini 2.5 Flash Lite (Phản hồi tức thì)' },
  { id: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro (Suy luận chuyên sâu)' },
  { id: 'gemini-flash-latest', label: 'Gemini Flash Latest' },
];

export function ChatbotSettingsModal({
  open,
  onClose,
  settings,
  onSave,
}: ChatbotSettingsModalProps) {
  const [apiKey, setApiKey] = useState(settings.apiKey);
  const [provider, setProvider] = useState<ChatProvider>(settings.provider);
  const [model, setModel] = useState(settings.model);
  const [customEndpoint, setCustomEndpoint] = useState(settings.customEndpoint || '');
  const [showKey, setShowKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!open) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: ChatbotSettings = {
      apiKey: apiKey.trim(),
      provider,
      model: model.trim() || (provider === 'gemini' ? 'gemini-1.5-flash' : 'gpt-4o-mini'),
      customEndpoint: customEndpoint.trim() || undefined,
      temperature: settings.temperature,
    };
    saveChatbotSettings(updated);
    onSave(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const handleClearKey = () => {
    setApiKey('');
    const updated: ChatbotSettings = {
      ...settings,
      apiKey: '',
    };
    saveChatbotSettings(updated);
    onSave(updated);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="chatbot-settings-title"
      className="htsv-chat-settings-modal absolute inset-0 z-20 flex flex-col p-4 shadow-2xl backdrop-blur-md rounded-2xl sm:rounded-3xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-blue-600" />
          <h2 id="chatbot-settings-title" className="htsv-chat-title text-base font-bold">
            Cấu hình API Key Trợ lý AI
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="htsv-chat-action-btn rounded-lg p-1 focus:outline-hidden"
          aria-label="Đóng cài đặt"
        >
          <Close className="h-5 w-5" />
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSave} className="flex-1 space-y-4 overflow-y-auto py-3 text-sm">
        {/* Provider Selection */}
        <div>
          <label htmlFor="chatbot-provider-select" className="htsv-chat-label mb-1.5 block font-semibold text-xs sm:text-sm">
            Nhà cung cấp AI (Provider)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              id="chatbot-provider-select"
              onClick={() => {
                setProvider('gemini');
                if (!model.startsWith('gemini')) setModel('gemini-1.5-flash');
              }}
              className={`htsv-chat-provider-btn rounded-xl px-3 py-2 text-center text-xs font-semibold ${
                provider === 'gemini' ? 'active' : ''
              }`}
            >
              Google Gemini
            </button>
            <button
              type="button"
              onClick={() => {
                setProvider('openai');
                if (model.startsWith('gemini')) setModel('gpt-4o-mini');
              }}
              className={`htsv-chat-provider-btn rounded-xl px-3 py-2 text-center text-xs font-semibold ${
                provider === 'openai' ? 'active' : ''
              }`}
            >
              OpenAI / Tương thích
            </button>
          </div>
        </div>

        {/* API Key Input */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label htmlFor="chatbot-api-key" className="htsv-chat-label font-semibold text-xs sm:text-sm">
              API Key <span className="text-red-500">*</span>
            </label>
            {apiKey && (
              <button
                type="button"
                onClick={handleClearKey}
                className="text-[11px] text-red-500 hover:underline"
              >
                Xóa key
              </button>
            )}
          </div>
          <div className="relative">
            <input
              id="chatbot-api-key"
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={provider === 'gemini' ? 'AIzaSy...' : 'sk-...'}
              className="form-input text-xs pr-10"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              aria-label={showKey ? 'Ẩn API Key' : 'Hiện API Key'}
              className="htsv-chat-subtitle absolute top-1/2 right-2.5 -translate-y-1/2 hover:text-blue-500"
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <p className="htsv-chat-subtitle mt-1.5 text-[11px] leading-relaxed">
            Khóa được lưu cục bộ trên trình duyệt của bạn (Local Storage) để gọi trực tiếp tới nhà cung cấp AI, hoàn toàn không chuyển qua máy chủ HTSV.
          </p>
        </div>

        {/* Model Selection */}
        <div>
          <label htmlFor="chatbot-model-select" className="htsv-chat-label mb-1 block font-semibold text-xs sm:text-sm">
            Mô hình (Model)
          </label>
          {provider === 'gemini' ? (
            <select
              id="chatbot-model-select"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="form-input text-xs"
            >
              {GEMINI_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id="chatbot-model-select"
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="gpt-4o-mini hoặc deepseek-chat"
              className="form-input text-xs"
            />
          )}
        </div>

        {/* Custom Endpoint (if OpenAI) */}
        {provider === 'openai' && (
          <div>
            <label htmlFor="chatbot-endpoint-input" className="htsv-chat-label mb-1 block font-semibold text-xs sm:text-sm">
              API Endpoint (Tùy chọn)
            </label>
            <input
              id="chatbot-endpoint-input"
              type="url"
              value={customEndpoint}
              onChange={(e) => setCustomEndpoint(e.target.value)}
              placeholder="https://api.openai.com/v1/chat/completions"
              className="form-input text-xs"
            />
          </div>
        )}

        {/* Status Indicator */}
        <div className="htsv-chat-status-box rounded-xl p-2.5 text-xs">
          <div className="flex items-center gap-1.5 font-medium">
            <span
              className={`h-2 w-2 rounded-full ${apiKey ? 'bg-emerald-500' : 'bg-amber-500'}`}
            />
            <span>
              {apiKey
                ? 'Đã phát hiện API Key — Sẵn sàng trò chuyện cùng AI!'
                : 'Chưa có API Key — Đang dùng cơ sở dữ liệu mẫu HTSV.'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="htsv-chat-action-btn rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold"
          >
            Đóng
          </button>
          <GlassButton variant="primary" type="submit" className="px-4 py-2 text-xs">
            {savedSuccess ? (
              <span className="flex items-center gap-1">
                <Check className="h-4 w-4" /> Đã lưu!
              </span>
            ) : (
              'Lưu cài đặt'
            )}
          </GlassButton>
        </div>
      </form>
    </div>
  );
}
