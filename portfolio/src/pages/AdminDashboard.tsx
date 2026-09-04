import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileData } from '../types';
import { defaultProfileData } from '../data/profile';
import { saveProfile, getProfiles, deleteProfile } from '../lib/db';
import { generatePDF } from '../lib/pdfGenerator';
import { Download, Upload, Trash2, Edit, FileJson, FileText } from 'lucide-react';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [editingProfile, setEditingProfile] = useState<ProfileData | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = () => {
    const loadedProfiles = getProfiles();
    setProfiles(loadedProfiles);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    navigate('/admin');
  };

  const handleExportJSON = (profile: ProfileData) => {
    const blob = new Blob([JSON.stringify(profile, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `profile-${profile.contact.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = (profile: ProfileData) => {
    generatePDF(profile, 'es');
  };

  const handleDelete = (email: string) => {
    if (confirm('Are you sure you want to delete this profile?')) {
      deleteProfile(email);
      loadProfiles();
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        const success = saveProfile(json);
        if (success) {
          loadProfiles();
          alert('Profile imported successfully!');
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleSaveProfile = (profile: ProfileData) => {
    const success = saveProfile(profile);
    if (success) {
      loadProfiles();
      setShowForm(false);
      setEditingProfile(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors text-sm font-medium cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>Import Profile</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
              <button
                onClick={() => {
                  setEditingProfile(defaultProfileData);
                  setShowForm(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-sm transition-colors text-sm font-medium"
              >
                <Edit className="w-4 h-4" />
                <span>New Profile</span>
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {profiles.length === 0 ? (
          <div className="text-center py-12">
            <FileJson className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No profiles yet</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-4">
              Import a profile JSON or create a new one to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{profile.contact.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{profile.contact.email}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => handleExportJSON(profile)}
                    className="w-full flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg transition-colors text-sm"
                  >
                    <FileJson className="w-4 h-4" />
                    <span>Export JSON</span>
                  </button>

                  <button
                    onClick={() => handleExportPDF(profile)}
                    className="w-full flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg transition-colors text-sm"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>

                  <button
                    onClick={() => {
                      setEditingProfile(profile);
                      setShowForm(true);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg transition-colors text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDelete(profile.contact.email)}
                    className="w-full flex items-center gap-2 px-3 py-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg transition-colors text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Profile Form Modal */}
      {showForm && editingProfile && (
        <ProfileForm
          profile={editingProfile}
          onSave={handleSaveProfile}
          onCancel={() => {
            setShowForm(false);
            setEditingProfile(null);
          }}
        />
      )}
    </div>
  );
}

// Simple Profile Form Component
function ProfileForm({ profile, onSave, onCancel }: { profile: ProfileData; onSave: (p: ProfileData) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState<ProfileData>(profile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Edit Profile</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
              <input
                type="text"
                value={formData.contact.name}
                onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, name: e.target.value } })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <input
                type="email"
                value={formData.contact.email}
                onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value } })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label>
              <input
                type="tel"
                value={formData.contact.phone}
                onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, phone: e.target.value } })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location</label>
              <input
                type="text"
                value={formData.contact.location}
                onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, location: e.target.value } })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
