import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Target,
  Save,
  CheckCircle2,
  Camera,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Profile({ user, setUser }) {
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    financial_goal: "",
    wallet_balance: 0,
    profile_picture: "",
  });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, [user.id]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await fetch(`http://localhost:5000/api/user/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    // ✨ NEW: Instantly update the Global React State and LocalStorage!
    const updatedUser = {
      ...user,
      full_name: profile.full_name,
      profile_picture: profile.profile_picture,
    };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setSaving(false);
    setToast("Profile Updated Successfully!");
    setTimeout(() => setToast(null), 3000);
  };

  // ✨ NEW: Convert Image to Base64 String instantly
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profile_picture: reader.result }); // Set the base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-3">
          <User className="text-blue-600 w-8 h-8" /> My Profile
        </h1>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-8 text-white flex justify-between items-center">
            <div>
              <p className="text-blue-100 font-bold uppercase tracking-wider text-sm mb-1">
                Available Wallet Balance
              </p>
              <h2 className="text-4xl font-black">
                ₹
                {Number(profile.wallet_balance || 0).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </h2>
            </div>

            {/* ✨ NEW: Interactive Avatar Upload Zone */}
            <div
              onClick={() => document.getElementById("profilePicInput").click()}
              className="relative w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 cursor-pointer overflow-hidden group shadow-lg"
              title="Change Profile Picture"
            >
              {profile.profile_picture ? (
                <img
                  src={profile.profile_picture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-white" />
              )}
              {/* Hover Dark Overlay with Camera Icon */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              id="profilePicInput"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          <form onSubmit={handleSave} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" /> Full Name
                </label>
                <input
                  type="text"
                  value={profile.full_name || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, full_name: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email Address
                </label>
                <input
                  type="email"
                  value={profile.email || ""}
                  disabled
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl p-3 text-slate-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Phone Number
                </label>
                <input
                  type="text"
                  value={profile.phone || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" /> Primary Financial Goal
                </label>
                <select
                  value={profile.financial_goal || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, financial_goal: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Build Wealth">Build Wealth</option>
                  <option value="Retirement">Retirement</option>
                  <option value="Buy a House">Buy a House</option>
                  <option value="Education">Education</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="mt-8 bg-blue-600 text-white font-bold py-3 px-8 rounded-xl shadow-md hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2"
            >
              {saving ? (
                "Saving..."
              ) : (
                <>
                  <Save className="w-5 h-5" /> Save Profile
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 bg-slate-800 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 font-medium"
          >
            <CheckCircle2 className="text-teal-400 w-5 h-5" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
