import React, { useState, useRef } from "react";
import { Poster } from "./components/Poster";
import { Controls } from "./components/Controls";
import { AdminPanel } from "./components/AdminPanel";
import { SavedPoster, PosterPreset } from "./types";
import { 
  Sparkles, 
  HelpCircle, 
  CheckCircle, 
  AlertCircle,
  Tv,
  Users,
  Calendar,
  Ticket
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // State for image customizations
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1.2);
  const [posX, setPosX] = useState<number>(0);
  const [posY, setPosY] = useState<number>(0);
  const [rotation, setRotation] = useState<number>(0);

  // State for editable text fields on the poster
  const [customSlogan, setCustomSlogan] = useState<string>("J'Y SERAIS");
  const [customTicketPrice, setCustomTicketPrice] = useState<string>("5$");
  const [customDate, setCustomDate] = useState<string>("5 JUILLET 2026");

  // State for UI interactions
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Admin and history states
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  
  const [downloads, setDownloads] = useState<SavedPoster[]>(() => {
    try {
      const raw = localStorage.getItem("legends_downloads");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [presets, setPresets] = useState<PosterPreset[]>(() => {
    try {
      const raw = localStorage.getItem("legends_presets");
      if (raw) return JSON.parse(raw);
    } catch {}
    
    // Default system presets
    const defaultPresets: PosterPreset[] = [
      {
        id: "sys_1",
        name: "Modèle Classique - Time To Chill",
        customSlogan: "J'Y SERAIS",
        customTicketPrice: "5$",
        customDate: "5 JUILLET 2026",
        scale: 1.2,
        posX: 0,
        posY: 0,
        rotation: 0,
        isSystem: true
      },
      {
        id: "sys_2",
        name: "Modèle VIP - Invité d'Honneur",
        customSlogan: "INVITÉ D'HONNEUR",
        customTicketPrice: "10$",
        customDate: "5 JUILLET 2026",
        scale: 1.15,
        posX: 0,
        posY: -10,
        rotation: 0,
        isSystem: true
      },
      {
        id: "sys_3",
        name: "Modèle Match - Foot Legends",
        customSlogan: "TIME TO CHILL !",
        customTicketPrice: "3$",
        customDate: "5 JUILLET 2026",
        scale: 1.2,
        posX: 0,
        posY: 0,
        rotation: 0,
        isSystem: true
      }
    ];
    localStorage.setItem("legends_presets", JSON.stringify(defaultPresets));
    return defaultPresets;
  });

  const posterRef = useRef<HTMLDivElement>(null);

  // Handle uploading user file
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Veuillez sélectionner un fichier image valide.");
      return;
    }

    setErrorMessage(null);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPhotoUrl(reader.result);
        // Reset positioning on new image upload
        setScale(1.2);
        setPosX(0);
        setPosY(0);
        setRotation(0);
        setSuccessMessage("Photo importée avec succès ! Ajustez-la maintenant.");
        setTimeout(() => setSuccessMessage(null), 4000);
      }
    };
    reader.onerror = () => {
      setErrorMessage("Erreur lors de la lecture du fichier.");
    };
    reader.readAsDataURL(file);
  };

  // Load a high-quality sample photo for demo purposes
  const handleLoadExamplePhoto = () => {
    // A cool portrait of a smiling guy that fits the poster vibes perfectly
    const sampleUrl = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80";
    setPhotoUrl(sampleUrl);
    setScale(1.15);
    setPosX(0);
    setPosY(-10);
    setRotation(0);
    setSuccessMessage("Photo d'exemple chargée ! N'hésitez pas à l'ajuster ou à importer la vôtre.");
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  // Reset positioning states
  const handleReset = () => {
    setScale(1.2);
    setPosX(0);
    setPosY(0);
    setRotation(0);
  };

  // Load configuration from presets or saved downloads
  const handleLoadConfig = (config: {
    photoUrl: string | null;
    scale: number;
    posX: number;
    posY: number;
    rotation: number;
    customSlogan: string;
    customTicketPrice: string;
    customDate: string;
  }) => {
    if (config.photoUrl !== null) {
      setPhotoUrl(config.photoUrl);
    }
    setScale(config.scale);
    setPosX(config.posX);
    setPosY(config.posY);
    setRotation(config.rotation);
    setCustomSlogan(config.customSlogan);
    setCustomTicketPrice(config.customTicketPrice);
    setCustomDate(config.customDate);
    setSuccessMessage("Modèle d'affiche chargé avec succès ! 🎉");
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Delete a downloaded poster record
  const handleDeleteDownload = (id: string) => {
    const updated = downloads.filter((d) => d.id !== id);
    setDownloads(updated);
    localStorage.setItem("legends_downloads", JSON.stringify(updated));
  };

  // Create a new preset template
  const handleAddPreset = (name: string) => {
    const newPreset: PosterPreset = {
      id: "preset_" + Date.now(),
      name,
      customSlogan,
      customTicketPrice,
      customDate,
      scale,
      posX,
      posY,
      rotation,
      isSystem: false
    };
    const updated = [...presets, newPreset];
    setPresets(updated);
    localStorage.setItem("legends_presets", JSON.stringify(updated));
  };

  // Delete a preset template
  const handleDeletePreset = (id: string) => {
    const updated = presets.filter((p) => p.id !== id);
    setPresets(updated);
    localStorage.setItem("legends_presets", JSON.stringify(updated));
  };

  // Generate and download poster
  const handleDownload = async () => {
    if (!posterRef.current) return;
    setIsDownloading(true);
    setErrorMessage(null);

    let restoreStylesheets: (() => void) | null = null;

    try {
      // 1. Temporarily sanitize stylesheets to remove "oklch" colors which break html2canvas
      const styleTags = Array.from(document.querySelectorAll("style"));
      const linkTags = Array.from(document.querySelectorAll("link[rel='stylesheet']")) as HTMLLinkElement[];
      
      const savedStyles: { element: HTMLStyleElement; originalContent: string | null }[] = [];
      const savedLinks: { element: HTMLLinkElement; originalDisabled: boolean; tempStyleElement?: HTMLStyleElement }[] = [];

      // Sanitize <style> tags
      for (const style of styleTags) {
        const content = style.textContent;
        savedStyles.push({ element: style, originalContent: content });
        if (content && content.includes("oklch")) {
          // Replace oklch(...) colors with a simple fallback RGB color that html2canvas can parse without throwing
          style.textContent = content.replace(/oklch\([^)]+\)/g, "rgb(30, 41, 59)");
        }
      }

      // Sanitize <link> tags (e.g. built production styles)
      for (const link of linkTags) {
        savedLinks.push({ element: link, originalDisabled: link.disabled });
        try {
          const response = await fetch(link.href);
          if (response.ok) {
            let text = await response.text();
            if (text.includes("oklch")) {
              text = text.replace(/oklch\([^)]+\)/g, "rgb(30, 41, 59)");
              
              // Disable the original link
              link.disabled = true;
              
              // Inject sanitized temporary style element
              const tempStyle = document.createElement("style");
              tempStyle.textContent = text;
              tempStyle.setAttribute("data-temp-canvas-style", "true");
              document.head.appendChild(tempStyle);
              
              savedLinks[savedLinks.length - 1].tempStyleElement = tempStyle;
            }
          }
        } catch (e) {
          console.warn("Skipping link tag sanitization (CORS or external link):", link.href, e);
        }
      }

      // Define restore function to run post-generation
      restoreStylesheets = () => {
        // Restore original style content
        for (const { element, originalContent } of savedStyles) {
          element.textContent = originalContent;
        }
        // Restore link tags and remove temporary styles
        for (const { element, originalDisabled, tempStyleElement } of savedLinks) {
          element.disabled = originalDisabled;
          if (tempStyleElement) {
            tempStyleElement.remove();
          }
        }
      };

      // Dynamic import to avoid SSR or initial load blocks
      const html2canvas = (await import("html2canvas")).default;

      // Small delay to ensure any active transitions or states settle
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Generate the canvas
      const canvas = await html2canvas(posterRef.current, {
        useCORS: true,
        allowTaint: false,
        scale: 3, // Highly polished 3x resolution output
        logging: false,
        backgroundColor: "#020617",
        onclone: (clonedDoc) => {
          // Adjust any elements in the cloned document if necessary
          const clonedPoster = clonedDoc.getElementById("legends-poster-canvas");
          if (clonedPoster) {
            clonedPoster.style.transform = "none";
            clonedPoster.style.borderRadius = "0px"; // Remove border radius for a clean flat poster download
            clonedPoster.style.borderWidth = "0px"; // Remove frame borders if preferred, or keep them
          }
        }
      });

      // Convert to high-quality JPEG
      const dataUrl = canvas.toDataURL("image/jpeg", 0.95);

      // Create download anchor
      const cleanSlogan = customSlogan.trim().toUpperCase().replace(/[^A-Z0-9]/g, "_");
      const filename = `LEGENDS_CHILL_POSTER_${cleanSlogan || "CUSTOM"}.jpg`;

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSuccessMessage("Affiche générée en Haute Résolution et téléchargée avec succès ! 🎉");
      setTimeout(() => setSuccessMessage(null), 6000);

      // Save to downloads log
      const newDownload: SavedPoster = {
        id: "dl_" + Date.now(),
        photoUrl,
        scale,
        posX,
        posY,
        rotation,
        customSlogan,
        customTicketPrice,
        customDate,
        downloadedAt: new Date().toISOString()
      };
      
      const updatedDownloads = [newDownload, ...downloads];
      setDownloads(updatedDownloads);
      
      try {
        localStorage.setItem("legends_downloads", JSON.stringify(updatedDownloads));
      } catch (err) {
        console.warn("Storage quota exceeded. Storing without heavy photo data.");
        const lighterDownloads = updatedDownloads.map(d => ({
          ...d,
          photoUrl: d.photoUrl?.startsWith("data:") ? null : d.photoUrl
        }));
        try {
          localStorage.setItem("legends_downloads", JSON.stringify(lighterDownloads));
        } catch (innerErr) {
          console.error("Localstorage save completely failed:", innerErr);
        }
      }
    } catch (error) {
      console.error("Poster download error:", error);
      setErrorMessage("Une erreur s'est produite lors de la génération de l'affiche. Veuillez réessayer.");
    } finally {
      // 2. Always restore stylesheets back to original state so UI is perfect
      if (restoreStylesheets) {
        restoreStylesheets();
      }
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950 relative overflow-x-hidden">
      
      {/* Decorative top blurred ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* HEADER SECTION */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-4 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Sparkles className="w-5.5 h-5.5 text-slate-950" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight bg-gradient-to-r from-amber-300 via-orange-400 to-cyan-300 bg-clip-text text-transparent">
                THE LEGENDS CHILL
              </h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold leading-none">
                Générateur d'Affiche Officiel
              </p>
            </div>
          </div>

          {/* Slogan pill */}
          <div className="hidden md:flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-full px-3 py-1 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Créez & téléchargez votre affiche en 3 clics</span>
          </div>

          {/* Admin Access Button */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center space-x-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/40 text-xs font-bold uppercase tracking-wider text-amber-400 rounded-xl transition cursor-pointer"
          >
            <span>🔑</span>
            <span>Espace Admin</span>
          </button>

        </div>
      </header>

      {/* NOTIFICATIONS CONTAINER */}
      <div className="fixed top-20 right-4 left-4 sm:left-auto sm:right-6 sm:w-96 z-50 space-y-3 pointer-events-none">
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="bg-red-950/90 border border-red-500/50 p-4 rounded-xl shadow-2xl flex items-start space-x-3 backdrop-blur-md pointer-events-auto"
            >
              <AlertCircle className="w-5.5 h-5.5 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-grow">
                <h4 className="text-sm font-bold text-red-200">Erreur</h4>
                <p className="text-xs text-red-300/95 mt-0.5">{errorMessage}</p>
              </div>
            </motion.div>
          )}

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="bg-emerald-950/90 border border-emerald-500/50 p-4 rounded-xl shadow-2xl flex items-start space-x-3 backdrop-blur-md pointer-events-auto"
            >
              <CheckCircle className="w-5.5 h-5.5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="flex-grow">
                <h4 className="text-sm font-bold text-emerald-200">Succès</h4>
                <p className="text-xs text-emerald-300/95 mt-0.5">{successMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MAIN APPLICATION CONTAINER */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-8 flex flex-col items-center">
        
        {/* Intro text */}
        <div className="text-center max-w-2xl mb-8 space-y-3">
          <div className="inline-flex items-center space-x-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Affiche personnalisable "J'Y SERAIS"</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Préparez-vous pour <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">THE LEGENDS CHILL</span>
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
            Générez votre affiche d'invité d'honneur personnalisée en intégrant votre photo dans le cercle central. Ajustez le zoom et la position à votre convenance, puis téléchargez une copie en qualité HD prête à être partagée sur vos réseaux sociaux !
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start justify-center">
          
          {/* Column Left: Interactive Poster Preview (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center space-y-4">
            <div className="w-full flex justify-between items-center px-1">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center space-x-1">
                <Tv className="w-4 h-4 text-amber-400" />
                <span>Aperçu en temps réel</span>
              </span>
              <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                Qualité HD 3x à l'export
              </span>
            </div>

            {/* Poster frame wrapper */}
            <div className="w-full flex justify-center p-2.5 bg-slate-900/40 border border-slate-800/80 rounded-3xl shadow-inner relative group">
              <Poster
                ref={posterRef}
                photoUrl={photoUrl}
                scale={scale}
                posX={posX}
                posY={posY}
                rotation={rotation}
                customSlogan={customSlogan}
                customTicketPrice={customTicketPrice}
                customDate={customDate}
              />
            </div>

            {/* Hint overlay */}
            <p className="text-[11px] text-slate-400 flex items-center space-x-1">
              <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              <span>L'affiche téléchargée n'inclura pas les boutons d'ajustement.</span>
            </p>
          </div>

          {/* Column Right: Action & Customization Panel (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center w-full">
            
            {/* Quick Templates/Presets Selection bar */}
            <div className="w-full max-w-[540px] mb-4 bg-slate-900/90 border border-slate-850 rounded-2xl p-4 text-white backdrop-blur-sm shadow-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5 mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Modèles d'Affiche Rapides ({presets.length})</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleLoadConfig({
                      photoUrl: null, // do not overwrite current custom photo
                      scale: preset.scale,
                      posX: preset.posX,
                      posY: preset.posY,
                      rotation: preset.rotation,
                      customSlogan: preset.customSlogan,
                      customTicketPrice: preset.customTicketPrice,
                      customDate: preset.customDate
                    })}
                    className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/30 text-xs rounded-xl font-semibold text-slate-300 hover:text-amber-300 transition cursor-pointer flex items-center space-x-1"
                  >
                    <span>🎯</span>
                    <span>{preset.name.split(" - ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            <Controls
              scale={scale}
              posX={posX}
              posY={posY}
              rotation={rotation}
              customSlogan={customSlogan}
              customTicketPrice={customTicketPrice}
              customDate={customDate}
              hasPhoto={photoUrl !== null}
              isDownloading={isDownloading}
              onScaleChange={setScale}
              onPosXChange={setPosX}
              onPosYChange={setPosY}
              onRotationChange={setRotation}
              onSloganChange={setCustomSlogan}
              onTicketPriceChange={setCustomTicketPrice}
              onDateChange={setCustomDate}
              onFileSelect={handleFileSelect}
              onReset={handleReset}
              onDownload={handleDownload}
              onLoadExamplePhoto={handleLoadExamplePhoto}
            />
          </div>

        </div>

        {/* Admin panel dialog */}
        {isAdminOpen && (
          <AdminPanel
            onClose={() => setIsAdminOpen(false)}
            onLoadConfig={handleLoadConfig}
            downloads={downloads}
            onDeleteDownload={handleDeleteDownload}
            presets={presets}
            onAddPreset={handleAddPreset}
            onDeletePreset={handleDeletePreset}
          />
        )}

        {/* Feature Highlights section */}
        <section className="mt-16 w-full max-w-4xl border-t border-slate-900 pt-10">
          <h3 className="text-center font-bold text-xs uppercase tracking-[0.2em] text-slate-400 mb-8">
            Comment ça marche ?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            
            <div className="bg-slate-900/40 border border-slate-900/60 rounded-xl p-4 flex flex-col items-center text-center">
              <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 font-black text-sm">
                1
              </div>
              <h4 className="font-bold text-xs uppercase text-slate-200 tracking-wide">Importez</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                Cliquez sur "Importer" et choisissez un portrait depuis votre téléphone ou ordinateur.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-900/60 rounded-xl p-4 flex flex-col items-center text-center">
              <div className="w-9 h-9 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 font-black text-sm">
                2
              </div>
              <h4 className="font-bold text-xs uppercase text-slate-200 tracking-wide">Ajustez</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                Utilisez les curseurs pour zoomer, recentrer ou orienter votre photo dans le cercle d'or.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-900/60 rounded-xl p-4 flex flex-col items-center text-center">
              <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 font-black text-sm">
                3
              </div>
              <h4 className="font-bold text-xs uppercase text-slate-200 tracking-wide">Personnalisez</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                Modifiez le slogan en bas (ex: J'Y SERAIS, MOI AUSSI !) ainsi que le prix et la date de l'affiche.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-900/60 rounded-xl p-4 flex flex-col items-center text-center">
              <div className="w-9 h-9 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-3 font-black text-sm">
                4
              </div>
              <h4 className="font-bold text-xs uppercase text-slate-200 tracking-wide">Partagez</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                Téléchargez l'affiche finale au format HD JPEG et partagez-la fièrement avec vos amis !
              </p>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER SECTION */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 mt-16 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex justify-center space-x-6 text-slate-400">
            <span className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-slate-500" />
              <span>Organisé par New Boss & Zone 246</span>
            </span>
            <span className="flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>Dimanche, 5 Juillet 2026</span>
            </span>
            <span className="flex items-center space-x-1">
              <Ticket className="w-4 h-4 text-slate-500" />
              <span>Billet: 5$</span>
            </span>
          </div>
          <p className="text-[10px]">
            © {new Date().getFullYear()} Legends Chill Avatar Generator. Tous droits réservés. Développé pour les participants de THE LEGENDS CHILL.
          </p>
        </div>
      </footer>

    </div>
  );
}
