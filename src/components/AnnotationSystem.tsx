import { useState, useRef, useEffect } from 'react';
import { Highlighter, X, Pencil, Trash2, ChevronDown, ChevronUp, BookMarked } from 'lucide-react';
import { Annotation } from '../types';
import { useAnnotations } from '../hooks/useAnnotations';

interface AnnotationSystemProps {
  slug: string;
}

const ANNOTATION_COLORS = [
  { name: 'Gold', value: '#C9A84C' },
  { name: 'Red', value: '#B91C1C' },
  { name: 'Green', value: '#065F46' },
  { name: 'Blue', value: '#1D4ED8' },
];

export default function AnnotationSystem({ slug }: AnnotationSystemProps) {
  const { annotations, addAnnotation, deleteAnnotation, updateAnnotation } = useAnnotations(slug);
  const [selectedText, setSelectedText] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  const [note, setNote] = useState('');
  const [selectedColor, setSelectedColor] = useState('#C9A84C');
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNote, setEditNote] = useState('');
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.toString().trim().length < 3) {
        if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
          setShowPopup(false);
        }
        return;
      }

      // Only annotate within the article body
      const articleBody = document.getElementById('article-body');
      if (!articleBody) return;
      const range = sel.getRangeAt(0);
      if (!articleBody.contains(range.commonAncestorContainer)) {
        setShowPopup(false);
        return;
      }

      const text = sel.toString().trim();
      setSelectedText(text);

      const rect = range.getBoundingClientRect();
      setPopupPos({
        x: rect.left + rect.width / 2 + window.scrollX,
        y: rect.top + window.scrollY - 10,
      });
      setShowPopup(true);
      setNote('');
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const handleSave = () => {
    if (!selectedText) return;
    addAnnotation(selectedText, note, selectedColor);
    setShowPopup(false);
    setSelectedText('');
    setNote('');
    window.getSelection()?.removeAllRanges();
    setPanelOpen(true);
  };

  const handleEditSave = (id: string) => {
    updateAnnotation(id, editNote);
    setEditingId(null);
  };

  return (
    <>
      {/* Floating annotation popup */}
      {showPopup && (
        <div
          ref={popupRef}
          className="fixed z-50 w-72 bg-abyot-black border border-white/20 shadow-2xl"
          style={{
            left: Math.min(popupPos.x - 144, window.innerWidth - 300),
            top: popupPos.y - 180,
          }}
        >
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Highlighter size={14} className="text-abyot-gold" />
              <span className="font-mono text-label uppercase tracking-widest text-white/60">Annotate</span>
            </div>
            <p className="font-body text-body-sm text-white/50 italic mb-3 line-clamp-2 border-l-2 border-abyot-gold pl-2">
              "{selectedText.slice(0, 80)}{selectedText.length > 80 ? '…' : ''}"
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note (optional)…"
              rows={2}
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 font-body text-body-sm p-2 outline-none focus:border-abyot-gold/50 resize-none mb-3"
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {ANNOTATION_COLORS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setSelectedColor(c.value)}
                    className="w-4 h-4 rounded-full border-2 transition-transform hover:scale-110"
                    style={{
                      backgroundColor: c.value,
                      borderColor: selectedColor === c.value ? 'white' : 'transparent',
                    }}
                    title={c.name}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPopup(false)}
                  className="font-mono text-label uppercase tracking-widest text-white/40 hover:text-white transition-colors px-2 py-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="font-mono text-label uppercase tracking-widest text-abyot-black bg-abyot-gold hover:bg-abyot-gold-light px-3 py-1 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Annotation panel toggle */}
      {annotations.length > 0 && (
        <div className="my-8 border border-abyot-rule">
          <button
            onClick={() => setPanelOpen(!panelOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-abyot-paper-dark hover:bg-abyot-rule/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <BookMarked size={15} className="text-abyot-gold" />
              <span className="font-mono text-label uppercase tracking-widest text-abyot-black">
                My Annotations ({annotations.length})
              </span>
            </div>
            {panelOpen ? (
              <ChevronUp size={15} className="text-abyot-slate-light" />
            ) : (
              <ChevronDown size={15} className="text-abyot-slate-light" />
            )}
          </button>

          {panelOpen && (
            <div className="divide-y divide-abyot-rule">
              {annotations.map((ann: Annotation) => (
                <div key={ann.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-0.5 h-full min-h-8 flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: ann.color }}
                    />
                    <div className="flex-1">
                      <p className="font-body text-body-sm text-abyot-slate italic mb-2 line-clamp-2">
                        "{ann.selectedText.slice(0, 120)}{ann.selectedText.length > 120 ? '…' : ''}"
                      </p>
                      {editingId === ann.id ? (
                        <div>
                          <textarea
                            value={editNote}
                            onChange={(e) => setEditNote(e.target.value)}
                            rows={2}
                            className="w-full border border-abyot-rule bg-white text-abyot-black font-body text-body-sm p-2 outline-none focus:border-abyot-red resize-none mb-2"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditSave(ann.id)}
                              className="font-mono text-label uppercase tracking-widest text-white bg-abyot-red px-3 py-1"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="font-mono text-label uppercase tracking-widest text-abyot-slate-light px-3 py-1"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        ann.note && (
                          <p className="font-body text-body-sm text-abyot-black mb-2">{ann.note}</p>
                        )
                      )}
                      <div className="flex items-center gap-3 mt-1">
                        <span className="font-mono text-label text-abyot-slate-light uppercase tracking-widest">
                          {new Date(ann.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => { setEditingId(ann.id); setEditNote(ann.note); }}
                        className="p-1.5 text-abyot-slate-light hover:text-abyot-black transition-colors"
                        title="Edit note"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => deleteAnnotation(ann.id)}
                        className="p-1.5 text-abyot-slate-light hover:text-abyot-red transition-colors"
                        title="Delete annotation"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Hint if no annotations yet */}
      {annotations.length === 0 && (
        <div className="my-6 flex items-center gap-2 text-abyot-slate-light">
          <Highlighter size={13} />
          <span className="font-mono text-label uppercase tracking-widest">
            Select any text to annotate
          </span>
        </div>
      )}
    </>
  );
}
