import React from "react";
import { 
  Crown, 
  MapPin, 
  Calendar, 
  Music, 
  PartyPopper, 
  Sparkles, 
  Volume2, 
  Trophy, 
  Dribbble, 
  Tv, 
  Palmtree, 
  Camera 
} from "lucide-react";
import beachSunsetBg from "../assets/images/beach_sunset_bg_1782660913350.jpg";

interface PosterProps {
  photoUrl: string | null;
  scale: number;
  posX: number;
  posY: number;
  rotation: number;
  customSlogan: string;
  customTicketPrice: string;
  customDate: string;
  onPhotoCircleClick?: () => void;
}

export const Poster = React.forwardRef<HTMLDivElement, PosterProps>(({
  photoUrl,
  scale,
  posX,
  posY,
  rotation,
  customSlogan,
  customTicketPrice,
  customDate,
  onPhotoCircleClick
}, ref) => {
  return (
    <div
      ref={ref}
      id="legends-poster-canvas"
      className="relative overflow-hidden rounded-2xl shadow-2xl border-4 select-none border-shadow font-sans shrink-0"
      style={{
        width: "540px",
        height: "720px",
        borderColor: "#0f172a", // slate-900 hex
        backgroundColor: "#020617", // slate-950 hex
      }}
    >
      {/* Background Image */}
      <img
        src={beachSunsetBg}
        alt="Plage Sunset"
        className="absolute inset-0 w-full h-full object-cover z-0"
        referrerPolicy="no-referrer"
      />

      {/* Dark overlay gradients for text readability using hex/rgba */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{
          background: "linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.5) 100%)"
        }}
      />
      <div 
        className="absolute inset-y-0 left-0 w-1/4 z-0 pointer-events-none" 
        style={{
          background: "linear-gradient(to right, rgba(0, 0, 0, 0.45), transparent)"
        }}
      />
      <div 
        className="absolute inset-y-0 right-0 w-1/4 z-0 pointer-events-none" 
        style={{
          background: "linear-gradient(to left, rgba(0, 0, 0, 0.45), transparent)"
        }}
      />

      {/* Hanging String Lights Decoration */}
      <div className="absolute top-0 inset-x-0 h-10 flex justify-between px-6 z-10 pointer-events-none">
        <div className="flex space-x-4 w-full justify-around mt-1">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="relative flex flex-col items-center">
              <div 
                className="w-[1px] h-3" 
                style={{ backgroundColor: "rgba(148, 163, 184, 0.8)" }} // slate-400 equivalent
              />
              <div 
                className="w-3 h-3 rounded-full animate-pulse" 
                style={{ 
                  animationDelay: `${i * 0.3}s`,
                  backgroundColor: "#fcd34d", // amber-300 hex
                  boxShadow: "0 0 10px #f59e0b"
                }} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Poster Content Grid */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-4 text-white">
        
        {/* HEADER SECTION */}
        <div className="text-center mt-2 flex flex-col items-center">
          {/* Crown and Main Title */}
          <div className="flex flex-col items-center relative">
            <Crown 
              className="w-6 h-6 animate-bounce mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" 
              style={{ color: "#fcd34d", fill: "#fcd34d" }} // amber-300 hex
            />
            <h1 
              className="font-titan text-[38px] uppercase tracking-tight text-stroke text-shadow-glow leading-none"
              style={{ color: "#ffffff" }}
            >
              THE LEGENDS CHILL
            </h1>
          </div>

          <div className="flex items-center space-x-2 my-0.5">
            <span className="h-[2px] w-8" style={{ backgroundColor: "#fbbf24" }} /> {/* amber-400 hex */}
            <p 
              className="font-display font-bold text-[10px] tracking-[0.2em] uppercase"
              style={{ color: "#fcd34d" }} // amber-300 hex
            >
              VOUS PRÉSENTE
            </p>
            <span className="h-[2px] w-8" style={{ backgroundColor: "#fbbf24" }} />
          </div>

          {/* Ribbon: UNE SORTIE DE FIN D'ANNÉE */}
          <div 
            className="px-4 py-0.5 rounded-full shadow-md text-xs font-bold tracking-wider uppercase mb-1 border"
            style={{ 
              backgroundColor: "rgba(15, 23, 42, 0.9)", // slate-900 rgba
              borderColor: "rgba(245, 158, 11, 0.4)", // amber-500 rgba
              color: "#fde68a" // amber-200 hex
            }}
          >
            UNE SORTIE DE FIN D'ANNÉE
          </div>

          {/* Subtitle cursive "intitulée" */}
          <p 
            className="font-cursive text-2xl rotate-[-4deg] my-[-2px]"
            style={{ color: "#fcd34d" }} // amber-300 hex
          >
            intitulée
          </p>

          {/* BIG TITLE: Time to chill! */}
          <div className="flex items-center justify-center space-x-1 mt-0.5 mb-1">
            <span 
              className="font-marker text-[40px] rotate-[-2deg] tracking-tight text-shadow-blue"
              style={{ color: "#67e8f9" }} // cyan-300 hex
            >
              Time
            </span>
            <span 
              className="font-display font-extrabold text-sm uppercase tracking-widest px-1.5 py-0.5 rounded border"
              style={{ 
                backgroundColor: "rgba(2, 6, 23, 0.85)", // slate-950 rgba
                borderColor: "#334155", // slate-700 hex
                color: "#f1f5f9" // slate-100 hex
              }}
            >
              TO
            </span>
            <span 
              className="font-marker text-[40px] rotate-[3deg] tracking-tight flex items-center text-shadow-red"
              style={{ color: "#fb923c" }} // orange-400 hex
            >
              chill!
              <Palmtree 
                className="w-6 h-6 ml-1 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" 
                style={{ color: "#34d399" }} // emerald-400 hex
              />
            </span>
          </div>
        </div>

        {/* MIDDLE SECTION: MAIN CIRCLE & BADGES */}
        <div className="relative flex-grow flex items-center justify-between my-2 px-1">
          
          {/* LEFT COLUMN: Floating Badges */}
          <div className="flex flex-col space-y-4 z-10 w-32 text-left">
            {/* Ticket Price Badge */}
            <div 
              className="shadow-xl rounded-lg p-2 rotate-[-6deg] flex flex-col items-center transform transition hover:scale-105 duration-200 border-2"
              style={{ 
                backgroundColor: "#fef3c7", // amber-50 hex
                color: "#dc2626", // red-600 hex
                borderColor: "#fcd34d" // amber-300 hex
              }}
            >
              <span 
                className="font-sans text-[8px] font-bold uppercase tracking-wider leading-none"
                style={{ color: "#1e293b" }} // slate-800 hex
              >
                LE BILLET S'ÉLÈVE À
              </span>
              <span className="font-marker text-3xl font-extrabold my-0.5 text-shadow-red">
                {customTicketPrice || "5$"}
              </span>
            </div>

            {/* Soccer Match Sign */}
            <div 
              className="rounded-lg p-1.5 rotate-[4deg] shadow-lg text-center flex flex-col items-center border"
              style={{ 
                backgroundColor: "rgba(69, 26, 3, 0.88)", // amber-950 equivalent rgb
                borderColor: "rgba(245, 158, 11, 0.5)" // amber-500 rgba
              }}
            >
              <span 
                className="font-display font-extrabold text-[8px] uppercase tracking-wider"
                style={{ color: "#fbbf24" }} // amber-400 hex
              >
                MATCH DE FOOT
              </span>
              <span 
                className="font-mono text-[9px] font-bold leading-tight mt-0.5"
                style={{ color: "#ffffff" }}
              >
                NEW BOSS
              </span>
              <span 
                className="font-cursive text-xs py-0.5"
                style={{ color: "#fcd34d" }} // amber-300 hex
              >
                vs
              </span>
              <span 
                className="font-mono text-[9px] font-bold leading-tight"
                style={{ color: "#ffffff" }}
              >
                ZONE 246
              </span>
            </div>

            {/* Good Vibes Speaker Block */}
            <div 
              className="rounded-lg p-1.5 rotate-[-3deg] shadow-lg flex items-center space-x-1.5 border"
              style={{ 
                backgroundColor: "rgba(15, 23, 42, 0.9)", // slate-900 equivalent rgb
                borderColor: "rgba(71, 85, 105, 0.6)" // slate-600 rgba
              }}
            >
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center border shadow-inner"
                style={{ 
                  backgroundColor: "#1e293b", // slate-800 hex
                  borderColor: "#475569" // slate-600 hex
                }}
              >
                <Volume2 className="w-3.5 h-3.5" style={{ color: "#fcd34d" }} />
              </div>
              <div className="flex flex-col">
                <span className="font-marker text-[10px] leading-none" style={{ color: "#fbbf24" }}>GOOD</span>
                <span className="font-sans text-[8px] font-extrabold tracking-widest leading-none" style={{ color: "#cbd5e1" }}>VIBES</span>
              </div>
            </div>
          </div>

          {/* CENTER: LARGE PHOTO CIRCLE */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
            <div 
              onClick={onPhotoCircleClick}
              className="w-52 h-52 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden relative group border-[6px] cursor-pointer select-none"
              style={{ 
                borderColor: "#fbbf24", // amber-400 hex
                backgroundColor: "#0f172a" // slate-900 hex
              }}
              title="Cliquez pour importer votre photo"
            >
              {photoUrl ? (
                <>
                  <div 
                    className="w-full h-full relative cursor-grab active:cursor-grabbing"
                    style={{
                      transform: `translate(${posX}px, ${posY}px) scale(${scale}) rotate(${rotation}deg)`,
                      transition: "transform 0.05s ease-out",
                      transformOrigin: "center center"
                    }}
                  >
                    <img
                      src={photoUrl}
                      alt="Photo Importée"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Modern, high-polished hover overlay with camera icon and animations */}
                  <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-center p-4">
                    <Camera className="w-6 h-6 text-amber-400 mb-1 animate-bounce" />
                    <span className="text-[10px] font-bold tracking-wider text-white uppercase">
                      Changer la photo
                    </span>
                  </div>
                </>
              ) : (
                <div 
                  className="w-full h-full flex flex-col items-center justify-center p-4 text-center hover:bg-slate-900/50 transition-colors duration-200"
                  style={{ 
                    background: "linear-gradient(to bottom, rgba(15, 23, 42, 0.95), #020617)", 
                    color: "#94a3b8" 
                  }}
                >
                  <div 
                    className="w-10 h-10 rounded-full border flex items-center justify-center mb-1.5 animate-pulse group-hover:scale-110 group-hover:bg-slate-800 transition-all duration-200"
                    style={{ 
                      backgroundColor: "#1e293b", 
                      borderColor: "#334155" 
                    }}
                  >
                    <Camera className="w-5 h-5 group-hover:text-amber-300 transition-colors duration-200" style={{ color: "#fbbf24" }} />
                  </div>
                  <span 
                    className="font-display font-extrabold text-[10px] uppercase tracking-widest group-hover:text-amber-400 transition-colors duration-200"
                    style={{ color: "#fcd34d" }}
                  >
                    CLIQUEZ POUR IMPORTER
                  </span>
                  <p 
                    className="text-[8px] mt-1 max-w-[130px] leading-normal group-hover:text-slate-400 transition-colors duration-200"
                    style={{ color: "#64748b" }}
                  >
                    Cliquez ici pour choisir une photo et l'ajuster
                  </p>
                </div>
              )}

              {/* High-contrast border overlay */}
              <div 
                className="absolute inset-0 rounded-full border pointer-events-none" 
                style={{ borderColor: "rgba(0, 0, 0, 0.4)" }} 
              />
            </div>

            {/* Slogan Banner: J'Y SERAIS overlaying bottom of circle */}
            <div 
              className="relative mt-[-18px] border-2 px-6 py-1 rounded-md shadow-2xl z-30 transform hover:scale-105 transition duration-200"
              style={{ 
                background: "linear-gradient(to right, #1e3a8a, #030712, #1e3a8a)", 
                borderColor: "#fbbf24" 
              }}
            >
              <h2 
                className="font-titan text-2xl text-stroke text-center tracking-wider leading-none text-shadow-glow uppercase whitespace-nowrap min-w-[120px]"
                style={{ color: "#ffffff" }}
              >
                {customSlogan || "J'Y SERAIS"}
              </h2>
              {/* Corner decorative anchors */}
              <div className="absolute -left-1 top-1.5 w-2 h-2 rounded-full shadow" style={{ backgroundColor: "#fbbf24" }} />
              <div className="absolute -right-1 top-1.5 w-2 h-2 rounded-full shadow" style={{ backgroundColor: "#fbbf24" }} />
            </div>
          </div>

          {/* RIGHT COLUMN: Floating Badges */}
          <div className="flex flex-col space-y-2 z-10 w-32 text-right items-end">
            
            {/* Destination Info Blocks */}
            <div className="flex flex-col space-y-1 w-full text-right">
              {/* Lieu de départ */}
              <div 
                className="rounded shadow-md px-1.5 py-0.5 border text-right flex flex-col"
                style={{ 
                  backgroundColor: "rgba(248, 250, 252, 0.95)", // slate-50 hex/rgba
                  borderColor: "#cbd5e1" // slate-300 hex
                }}
              >
                <span 
                  className="text-[7px] font-extrabold uppercase tracking-wide leading-none"
                  style={{ color: "#64748b" }} // slate-500 hex
                >
                  LIEU DE DÉPART :
                </span>
                <span 
                  className="font-mono text-[9px] font-extrabold leading-tight"
                  style={{ color: "#1e3a8a" }} // blue-900 hex
                >
                  EDAP ISP
                </span>
              </div>

              {/* Heure de départ */}
              <div 
                className="rounded shadow-md px-1.5 py-0.5 border text-right flex flex-col"
                style={{ 
                  backgroundColor: "rgba(248, 250, 252, 0.95)", 
                  borderColor: "#cbd5e1" 
                }}
              >
                <span 
                  className="text-[7px] font-extrabold uppercase tracking-wide leading-none"
                  style={{ color: "#64748b" }}
                >
                  HEURE DE DÉPART :
                </span>
                <span 
                  className="font-mono text-[9px] font-extrabold leading-tight"
                  style={{ color: "#dc2626" }} // red-600 hex
                >
                  08H 30
                </span>
              </div>

              {/* Retour prévu */}
              <div 
                className="rounded shadow-md px-1.5 py-0.5 border text-right flex flex-col"
                style={{ 
                  backgroundColor: "rgba(248, 250, 252, 0.95)", 
                  borderColor: "#cbd5e1" 
                }}
              >
                <span 
                  className="text-[7px] font-extrabold uppercase tracking-wide leading-none"
                  style={{ color: "#64748b" }}
                >
                  RETOUR PRÉVU :
                </span>
                <span 
                  className="font-mono text-[9px] font-extrabold leading-tight"
                  style={{ color: "#1e293b" }} // slate-800 hex
                >
                  17H 00
                </span>
              </div>
            </div>

            {/* À MUMOSHO Tag */}
            <div 
              className="border shadow-md rounded-md px-2 py-1 rotate-[-2deg] flex items-center space-x-1 self-end"
              style={{ 
                backgroundColor: "#0891b2", // cyan-600 hex
                borderColor: "#22d3ee" // cyan-400 hex
              }}
            >
              <MapPin className="w-3 h-3 fill-amber-300 animate-pulse" style={{ color: "#fbbf24" }} />
              <span className="font-display font-black text-[9px] tracking-widest uppercase" style={{ color: "#ffffff" }}>
                À MUMOSHO
              </span>
            </div>

            {/* Date Badge */}
            <div 
              className="border-2 text-white shadow-xl rounded-lg px-2 py-1 rotate-[4deg] flex items-center space-x-1.5 self-end"
              style={{ 
                backgroundColor: "#dc2626", // red-600 hex
                borderColor: "#ffffff" 
              }}
            >
              <Calendar className="w-3.5 h-3.5" style={{ color: "#ffffff" }} />
              <div className="flex flex-col text-left leading-none">
                <span 
                  className="text-[6px] font-black tracking-widest uppercase leading-none"
                  style={{ color: "#fecaca" }} // red-200 hex
                >
                  LE DIMANCHE
                </span>
                <span 
                  className="font-display font-extrabold text-[9px] tracking-wide uppercase leading-none mt-0.5"
                  style={{ color: "#ffffff" }}
                >
                  {customDate || "5 JUILLET 2026"}
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM SECTION: DETAILED PROGRAM */}
        <div 
          className="border rounded-xl p-2.5 z-10 shadow-2xl backdrop-blur-sm"
          style={{ 
            backgroundColor: "rgba(2, 6, 23, 0.82)", // slate-950 equivalent rgb
            borderColor: "rgba(245, 158, 11, 0.25)" // amber-500 equivalent rgba
          }}
        >
          
          {/* Top Sub-banner */}
          <div className="text-center border-b pb-1 mb-1" style={{ borderColor: "#1e293b" }}>
            <p 
              className="font-display font-black text-[9px] tracking-[0.25em] uppercase"
              style={{ color: "#fbbf24" }} // amber-400 hex
            >
              MUSIQUE • AMBIANCE • FUN • SOUVENIRS
            </p>
            <p 
              className="text-[8px] italic font-medium mt-0.5 tracking-wide uppercase"
              style={{ color: "#cbd5e1" }} // slate-300 hex
            >
              " UNE JOURNÉE POUR SE DÉTENDRE, S'AMUSER ET CRÉER DES SOUVENIRS INOUBLIABLES ! "
            </p>
          </div>

          {/* Activities vs Guests program columns */}
          <div className="grid grid-cols-2 gap-2 text-left">
            
            {/* Left Col: Activités */}
            <div className="border-r pr-2" style={{ borderColor: "rgba(30, 41, 59, 0.6)" }}>
              <div className="flex items-center space-x-1 mb-1">
                <Sparkles className="w-2.5 h-2.5" style={{ color: "#f43f5e" }} /> {/* rose-500 hex */}
                <span 
                  className="font-display font-black text-[8.5px] uppercase tracking-widest"
                  style={{ color: "#f43f5e" }}
                >
                  ACTIVITÉS PRÉVUES :
                </span>
              </div>
              <ul className="space-y-[1px] text-[8px] font-medium" style={{ color: "#cbd5e1" }}>
                <li className="flex items-center">
                  <Dribbble className="w-2 h-2 mr-1 shrink-0" style={{ color: "#fb7185" }} /> 
                  MATCH DE FOOT
                </li>
                <li className="flex items-center">
                  <Dribbble className="w-2 h-2 mr-1 shrink-0" style={{ color: "#fb7185" }} /> 
                  BASKET DE FIN D'ANNÉE
                </li>
                <li className="flex items-center">
                  <Trophy className="w-2 h-2 mr-1 shrink-0" style={{ color: "#fb7185" }} /> 
                  LA LÉGENDE DE LA VILLE
                </li>
                <li className="flex items-center">
                  <Tv className="w-2 h-2 mr-1 shrink-0" style={{ color: "#fb7185" }} /> 
                  BILLARD & JEUX
                </li>
                <li className="flex items-center">
                  <Music className="w-2 h-2 mr-1 shrink-0" style={{ color: "#fb7185" }} /> 
                  MIX LIVE DJ & CHILL
                </li>
                <li className="flex items-center">
                  <Palmtree className="w-2 h-2 mr-1 shrink-0" style={{ color: "#fb7185" }} /> 
                  BALADE SUR LA PLAGE
                </li>
              </ul>
            </div>

            {/* Right Col: Les Invités */}
            <div className="pl-1">
              <div className="flex items-center space-x-1 mb-1">
                <PartyPopper className="w-2.5 h-2.5" style={{ color: "#fbbf24" }} />
                <span 
                  className="font-display font-black text-[8.5px] uppercase tracking-widest"
                  style={{ color: "#fbbf24" }}
                >
                  LES INVITÉS :
                </span>
              </div>
              <ul className="grid grid-cols-2 gap-x-1 gap-y-[1px] text-[8px] font-medium leading-tight" style={{ color: "#cbd5e1" }}>
                <li>• ZONE 246 💀</li>
                <li>• NEW BOSS 👑</li>
                <li>• EDAP/ISP 🎓</li>
                <li>• LYCÉE CIREZI</li>
                <li>• COLLÈGE ALFAJIRI</li>
                <li>• LES GRANDS DJs 📻</li>
                <li className="col-span-2 font-bold" style={{ color: "#fcd34d" }}>• ET AUTRES SURPRISES 🎁!</li>
              </ul>
            </div>

          </div>

          {/* Catchy footer line */}
          <div className="text-center mt-1 border-t pt-0.5 flex flex-col items-center justify-center" style={{ borderColor: "rgba(30, 41, 59, 0.4)" }}>
            <span 
              className="font-cursive text-xs tracking-wide animate-pulse"
              style={{ color: "#fcd34d" }}
            >
              Viens vivre le moment, viens Time to chill !
            </span>
            <span 
              className="font-mono text-[7px] uppercase tracking-wider mt-1 opacity-70"
              style={{ color: "#94a3b8" }}
            >
              Design Bokassa Ntwali Leader +243995697553
            </span>
          </div>

        </div>

      </div>
    </div>
  );
});

Poster.displayName = "Poster";

