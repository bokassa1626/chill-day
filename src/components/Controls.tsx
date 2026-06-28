import React from "react";
import { 
  Download, 
  Upload, 
  Type, 
  DollarSign, 
  CalendarDays,
  Smile
} from "lucide-react";

interface ControlsProps {
  customSlogan: string;
  customTicketPrice: string;
  customDate: string;
  hasPhoto: boolean;
  isDownloading: boolean;
  onSloganChange: (val: string) => void;
  onTicketPriceChange: (val: string) => void;
  onDateChange: (val: string) => void;
  onTriggerUpload: () => void;
  onDownload: () => void;
  onLoadExamplePhoto: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  customSlogan,
  customTicketPrice,
  customDate,
  hasPhoto,
  isDownloading,
  onSloganChange,
  onTicketPriceChange,
  onDateChange,
  onTriggerUpload,
  onDownload,
  onLoadExamplePhoto
}) => {
  return (
    <div className="w-full max-w-[540px] bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-6 text-white backdrop-blur-sm">
      
      {/* File Upload / Import Zone */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
          Étape 1 : Choisissez votre photo
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onTriggerUpload}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-lg shadow-amber-500/20 active:scale-[0.98] transition duration-150 cursor-pointer text-sm"
          >
            <Upload className="w-4.5 h-4.5" />
            <span>Importer ma photo</span>
          </button>

          <button
            type="button"
            onClick={onLoadExamplePhoto}
            className="flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-3 px-4 rounded-xl border border-slate-700 active:scale-[0.98] transition duration-150 cursor-pointer text-sm"
          >
            <Smile className="w-4.5 h-4.5 text-amber-400" />
            <span>Utiliser un exemple</span>
          </button>
        </div>
      </div>

      {/* Step 2: Customize Texts */}
      <div className="space-y-4 border-t border-slate-800 pt-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
          Étape 2 : Personnalisez les textes de l'affiche
        </label>

        <div className="space-y-3">
          {/* Custom Slogan */}
          <div className="space-y-1.5">
            <div className="flex items-center space-x-1 text-slate-400 text-xs">
              <Type className="w-3.5 h-3.5" />
              <span>Votre Slogan (Bannière centrale)</span>
            </div>
            <input
              type="text"
              value={customSlogan}
              onChange={(e) => onSloganChange(e.target.value.toUpperCase())}
              placeholder="J'Y SERAIS"
              maxLength={20}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-amber-500 text-amber-200 uppercase font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Custom Ticket Price */}
            <div className="space-y-1.5">
              <div className="flex items-center space-x-1 text-slate-400 text-xs">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Prix du billet</span>
              </div>
              <input
                type="text"
                value={customTicketPrice}
                onChange={(e) => onTicketPriceChange(e.target.value)}
                placeholder="5$"
                maxLength={6}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-amber-500 text-amber-200 font-semibold"
              />
            </div>

            {/* Custom Date */}
            <div className="space-y-1.5">
              <div className="flex items-center space-x-1 text-slate-400 text-xs">
                <CalendarDays className="w-3.5 h-3.5" />
                <span>Date de l'événement</span>
              </div>
              <input
                type="text"
                value={customDate}
                onChange={(e) => onDateChange(e.target.value)}
                placeholder="5 JUILLET 2026"
                maxLength={20}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-amber-500 text-amber-200 font-semibold"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Download Action Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onDownload}
          disabled={isDownloading}
          className="relative w-full overflow-hidden flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold py-3.5 px-6 rounded-2xl shadow-xl shadow-emerald-950/40 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.99] transition duration-150 cursor-pointer"
        >
          {isDownloading ? (
            <>
              {/* Spinning loading indicator */}
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Génération de l'affiche HD en cours...</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5 animate-bounce" />
              <span className="text-base">Télécharger mon affiche</span>
            </>
          )}
        </button>
        
        {!hasPhoto && (
          <p className="text-center text-[11px] text-amber-400/80 mt-2 italic">
            💡 Astuce : Importez votre photo ou utilisez un exemple avant de télécharger pour l'intégrer au centre !
          </p>
        )}
      </div>

    </div>
  );
};
