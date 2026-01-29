
import React, { useState } from 'react';
import { SAMPLE_DATA } from './constants';
import { SessionData } from './types';
import { 
  History, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Smile, 
  Frown, 
  Meh,
  Activity,
  Wifi,
  X
} from 'lucide-react';

const App: React.FC = () => {
  const [selectedSession, setSelectedSession] = useState<SessionData | null>(null);
  const latestSession = SAMPLE_DATA[0];

  const getFaceIcon = (score: number) => {
    if (score >= 80) return <Smile className="text-cyan-400" size={24} />;
    if (score >= 50) return <Meh className="text-yellow-400" size={24} />;
    return <Frown className="text-red-400" size={24} />;
  };

  const getDelayLabel = (delay: number) => {
    if (delay === 0) return "정시 출발";
    if (delay <= 5) return `${delay}분 지연`;
    return `${delay}분 초과`;
  };

  const calculateCheckRate = (items: any[]) => {
    const checked = items.filter(i => i.checked).length;
    return Math.round((checked / items.length) * 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-10">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 p-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-cyan-400 italic">HardCarry</h1>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            <Wifi size={10} className="text-green-500" /> Mirror Connected
          </p>
        </div>
        <button className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
          <Activity size={20} />
        </button>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-6">
        {/* Latest Summary Card */}
        <section>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/20 rounded-2xl p-5 shadow-2xl shadow-cyan-900/10">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-xs font-semibold">Latest Analysis</span>
              <span className="text-xs text-slate-400">{new Date(latestSession.timestamp).toLocaleDateString()}</span>
            </div>
            <h2 className="text-lg font-bold mb-2">오늘의 총평</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              "{latestSession.llm_coaching_msg}"
            </p>
            <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-400">준비율</div>
                  <div className="text-sm font-bold">{calculateCheckRate(latestSession.items_checked)}%</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <Clock size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-400">출발 현황</div>
                  <div className="text-sm font-bold text-green-400">On-Time</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* History List */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <History size={18} className="text-slate-400" />
            <h3 className="text-md font-semibold text-slate-400 uppercase tracking-widest text-xs">Past Sessions</h3>
          </div>
          
          <div className="space-y-3">
            {SAMPLE_DATA.map((session) => (
              <div 
                key={session.session_id}
                onClick={() => setSelectedSession(session)}
                className="group bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex items-center justify-between active:scale-[0.98] transition-transform cursor-pointer hover:border-slate-700"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${session.departure_delay > 5 ? 'bg-red-500/10 text-red-400' : 'bg-slate-800 text-slate-400'}`}>
                    {session.departure_delay > 5 ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{new Date(session.timestamp).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', weekday: 'short' })}</div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 size={12} /> {calculateCheckRate(session.items_checked)}%
                      </span>
                      <span>•</span>
                      <span className={session.departure_delay > 5 ? 'text-red-400' : ''}>
                        {getDelayLabel(session.departure_delay)}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Detail Modal */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-slate-900 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold">세션 상세 리포트</h3>
                <p className="text-sm text-slate-400">{new Date(selectedSession.timestamp).toLocaleString('ko-KR')}</p>
              </div>
              <button 
                onClick={() => setSelectedSession(null)}
                className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Face Score Section */}
              <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-slate-400">표정 상태 점수</span>
                  <div className="flex items-center gap-2">
                    {getFaceIcon(selectedSession.face_score)}
                    <span className="font-bold text-lg">{selectedSession.face_score}점</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-700 ease-out ${
                      selectedSession.face_score >= 80 ? 'bg-cyan-400' : 
                      selectedSession.face_score >= 50 ? 'bg-yellow-400' : 'bg-red-400'
                    }`}
                    style={{ width: `${selectedSession.face_score}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-3 italic leading-snug">
                  M1 센서가 감지한 출발 직전의 표정 데이터입니다.
                </p>
              </div>

              {/* Items List */}
              <div>
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 ml-1">소지품 체크리스트</h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedSession.items_checked.map((item, idx) => (
                    <div key={idx} className={`flex items-center gap-3 p-3 rounded-xl border ${item.checked ? 'border-cyan-500/30 bg-cyan-500/5' : 'border-slate-800 bg-slate-800/30 text-slate-500'}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${item.checked ? 'bg-cyan-500 text-slate-900' : 'border border-slate-700'}`}>
                        {item.checked && <CheckCircle2 size={12} />}
                      </div>
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <button 
                onClick={() => setSelectedSession(null)}
                className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl transition-colors shadow-lg shadow-cyan-500/20"
              >
                확인 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
