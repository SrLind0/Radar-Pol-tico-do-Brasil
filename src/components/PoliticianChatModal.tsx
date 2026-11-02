import React, { useState } from 'react';
import { Politico } from '../types';
import { MessageSquare, Send, Sparkles, X, Shield, RefreshCw } from 'lucide-react';
import { CandidateAvatar } from './CandidateAvatar';

interface Props {
  politico: Politico;
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  fonte?: string;
  timestamp?: string;
}

export const PoliticianChatModal: React.FC<Props> = ({ politico, isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Olá! Sou o assistente de transparência oficial do Radar Político. Você pode me fazer perguntas objetivas sobre ${politico.nomeUrna}. Respondo exclusivamente com base em dados oficiais do TSE, Congresso e Judiciário, em Linguagem Simples e sem juízo de valor.`,
      fonte: politico.fonteOficial,
      timestamp: politico.auditoriaTimestamp,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const sugestoes = [
    'Quanto ele(a) gastou em passagens aéreas?',
    'Quais leis foram sancionadas com a atuação dele(a)?',
    'Qual o patrimônio declarado à Justiça Eleitoral?',
    'Existe algum processo judicial em andamento?',
    'Qual a presença em plenário e sessões de votação?',
  ];

  if (!isOpen) return null;

  const handleSend = async (perguntaTexto: string) => {
    const q = perguntaTexto.trim();
    if (!q || loading) return;

    const userMsg: Message = {
      id: String(Date.now()),
      sender: 'user',
      text: q,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat-politico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          politicoId: politico.id,
          pergunta: q,
        }),
      });

      if (!res.ok) {
        throw new Error('Falha na resposta do servidor.');
      }

      const data = await res.json();
      const assistantMsg: Message = {
        id: String(Date.now() + 1),
        sender: 'assistant',
        text: data.resposta,
        fonte: data.fonte || politico.fonteOficial,
        timestamp: data.timestamp || politico.auditoriaTimestamp,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'assistant',
          text: 'Não foi possível consultar os dados neste instante. Por favor, tente novamente.',
          fonte: politico.fonteOficial,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full h-[85vh] max-h-[700px] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <CandidateAvatar
              nomeUrna={politico.nomeUrna}
              siglaPartido={politico.siglaPartido}
              numeroUrna={politico.numeroUrna}
              size="sm"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-white">{politico.nomeUrna}</h3>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
                  {politico.siglaPartido}-{politico.uf}
                </span>
              </div>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                <Shield className="w-3 h-3" />
                RAG Estrito · 0 Alucinação · Linguagem Simples
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audit banner */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 text-[10px] text-slate-600 flex items-center justify-between">
          <span className="truncate">
            Auditoria: {politico.auditoriaTimestamp}
          </span>
          <span className="font-semibold text-slate-700 shrink-0">Dados Oficiais</span>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-xs font-medium'
                    : 'bg-white text-slate-800 rounded-bl-xs border border-slate-200 shadow-xs'
                }`}
              >
                {m.sender === 'assistant' && (
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-blue-700 uppercase tracking-wider mb-1">
                    <Sparkles className="w-3 h-3" /> Resposta em Linguagem Simples
                  </div>
                )}
                <p className="whitespace-pre-line">{m.text}</p>
                {m.fonte && (
                  <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500">
                    <strong>Fonte oficial:</strong> {m.fonte}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-3 rounded-2xl border border-slate-200 w-fit">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
              <span>Consultando registros oficiais com IA neutra...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestions Chips */}
        <div className="p-2.5 bg-white border-t border-slate-100 overflow-x-auto whitespace-nowrap space-x-1.5 scrollbar-none">
          <span className="text-[10px] font-semibold text-slate-500 uppercase px-1">Perguntas Rápidas:</span>
          {sugestoes.map((sugestao, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(sugestao)}
              disabled={loading}
              className="inline-block text-[11px] bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 px-3 py-1.5 rounded-full border border-slate-200 transition-colors disabled:opacity-50"
            >
              {sugestao}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputText);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Pergunte algo sobre ${politico.nomeUrna}...`}
              className="flex-1 bg-slate-100 text-slate-900 placeholder:text-slate-400 text-xs px-4 py-2.5 rounded-2xl border border-transparent focus:border-blue-500 focus:bg-white focus:outline-hidden transition-all"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || loading}
              className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-2xl transition-colors shadow-xs"
              title="Enviar pergunta"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="mt-1.5 text-[9px] text-center text-slate-600">
            A IA do Radar Político consulta apenas dados oficiais já homologados, sem juízo de valor.
          </p>
        </div>
      </div>
    </div>
  );
};
