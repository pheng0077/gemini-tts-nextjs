'use client';

import React, { useState, useMemo } from 'react';
import { VoiceOption } from '@/lib/types';
import { SearchIcon, ChevronDownIcon } from '@/components/Icons';

interface VoiceSelectorProps {
  voices: VoiceOption[];
  selectedVoiceId: string;
  onSelect: (voiceId: string) => void;
  isLoading?: boolean;
}

export function VoiceSelector({ voices, selectedVoiceId, onSelect, isLoading }: VoiceSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const selectedVoice = voices.find(v => v.id === selectedVoiceId);

  const filteredVoices = useMemo(() => {
    return voices.filter(voice => {
      const term = search.toLowerCase();
      return voice.name.toLowerCase().includes(term) || 
             voice.tags?.some(tag => tag.toLowerCase().includes(term));
    });
  }, [voices, search]);

  const handleSelect = (voiceId: string) => {
    onSelect(voiceId);
    setIsOpen(false);
    setSearch('');
  };

  if (isLoading) {
    return (
      <div className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-sm text-zinc-500 animate-pulse">
        Loading voices...
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-sm text-zinc-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none flex items-center justify-between hover:bg-zinc-900 transition"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium">{selectedVoice?.name || 'Select Voice'}</span>
          {selectedVoice && (
            <span className="text-xs text-zinc-500">
              {selectedVoice.gender} • {selectedVoice.pitch}
            </span>
          )}
        </div>
        <ChevronDownIcon className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-20 w-full mt-1 bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl max-h-80 overflow-hidden flex flex-col">
            {/* Search Bar */}
            <div className="p-2 border-b border-zinc-800 sticky top-0 bg-zinc-900 z-30">
              <div className="relative">
                <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search voices..."
                  className="w-full bg-zinc-950 border border-zinc-700 rounded px-8 py-1.5 text-xs text-zinc-200 placeholder-zinc-600 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  autoFocus
                />
              </div>
            </div>

            {/* Voice List */}
            <div className="overflow-y-auto">
              {filteredVoices.length === 0 ? (
                <div className="p-4 text-center text-zinc-500 text-sm">
                  No voices found
                </div>
              ) : (
                filteredVoices.map((voice) => (
                  <button
                    key={voice.id}
                    onClick={() => handleSelect(voice.id)}
                    className={`w-full px-3 py-2 text-left hover:bg-zinc-800 transition flex items-center justify-between group ${
                      voice.id === selectedVoiceId ? 'bg-zinc-800/50' : ''
                    }`}
                  >
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-medium text-sm text-zinc-200">{voice.name}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                          voice.gender === 'Male' 
                            ? 'bg-blue-900/30 text-blue-400' 
                            : voice.gender === 'Female'
                            ? 'bg-pink-900/30 text-pink-400'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}>
                          {voice.gender}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <span>{voice.pitch}</span>
                        {voice.tags && voice.tags.length > 0 && (
                          <>
                            <span>•</span>
                            <span>{voice.tags.join(', ')}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
