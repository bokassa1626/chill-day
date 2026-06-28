import React, { useState, useEffect } from "react";
import { 
  Lock, 
  Unlock, 
  Trash2, 
  Edit, 
  Plus, 
  FileText, 
  Layout, 
  X, 
  Eye, 
  Save, 
  LogOut,
  Calendar,
  Ticket,
  ChevronRight,
  ShieldCheck,
  Check
} from "lucide-react";
import { SavedPoster, PosterPreset } from "../types";

interface AdminPanelProps {
  onClose: () => void;
  onLoadConfig: (config: {
    photoUrl: string | null;
    scale: number;
    posX: number;
    posY: number;
    rotation: number;
    customSlogan: string;
    customTicketPrice: string;
    customDate: string;
  }) => void;
  // State from parent
  downloads: SavedPoster[];
  onDeleteDownload: (id: string) => void;
  presets: PosterPreset[];
  onAddPreset: (name: string) => void;
  onDeletePreset: (id: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onClose,
  onLoadConfig,
  downloads,
  onDeleteDownload,
  presets,
  onAddPreset,
  onDeletePreset,
}) => {
  // Authentication states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem("legends_admin_logged") === "true";
  });
  const [authError, setAuthError] = useState<string | null>(null);

  // Tabs
  const [activeTab, setActiveTab] = useState<"downloads" | "presets">("downloads");

  // New Preset Name Input
  const [newPresetName, setNewPresetName] = useState("");
  const [presetSuccess, setPresetSuccess] = useState<string | null>(null);

  // Handle Log In
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    
    // Accept user-specified bokassantwali@gmail.com or metadata-session bokassantwali1@gmail.com
    if ((cleanEmail === "bokassantwali@gmail.com" || cleanEmail === "bokassantwali1@gmail.com") && password === "20262026") {
      setIsAdmin(true);
      setAuthError(null);
      localStorage.setItem("legends_admin_logged", "true");
    } else {
      setAuthError("Email ou mot de passe incorrect.");
    }
  };

  // Handle Log Out
  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem("legends_admin_logged");
  };

  // Add Preset Trigger
  const handleCreatePreset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPresetName.trim()) return;
    onAddPreset(newPresetName.trim());
    setNewPresetName("");
    setPresetSuccess("La configuration actuelle a été sauvegardée comme modèle !");
    setTimeout(() => setPresetSuccess(null), 3000);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div 
        className="bg-slate-900 border border-slate-800 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] text-slate-100"
        id="admin-modal-container"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              {isAdmin ? <ShieldCheck className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider">Espace Administration</h3>
              <p className="text-[10px] text-slate-400">
                {isAdmin ? "Connecté en tant que bokassantwali@gmail.com" : "Accès réservé à l'administrateur"}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition duration-150 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Wrapper */}
        <div className="flex-grow overflow-y-auto p-6">
          {!isAdmin ? (
            /* LOGIN FORM */
            <form onSubmit={handleLogin} className="max-w-md mx-auto py-8 space-y-5">
              <div className="text-center space-y-2 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 mx-auto border border-amber-500/20">
                  <Lock className="w-8 h-8 animate-pulse" />
                </div>
                <h4 className="font-bold text-lg text-slate-200">Connexion requise</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Entrez votre email administrateur et votre mot de passe pour gérer les modèles et voir les téléchargements.
                </p>
              </div>

              {authError && (
                <div className="bg-red-950/60 border border-red-500/40 p-3 rounded-xl text-red-300 text-xs text-center font-semibold">
                  ⚠️ {authError}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Adresse Email Admin
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="bokassantwali@gmail.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-slate-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-amber-500/10 active:scale-[0.99] transition duration-150 cursor-pointer text-sm"
              >
                Se connecter
              </button>
            </form>
          ) : (
            /* ADMIN CONTROLS INTERFACE */
            <div className="space-y-6">
              {/* Top Navigation & Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                {/* Tabs Selector */}
                <div className="flex space-x-1.5 bg-slate-950 p-1 rounded-xl self-start border border-slate-800/80">
                  <button
                    onClick={() => setActiveTab("downloads")}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer ${activeTab === "downloads" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white hover:bg-slate-900"}`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Téléchargés ({downloads.length})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("presets")}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer ${activeTab === "presets" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white hover:bg-slate-900"}`}
                  >
                    <Layout className="w-3.5 h-3.5" />
                    <span>Modèles ({presets.length})</span>
                  </button>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs bg-slate-850 hover:bg-red-950/40 hover:text-red-300 text-slate-400 border border-slate-800 hover:border-red-500/20 transition cursor-pointer self-end sm:self-auto"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Déconnexion</span>
                </button>
              </div>

              {/* TAB CONTENT: DOWNLOADS LOG GALLERY */}
              {activeTab === "downloads" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-300">Affiches Générées & Téléchargées</h4>
                    <span className="text-[10px] text-slate-500 font-medium">Historique stocké localement</span>
                  </div>

                  {downloads.length === 0 ? (
                    <div className="bg-slate-950/40 border border-slate-800/60 rounded-2xl p-10 text-center text-slate-500 space-y-2">
                      <FileText className="w-8 h-8 text-slate-600 mx-auto" />
                      <p className="text-sm font-semibold">Aucune affiche téléchargée pour le moment.</p>
                      <p className="text-xs max-w-sm mx-auto">Chaque fois qu'un utilisateur clique sur le bouton de téléchargement de l'affiche, elle apparaîtra ici.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {downloads.map((item) => (
                        <div 
                          key={item.id} 
                          className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-700 transition"
                        >
                          <div className="flex space-x-3">
                            {/* Visual circle thumb */}
                            <div className="w-16 h-16 rounded-full shrink-0 border border-amber-500/40 overflow-hidden bg-slate-900 flex items-center justify-center">
                              {item.photoUrl ? (
                                <img src={item.photoUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-[9px] text-amber-500 uppercase font-bold text-center">Aucune</span>
                              )}
                            </div>
                            <div className="flex-grow min-w-0">
                              <h5 className="font-extrabold text-amber-300 truncate text-sm leading-tight">
                                {item.customSlogan || "SANS SLOGAN"}
                              </h5>
                              <div className="flex flex-col mt-1 text-[10px] text-slate-400 space-y-0.5">
                                <span className="flex items-center text-[9px]">
                                  <Ticket className="w-3 h-3 text-slate-500 mr-1" /> Billet: {item.customTicketPrice}
                                </span>
                                <span className="flex items-center text-[9px]">
                                  <Calendar className="w-3 h-3 text-slate-500 mr-1" /> Date: {item.customDate}
                                </span>
                                <span className="text-[9px] text-slate-500 mt-1 italic">
                                  Téléchargé le : {new Date(item.downloadedAt).toLocaleString("fr-FR")}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-end space-x-2 mt-4 pt-3 border-t border-slate-900">
                            <button
                              onClick={() => {
                                onLoadConfig(item);
                                onClose();
                              }}
                              className="flex items-center space-x-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs font-semibold text-slate-300 border border-slate-800 transition cursor-pointer"
                              title="Charger cette configuration dans l'éditeur"
                            >
                              <Edit className="w-3.5 h-3.5 text-amber-400" />
                              <span>Modifier</span>
                            </button>
                            <button
                              onClick={() => onDeleteDownload(item.id)}
                              className="p-1.5 hover:bg-red-950/60 rounded-lg text-slate-400 hover:text-red-400 border border-transparent hover:border-red-950 transition cursor-pointer"
                              title="Supprimer cette affiche du journal"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB CONTENT: MANAGE PRESETS */}
              {activeTab === "presets" && (
                <div className="space-y-6">
                  {/* Save current editor as template form */}
                  <form onSubmit={handleCreatePreset} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-4">
                    <div className="flex items-center space-x-2">
                      <Save className="w-4 h-4 text-amber-400" />
                      <h5 className="font-bold text-xs uppercase tracking-wider text-slate-300">
                        Sauvegarder l'Affiche actuelle comme Modèle
                      </h5>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Prenez la configuration actuelle de l'affiche de l'éditeur (Slogan, Prix, Date, Échelle/position photo) et enregistrez-la comme modèle d'affiche. Les utilisateurs pourront alors la charger instantanément en un clic !
                    </p>

                    {presetSuccess && (
                      <div className="bg-emerald-950/60 border border-emerald-500/40 p-2.5 rounded-xl text-emerald-300 text-xs flex items-center space-x-1.5 font-medium">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>{presetSuccess}</span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={newPresetName}
                        onChange={(e) => setNewPresetName(e.target.value)}
                        placeholder="Ex: Modèle Spécial Match Foot"
                        className="flex-grow bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500 text-slate-200"
                      />
                      <button
                        type="submit"
                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs active:scale-[0.98] transition cursor-pointer flex items-center space-x-1.5 shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Ajouter</span>
                      </button>
                    </div>
                  </form>

                  <div className="space-y-3">
                    <h4 className="font-bold text-sm text-slate-300">Modèles disponibles pour les utilisateurs</h4>
                    
                    <div className="space-y-2">
                      {presets.map((preset) => (
                        <div 
                          key={preset.id} 
                          className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3.5 flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-xs text-amber-400">
                              M
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-xs text-slate-200">{preset.name}</span>
                                {preset.isSystem && (
                                  <span className="text-[8px] bg-slate-900 border border-slate-800 text-slate-500 px-1.5 py-0.2 rounded uppercase tracking-wider font-semibold">
                                    Système
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-slate-400">
                                Slogan: <strong className="text-amber-200">{preset.customSlogan}</strong> | Prix: <strong>{preset.customTicketPrice}</strong> | Date: <strong>{preset.customDate}</strong>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1.5">
                            <button
                              onClick={() => {
                                onLoadConfig({
                                  photoUrl: null, // Don't wipe current photo if loading templates, or keep defaults
                                  scale: preset.scale,
                                  posX: preset.posX,
                                  posY: preset.posY,
                                  rotation: preset.rotation,
                                  customSlogan: preset.customSlogan,
                                  customTicketPrice: preset.customTicketPrice,
                                  customDate: preset.customDate
                                });
                                onClose();
                              }}
                              className="p-1.5 hover:bg-slate-850 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
                              title="Tester ce modèle"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            {!preset.isSystem && (
                              <button
                                onClick={() => onDeletePreset(preset.id)}
                                className="p-1.5 hover:bg-red-950/60 rounded-lg text-slate-400 hover:text-red-400 transition cursor-pointer"
                                title="Supprimer ce modèle"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
