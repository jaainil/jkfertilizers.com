import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  X,
  Send,
  Leaf,
  Copy,
  Check,
  ChevronRight,
  RefreshCw,
  Phone,
  Mail,
  ExternalLink,
  Building2,
  FlaskConical,
  Scale,
} from 'lucide-react';
import type { RAGResponse, SourceCitation } from '@/lib/rag/types';
import { RagMarkdown } from './RagMarkdown';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  sources?: SourceCitation[];
  latencyMs?: number;
  intent?: string;
  path?: string;
  timestamp: Date;
}

const STARTER_QUESTIONS = [
  {
    icon: FlaskConical,
    text: 'What is PROM and how does it replace chemical DAP?',
  },
  {
    icon: Building2,
    text: 'What is the manufacturing capacity of the Anand plant?',
  },
  {
    icon: Leaf,
    text: 'How to apply Mycorrhiza Bio-Fertilizer granules?',
  },
  {
    icon: Scale,
    text: 'What are the MOQ & packaging sizes for bulk supply?',
  },
  {
    icon: FlaskConical,
    text: 'What is PDM (Potash Derived from Molasses)?',
  },
  {
    icon: Building2,
    text: 'Does J K Fertilizers offer toll manufacturing or job work?',
  },
];

export const JKFertilizersRAGChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [hasShownHint, setHasShownHint] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global Keyboard Shortcut (⌘K / Ctrl+K) and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Auto-dismiss floating hint after 6s
  useEffect(() => {
    const timer = setTimeout(() => setHasShownHint(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = async (queryText?: string) => {
    const text = (queryText || inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Secure HTTP POST to serverless API route (/api/rag/chat)
      const res = await fetch('/api/rag/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: text }),
      });

      if (res.status === 429) {
        const errorData = await res.json().catch(() => ({}));
        const retrySec = errorData.retryAfter || 30;
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            sender: 'assistant',
            text: `⚠️ **Rate limit exceeded.** Please wait ${retrySec} seconds before submitting another question.\n\nFor urgent bulk orders, you can call our sales desk directly at **+91 98250 45894**.`,
            timestamp: new Date(),
          },
        ]);
        return;
      }

      if (!res.ok) {
        throw new Error(`Server returned HTTP status ${res.status}`);
      }

      const response: RAGResponse = await res.json();

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: response.answer,
        sources: response.sources,
        latencyMs: response.latencyMs,
        intent: response.intent,
        path: response.path,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.warn('[rag-chat] HTTP API unavailable, attempting client fallback:', err);
      try {
        // Dynamic client-side fallback if server API is not available
        const { askRag } = await import('@/lib/rag/chat');
        const response = await askRag(text);
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            sender: 'assistant',
            text: response.answer,
            sources: response.sources,
            latencyMs: response.latencyMs,
            intent: response.intent,
            path: response.path,
            timestamp: new Date(),
          },
        ]);
      } catch (fallbackErr) {
        console.error('[rag-chat] Final fallback failed:', fallbackErr);
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            sender: 'assistant',
            text: 'I am currently unable to reach the agronomy database. You can contact our Anand manufacturing desk directly at **sales@jkfertilizers.com** or **+91 98250 45894**.',
            timestamp: new Date(),
          },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <>
      {/* ─── Floating Trigger Button & Mobile Hint ─── */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3">
        {!isOpen && !hasShownHint && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white text-[#163D26] text-xs font-semibold rounded-full shadow-lg border border-[#2D7A4A]/20 animate-fade-in">
            <span>Ask J K Fertilizers AI</span>
            <span className="px-1.5 py-0.5 bg-[#E8F3EB] rounded font-mono text-[10px] text-[#2D7A4A]">⌘K</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setHasShownHint(true);
              }}
              className="text-gray-400 hover:text-gray-600 ml-1 cursor-pointer"
              aria-label="Dismiss hint"
            >
              ×
            </button>
          </div>
        )}

        <button
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Open J K Fertilizers AI Assistant"
          className="group relative flex items-center justify-center gap-2.5 px-4 py-3.5 bg-[#163D26] hover:bg-[#2D7A4A] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 border border-white/20 cursor-pointer"
        >
          <div className="relative">
            <Leaf className="w-5 h-5 text-[#F59E0B] group-hover:rotate-12 transition-transform duration-300" />
            <Sparkles className="w-2.5 h-2.5 text-white absolute -top-1 -right-1 animate-pulse" />
          </div>
          <span className="hidden sm:inline font-heading font-semibold text-sm tracking-wide">
            Ask Agronomy AI
          </span>
          <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white/20 rounded text-white/90">
            ⌘K
          </span>
        </button>
      </div>

      {/* ─── Modal Dialog ─── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="relative w-full sm:max-w-2xl h-[92vh] sm:h-[680px] bg-[#FEFDF8] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col border border-[#163D26]/15 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="J K Fertilizers AI Chat"
          >
            {/* ─── Header ─── */}
            <div className="flex items-center justify-between px-5 py-4 bg-[#163D26] text-white border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#2D7A4A] flex items-center justify-center border border-[#F59E0B]/40 shadow-inner">
                  <Leaf className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm sm:text-base leading-tight flex items-center gap-2">
                    J K Fertilizers AI
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#F59E0B] text-emerald-950 rounded-full">
                      FCO Grounded
                    </span>
                  </h3>
                  <p className="text-[11px] text-white/70">
                    700 MT/day Anand Plant • Technical Specifications & B2B Inquiries
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <button
                    onClick={handleClear}
                    title="Clear Conversation"
                    className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close (Esc)"
                  className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* ─── Messages Body ─── */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-gradient-to-b from-[#FAF8F3] to-[#FEFDF8]">
              {messages.length === 0 && (
                <div className="h-full flex flex-col justify-center items-center text-center py-6 px-2">
                  <div className="w-14 h-14 rounded-2xl bg-[#E8F3EB] border border-[#2D7A4A]/20 flex items-center justify-center mb-4 text-[#163D26] shadow-sm">
                    <Leaf className="w-7 h-7 text-[#2D7A4A]" />
                  </div>
                  <h4 className="font-heading font-bold text-base sm:text-lg text-[#163D26] mb-1">
                    How can I assist your crop or procurement needs?
                  </h4>
                  <p className="text-xs sm:text-sm text-foreground/70 max-w-md mb-6 leading-relaxed">
                    Ask about FCO-certified organic fertilizers, PROM vs DAP comparisons, custom carrier granules, or wholesale B2B manufacturing terms.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-lg">
                    {STARTER_QUESTIONS.map((q, idx) => {
                      const Icon = q.icon;
                      return (
                        <button
                          key={`starter-${idx}`}
                          onClick={() => handleSendMessage(q.text)}
                          className="flex items-start gap-2.5 p-3 text-left text-xs bg-white hover:bg-[#E8F3EB]/60 text-foreground/90 hover:text-[#163D26] rounded-xl border border-gray-200/80 hover:border-[#2D7A4A]/40 transition-all duration-150 shadow-2xs group cursor-pointer"
                        >
                          <Icon className="w-4 h-4 text-[#2D7A4A] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                          <span className="flex-1 line-clamp-2 leading-relaxed">{q.text}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#2D7A4A] shrink-0 mt-0.5" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {msg.sender === 'user' ? (
                    <div className="max-w-[85%] sm:max-w-[75%] px-4 py-2.5 bg-[#163D26] text-white rounded-2xl rounded-tr-xs text-sm shadow-sm">
                      {msg.text}
                    </div>
                  ) : (
                    <div className="w-full max-w-[95%] sm:max-w-[90%] bg-white border border-[#2D7A4A]/20 rounded-2xl rounded-tl-xs p-4 sm:p-5 shadow-sm text-foreground">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#2D7A4A]" />
                          <span className="font-heading font-bold text-xs text-[#163D26]">
                            J K Fertilizers Knowledge Engine
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="text-gray-400 hover:text-[#163D26] transition-colors p-1 rounded cursor-pointer"
                          title="Copy text"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-[#2D7A4A]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      <RagMarkdown content={msg.text} />

                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
                            <span>Verified Sources</span>
                            <span className="text-[10px] text-gray-400 font-mono">
                              ({msg.sources.length})
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.sources.map((s) => (
                              <a
                                key={`src-chip-${s.id}`}
                                href={s.url}
                                target={s.url.startsWith('http') ? '_blank' : undefined}
                                rel={s.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium bg-[#FAF8F3] hover:bg-[#E8F3EB] text-[#163D26] border border-gray-200 hover:border-[#2D7A4A]/40 rounded-lg transition-colors cursor-pointer"
                              >
                                <span className="font-mono font-bold text-[10px] text-[#2D7A4A]">
                                  [{s.id}]
                                </span>
                                <span className="truncate max-w-[150px] sm:max-w-[200px]">
                                  {s.title}
                                </span>
                                <ExternalLink className="w-2.5 h-2.5 text-gray-400" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {msg.latencyMs !== undefined && (
                        <div className="mt-2.5 text-[10px] text-gray-400 flex items-center justify-between">
                          <span>
                            Response time: <strong className="font-mono">{msg.latencyMs}ms</strong>
                          </span>
                          <a
                            href="/contact"
                            className="text-[#2D7A4A] hover:underline font-semibold"
                          >
                            Inquire About This Product →
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 px-4 py-3 bg-white border border-[#2D7A4A]/20 rounded-2xl rounded-tl-xs w-fit shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-[#2D7A4A] animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-[#2D7A4A] animate-pulse [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-[#2D7A4A] animate-pulse [animation-delay:0.4s]" />
                  <span className="text-xs font-medium text-[#163D26] ml-2">
                    Analyzing agronomy knowledge base...
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ─── Footer Direct Action & Input Form ─── */}
            <div className="p-3 sm:p-4 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:pb-4 bg-white border-t border-gray-200 shrink-0">
              <div className="flex items-center justify-between pb-2 mb-2 text-[11px] text-gray-500 border-b border-gray-100">
                <span className="flex items-center gap-1.5 text-foreground/80">
                  <Phone className="w-3 h-3 text-[#2D7A4A]" />
                  Sales Desk: <strong className="text-[#163D26]">+91 98250 45894</strong>
                </span>
                <span className="flex items-center gap-1.5 text-foreground/80">
                  <Mail className="w-3 h-3 text-[#2D7A4A]" />
                  <span>sales@jkfertilizers.com</span>
                </span>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about PROM, PDM, NPK specs, or bulk orders..."
                  className="flex-1 px-4 py-2.5 text-sm bg-[#FAF8F3] border border-gray-300 focus:border-[#2D7A4A] focus:bg-white rounded-xl outline-hidden transition-all text-foreground placeholder:text-gray-400"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="px-4 py-2.5 bg-[#163D26] hover:bg-[#2D7A4A] disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold rounded-xl shadow-xs transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs">Send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
