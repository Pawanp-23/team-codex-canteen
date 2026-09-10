import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RobotAvatar, BotEmotion } from './RobotAvatar';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  RotateCcw,
  Terminal,
  UtensilsCrossed,
  Calendar,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  ThumbsUp,
  ArrowRight,
  Minimize2,
  Bot,
  ExternalLink,
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  emotion?: BotEmotion;
  action?: {
    label: string;
    icon?: 'terminal' | 'order' | 'demo' | 'trial' | 'gst';
    handler: () => void;
  };
  suggestedQuestions?: string[];
}

interface AnimatedChatBotProps {
  onLaunchTerminal?: () => void;
  onOpenOrderSystem?: () => void;
  onOpenBookDemo?: () => void;
  onOpenFreeTrial?: () => void;
  onOpenVideoDemo?: () => void;
}

export const AnimatedChatBot: React.FC<AnimatedChatBotProps> = ({
  onLaunchTerminal,
  onOpenOrderSystem,
  onOpenBookDemo,
  onOpenFreeTrial,
  onOpenVideoDemo,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [botEmotion, setBotEmotion] = useState<BotEmotion>('waving');
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(true);
  const [unreadCount, setUnreadCount] = useState(1);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Play synthetic Web Audio blips (no external files required)
  const playAudioCue = (type: 'send' | 'receive' | 'open' | 'pop') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'send') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.13);
      } else if (type === 'receive') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.exponentialRampToValueAtTime(550, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.16);
      } else if (type === 'open') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(740, now + 0.18);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch {
      // AudioContext might be blocked before first user gesture
    }
  };

  // Initial welcome message
  const initialMessages: ChatMessage[] = [
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: "Namaste! 🙏 I'm ByteBot, your AI Operations Concierge for PosBytz. Engineered by Pawan Patil and Team CodeX to help you master cloud billing, live recipe depletion, UPI QR, and Indian GST.",
      timestamp: 'Just now',
      emotion: 'happy',
      suggestedQuestions: [
        '📹 Watch Automated Packaging Video',
        '🚀 Test the live POS Terminal',
        '🥘 How does Recipe Stock Depletion work?',
        '⚡ UPI QR & Soundbox Integration',
        '🇮🇳 Indian GST & Invoicing Support',
      ],
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Handle opening chat
  const handleOpenChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setShowTooltip(false);
    setUnreadCount(0);
    setBotEmotion('happy');
    playAudioCue('open');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  };

  // Copy message text
  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Process User Query with Intelligent Restaurant & ERP Logic
  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    playAudioCue('send');

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);
    setBotEmotion('thinking');

    // Simulate AI response with domain intelligence
    setTimeout(() => {
      const response = generateBotResponse(query);
      setIsTyping(false);
      setBotEmotion(response.emotion || 'talking');
      playAudioCue('receive');

      setMessages((prev) => [...prev, response]);

      // Return bot to calm happy/idle state after talking
      setTimeout(() => {
        setBotEmotion('happy');
      }, 2500);
    }, 900);
  };

  // Intelligent domain bot response matcher
  const generateBotResponse = (query: string): ChatMessage => {
    const q = query.toLowerCase();
    const id = `bot-${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 0. Automated Kitchen Resources Packaging & Dispatch Video Visual
    if (
      q.includes('video') ||
      q.includes('pack') ||
      q.includes('conveyor') ||
      q.includes('dispatch') ||
      q.includes('automatic') ||
      q.includes('kitchen') ||
      q.includes('send') ||
      q.includes('deliver') ||
      q.includes('tour')
    ) {
      return {
        id,
        sender: 'bot',
        text: 'I have an interactive 4K video simulation ready for you! It visualizes the entire automated kitchen pipeline: live recipe ingredient depletion from hoppers, robotic induction cooking, tamper-proof hermetic clamshell sealing, dynamic UPI QR thermal labeling, and express courier dispatch right to the customer doorstep.',
        timestamp,
        emotion: 'happy',
        action: onOpenVideoDemo
          ? {
              label: '▶ Watch Automated Packaging Video',
              icon: 'demo',
              handler: onOpenVideoDemo,
            }
          : undefined,
        suggestedQuestions: [
          'How does Recipe BOM stock depletion work?',
          'Launch Live POS Terminal',
          'Tell me about Tamper-Proof Sealing',
        ],
      };
    }

    // 1. POS Terminal & Hands-on testing
    if (q.includes('pos') || q.includes('terminal') || q.includes('test') || q.includes('register') || q.includes('billing')) {
      return {
        id,
        sender: 'bot',
        text: 'PosBytz includes a lightning-fast cloud POS terminal designed for sub-second billing! It supports offline-first sync (keeps ringing up orders even when your Wi-Fi drops), quick table layout management, barcode scanning, and multi-currency billing.',
        timestamp,
        emotion: 'happy',
        action: onLaunchTerminal
          ? {
              label: 'Launch Live POS Terminal Now',
              icon: 'terminal',
              handler: onLaunchTerminal,
            }
          : undefined,
        suggestedQuestions: [
          'How does offline-first billing work?',
          'Can I connect thermal receipt printers?',
          'What payment gateways are supported?',
        ],
      };
    }

    // 2. Recipe BOM & Stock Depletion
    if (q.includes('recipe') || q.includes('bom') || q.includes('stock') || q.includes('depletion') || q.includes('ingredient') || q.includes('inventory')) {
      return {
        id,
        sender: 'bot',
        text: 'With PosBytz Recipe BOM (Bill of Materials), your raw ingredients deplete in real-time as orders are placed! For example: selling 1 Paneer Tikka Burger automatically deducts 1 Bun, 1 Paneer Patty, and 15g of Signature Mayo from your central stock ledger, alerting you before you run out.',
        timestamp,
        emotion: 'talking',
        action: onOpenOrderSystem
          ? {
              label: 'Open Live Order & Recipe Portal',
              icon: 'order',
              handler: onOpenOrderSystem,
            }
          : undefined,
        suggestedQuestions: [
          'How do low-stock alerts work?',
          'Can I manage multi-outlet central warehouses?',
          'Test Live POS Terminal',
        ],
      };
    }

    // 3. UPI QR & Soundbox
    if (q.includes('upi') || q.includes('qr') || q.includes('soundbox') || q.includes('payment') || q.includes('paytm') || q.includes('gpay') || q.includes('phonepe')) {
      return {
        id,
        sender: 'bot',
        text: 'PosBytz natively integrates with Indian UPI! Each bill dynamically generates a BharatQR / UPI QR code embedded directly onto the customer receipt or customer-facing display. Once paid, the POS automatically verifies the transaction and triggers instant audio confirmation on UPI Soundboxes.',
        timestamp,
        emotion: 'happy',
        action: onOpenFreeTrial
          ? {
              label: 'Explore UPI Integration with Free Trial',
              icon: 'trial',
              handler: onOpenFreeTrial,
            }
          : undefined,
        suggestedQuestions: [
          'Does it support split payments?',
          'Can I use card swipe EDC machines?',
          'Indian GST e-Invoicing details',
        ],
      };
    }

    // 4. Indian GST Compliance
    if (q.includes('gst') || q.includes('tax') || q.includes('invoice') || q.includes('e-invoice') || q.includes('hsn') || q.includes('india')) {
      return {
        id,
        sender: 'bot',
        text: 'PosBytz is 100% compliant with Indian Goods & Services Tax (GST). It automatically applies CGST & SGST (or IGST for interstate deliveries), formats B2B & B2C invoices with HSN/SAC codes, and generates single-click GSTR-1 and GSTR-3B audit-ready summaries.',
        timestamp,
        emotion: 'talking',
        suggestedQuestions: [
          'Can I configure composite tax schemes?',
          'How does Zomato/Swiggy tax reconciliation work?',
          'Book a 1-on-1 GST Demo',
        ],
      };
    }

    // 5. Creator & Team CodeX
    if (q.includes('pawan') || q.includes('patil') || q.includes('codex') || q.includes('who made') || q.includes('who built') || q.includes('team') || q.includes('engineer')) {
      return {
        id,
        sender: 'bot',
        text: 'This enterprise-grade PosBytz Cloud ERP experience was proudly engineered by Pawan Patil and Team CodeX! Built with modern full-stack performance, responsive motion physics, offline resiliency, and tailored specifically for Indian food operations.',
        timestamp,
        emotion: 'happy',
        suggestedQuestions: [
          'Launch the Live POS Terminal',
          'Open CodeX Order & Stock Portal',
          'Watch the 2-Minute Demo',
        ],
      };
    }

    // 6. Pricing & Free Trial
    if (q.includes('price') || q.includes('cost') || q.includes('plan') || q.includes('trial') || q.includes('free') || q.includes('demo')) {
      return {
        id,
        sender: 'bot',
        text: 'We offer flexible plans starting with a 14-day fully featured Free Trial! No credit card is required. You can test live billing, unlimited menu items, recipe BOM tracking, and multi-user cashier permissions right away.',
        timestamp,
        emotion: 'happy',
        action: onOpenFreeTrial
          ? {
              label: 'Start 14-Day Free Trial',
              icon: 'trial',
              handler: onOpenFreeTrial,
            }
          : onOpenBookDemo
          ? {
              label: 'Schedule a Guided Demo',
              icon: 'demo',
              handler: onOpenBookDemo,
            }
          : undefined,
        suggestedQuestions: [
          'What happens after the 14-day trial?',
          'Is hardware included in pricing?',
          'Schedule a 1-on-1 walkthrough',
        ],
      };
    }

    // 7. Kitchen KDS
    if (q.includes('kds') || q.includes('kitchen') || q.includes('chef') || q.includes('order status') || q.includes('cook')) {
      return {
        id,
        sender: 'bot',
        text: 'PosBytz Kitchen Display System (KDS) eliminates paper kitchen order tickets (KOT). Incoming orders from your counters, online QR menus, and aggregators (Zomato/Swiggy) route straight to kitchen monitors with color-coded timers so your chefs never miss a dish!',
        timestamp,
        emotion: 'talking',
        action: onLaunchTerminal
          ? {
              label: 'View KDS in Interactive Terminal',
              icon: 'terminal',
              handler: onLaunchTerminal,
            }
          : undefined,
        suggestedQuestions: [
          'Can different kitchen stations have separate screens?',
          'How does order bump bar work?',
          'Tell me about Recipe BOM',
        ],
      };
    }

    // Default conversational fallback with relevant restaurant tips
    return {
      id,
      sender: 'bot',
      text: "I'm on it! PosBytz is equipped with everything your food or retail business needs: instant cloud POS billing, live recipe ingredient depletion, automated UPI QR soundbox receipts, and Indian GST reports.",
      timestamp,
      emotion: 'happy',
      suggestedQuestions: [
        '🚀 Launch Live POS Terminal',
        '🥘 Show Recipe Stock Depletion',
        '⚡ How does UPI QR work?',
        '🇮🇳 Indian GST & Invoicing Support',
      ],
    };
  };

  // Reset conversation
  const handleResetConversation = () => {
    setMessages(initialMessages);
    setBotEmotion('happy');
    playAudioCue('pop');
  };

  return (
    <>
      {/* FLOATING BOT LAUNCHER BADGE (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50 select-none flex flex-col items-end">
        {/* Floating Speech Tooltip Bubble */}
        <AnimatePresence>
          {!isOpen && showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="relative mb-3 mr-2 p-3 sm:p-3.5 max-w-[260px] sm:max-w-[290px] rounded-2xl bg-[#18181B] text-white shadow-2xl border border-stone-700/80 cursor-pointer"
              onClick={handleOpenChat}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="absolute top-2 right-2 text-stone-400 hover:text-white"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#F97316] animate-ping" />
                <span className="text-[11px] font-bold text-[#F97316] uppercase tracking-wider font-display">
                  ByteBot AI • Online
                </span>
              </div>
              <p className="text-xs text-stone-200 leading-relaxed font-body">
                Need help with <strong>POS billing</strong>, <strong>recipe stock</strong>, or <strong>UPI QR</strong>? Click me to chat! 👋
              </p>

              {/* Speech bubble pointer arrow */}
              <div className="absolute -bottom-1.5 right-6 w-3.5 h-3.5 bg-[#18181B] border-b border-r border-stone-700/80 transform rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Robot Trigger Button */}
        {!isOpen && (
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative cursor-pointer"
            onClick={handleOpenChat}
            id="open-bytebot-chat-btn"
          >
            {/* Unread Message Pill with Ping */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 z-30 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-black text-white shadow-lg border-2 border-white">
                {unreadCount}
              </span>
            )}

            {/* Glowing Orb Backdrop */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#F97316] via-amber-400 to-[#EA580C] opacity-75 blur-md animate-pulse" />

            {/* Floating Robot Housing */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-b from-[#2A2B36] to-[#12131C] border-2 border-orange-500/80 shadow-[0_12px_30px_rgba(249,115,22,0.45)] flex items-center justify-center overflow-visible">
              <RobotAvatar
                emotion={botEmotion}
                size="sm"
                isFloating={true}
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* EXPANDED INTERACTIVE CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? 'auto' : undefined,
            }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[420px] max-w-[440px] bg-white rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.28)] border border-stone-200/90 overflow-hidden flex flex-col font-sans"
            style={{ maxHeight: isMinimized ? '76px' : '650px', height: isMinimized ? 'auto' : '86vh' }}
            id="bytebot-chat-window"
          >
            {/* CHAT HEADER WITH ANIMATED ROBOT COMPANION */}
            <div className="px-4 sm:px-5 py-3.5 bg-gradient-to-r from-[#18181B] via-[#202129] to-[#18181B] text-white flex items-center justify-between border-b border-stone-800 shrink-0">
              <div className="flex items-center gap-3">
                {/* Mini Robot Face in Header */}
                <div className="w-11 h-11 rounded-2xl bg-stone-900 border border-stone-700 flex items-center justify-center shrink-0 shadow-inner">
                  <RobotAvatar
                    emotion={botEmotion}
                    size="sm"
                    isFloating={false}
                  />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-white font-display">
                      ByteBot AI
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-[#F97316] text-white uppercase tracking-wider">
                      CodeX
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-400 font-body">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>
                      {isTyping
                        ? 'Thinking & typing...'
                        : 'Active • PosBytz ERP Guide'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Icons in Header */}
              <div className="flex items-center gap-1 text-stone-400">
                {/* Sound Toggle */}
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1.5 rounded-lg hover:bg-stone-800 hover:text-white transition-colors"
                  title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
                  id="bytebot-toggle-sound"
                >
                  {soundEnabled ? (
                    <Volume2 className="w-4 h-4 text-[#F97316]" />
                  ) : (
                    <VolumeX className="w-4 h-4" />
                  )}
                </button>

                {/* Reset History */}
                <button
                  onClick={handleResetConversation}
                  className="p-1.5 rounded-lg hover:bg-stone-800 hover:text-white transition-colors"
                  title="Reset conversation"
                  id="bytebot-reset-chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Minimize Button */}
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 rounded-lg hover:bg-stone-800 hover:text-white transition-colors"
                  title={isMinimized ? 'Expand' : 'Minimize'}
                  id="bytebot-minimize-chat"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-stone-800 hover:text-white transition-colors ml-0.5"
                  title="Close chat"
                  id="bytebot-close-chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CHAT BODY (Hidden when minimized) */}
            {!isMinimized && (
              <>
                {/* Scrollable Message Stream */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#FAF9F6] text-stone-800 text-sm font-body">
                  {/* Banner Info Pill */}
                  <div className="text-center my-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-[11px] font-bold text-orange-950">
                      <Sparkles className="w-3 h-3 text-[#F97316]" />
                      <span>Engineered by Pawan Patil • Team CodeX</span>
                    </span>
                  </div>

                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div className="flex items-end gap-2 max-w-[88%]">
                        {/* Mini Bot Icon on Left for Bot messages */}
                        {msg.sender === 'bot' && (
                          <div className="w-7 h-7 rounded-full bg-[#18181B] border border-orange-500/40 flex items-center justify-center shrink-0 mb-1">
                            <Bot className="w-3.5 h-3.5 text-[#F97316]" />
                          </div>
                        )}

                        {/* Message Bubble Container */}
                        <div
                          className={`relative p-3.5 rounded-2xl shadow-xs leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-[#F97316] text-white rounded-br-xs'
                              : 'bg-white text-stone-800 border border-stone-200/80 rounded-bl-xs'
                          }`}
                        >
                          <p className="whitespace-pre-line text-[13.5px] leading-relaxed">
                            {msg.text}
                          </p>

                          {/* Actionable Button Inside Bot Message */}
                          {msg.action && (
                            <div className="mt-3 pt-2.5 border-t border-stone-100">
                              <button
                                onClick={() => {
                                  msg.action?.handler();
                                  setIsOpen(false);
                                }}
                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#18181B] text-white text-xs font-bold shadow-md hover:bg-stone-900 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                              >
                                {msg.action.icon === 'terminal' && (
                                  <Terminal className="w-3.5 h-3.5 text-[#F97316]" />
                                )}
                                {msg.action.icon === 'order' && (
                                  <UtensilsCrossed className="w-3.5 h-3.5 text-[#F97316]" />
                                )}
                                {msg.action.icon === 'demo' && (
                                  <Calendar className="w-3.5 h-3.5 text-[#F97316]" />
                                )}
                                {msg.action.icon === 'trial' && (
                                  <Zap className="w-3.5 h-3.5 text-[#F97316]" />
                                )}
                                <span>{msg.action.label}</span>
                                <ArrowRight className="w-3 h-3 text-stone-400" />
                              </button>
                            </div>
                          )}

                          {/* Message Footer (Timestamp & Copy) */}
                          <div
                            className={`mt-1.5 flex items-center justify-between gap-3 text-[10px] ${
                              msg.sender === 'user'
                                ? 'text-orange-100'
                                : 'text-stone-600'
                            }`}
                          >
                            <span>{msg.timestamp}</span>

                            <button
                              onClick={() => handleCopyMessage(msg.id, msg.text)}
                              className="hover:opacity-100 opacity-60 transition-opacity"
                              title="Copy text"
                            >
                              {copiedId === msg.id ? (
                                <Check className="w-3 h-3 text-emerald-500" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Suggested Questions Pills directly under Bot Message */}
                      {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                        <div className="mt-2.5 ml-9 flex flex-wrap gap-1.5 max-w-[92%]">
                          {msg.suggestedQuestions.map((sugg, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => handleSendMessage(sugg)}
                              className="text-left px-3 py-1.5 rounded-full bg-white hover:bg-orange-50 text-stone-700 hover:text-orange-950 text-xs font-semibold border border-stone-200/90 shadow-2xs hover:border-orange-300 transition-all cursor-pointer"
                            >
                              {sugg}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Thinking/Typing Indicator with Animated Robot Head */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2.5 ml-1"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#18181B] border border-orange-500/40 flex items-center justify-center shrink-0">
                        <Bot className="w-3.5 h-3.5 text-[#F97316]" />
                      </div>
                      <div className="px-3.5 py-2.5 rounded-2xl bg-white border border-stone-200 shadow-2xs flex items-center gap-1.5">
                        <span className="text-xs text-stone-500 font-medium">
                          ByteBot is computing
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* QUICK TOPIC PROMPTS STRIP */}
                <div className="px-3.5 py-2 bg-white border-t border-stone-200/70 overflow-x-auto scrollbar-none flex items-center gap-1.5 text-xs">
                  <span className="text-[10px] font-bold text-stone-600 uppercase tracking-wider shrink-0 mr-1">
                    Quick:
                  </span>
                  <button
                    onClick={() => handleSendMessage('Show me the automated packaging and delivery video')}
                    className="shrink-0 px-2.5 py-1 rounded-full bg-orange-100 hover:bg-orange-200 border border-orange-300 text-[#9A3412] text-[11px] font-bold transition-all"
                  >
                    📹 Packaging Video
                  </button>
                  <button
                    onClick={() => handleSendMessage('Launch Live POS Terminal')}
                    className="shrink-0 px-2.5 py-1 rounded-full bg-stone-100 hover:bg-orange-50 hover:text-[#F97316] hover:border-orange-300 border border-stone-200 text-stone-700 text-[11px] font-medium transition-all"
                  >
                    🚀 Launch POS
                  </button>
                  <button
                    onClick={() => handleSendMessage('How does Recipe BOM stock depletion work?')}
                    className="shrink-0 px-2.5 py-1 rounded-full bg-stone-100 hover:bg-orange-50 hover:text-[#F97316] hover:border-orange-300 border border-stone-200 text-stone-700 text-[11px] font-medium transition-all"
                  >
                    🥘 Recipe Stocks
                  </button>
                  <button
                    onClick={() => handleSendMessage('How does UPI QR and Soundbox work?')}
                    className="shrink-0 px-2.5 py-1 rounded-full bg-stone-100 hover:bg-orange-50 hover:text-[#F97316] hover:border-orange-300 border border-stone-200 text-stone-700 text-[11px] font-medium transition-all"
                  >
                    ⚡ UPI QR
                  </button>
                  <button
                    onClick={() => handleSendMessage('What are the Indian GST invoicing features?')}
                    className="shrink-0 px-2.5 py-1 rounded-full bg-stone-100 hover:bg-orange-50 hover:text-[#F97316] hover:border-orange-300 border border-stone-200 text-stone-700 text-[11px] font-medium transition-all"
                  >
                    🇮🇳 Indian GST
                  </button>
                </div>

                {/* CHAT INPUT FORM */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="p-3 bg-white border-t border-stone-200/80 flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="Ask ByteBot about POS, recipes, UPI QR..."
                    className="flex-1 px-4 py-2.5 rounded-full bg-stone-50 border border-stone-200 focus:border-[#F97316] focus:bg-white text-stone-900 text-xs sm:text-sm placeholder:text-stone-600 outline-none transition-all"
                    id="bytebot-chat-input"
                  />

                  <button
                    type="submit"
                    disabled={!inputQuery.trim() || isTyping}
                    className="w-10 h-10 rounded-full bg-[#F97316] hover:bg-[#EA580C] disabled:bg-stone-200 disabled:cursor-not-allowed text-white flex items-center justify-center shrink-0 shadow-md hover:shadow-lg transition-all cursor-pointer transform active:scale-95"
                    title="Send message"
                    id="bytebot-send-btn"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
