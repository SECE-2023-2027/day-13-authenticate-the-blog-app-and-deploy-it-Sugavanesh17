'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export const metadata = {
  title: 'Admin Profile | BlogHub',
  description: 'Manage your administrator profile.',
};

export default function AdminProfile() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!session) {
      fetch('/api/admin/profile')
        .then(res => res.json())
        .then(setProfile)
        .catch(() => setProfile(null));
    }
  }, [session]);

  const admin = session?.user || profile;

  if (!admin) return <div>Loading...</div>;

  return (
    <main className="main-content">
      <div className="container">
        <div className="form-container" style={{ maxWidth: 400, margin: '2rem auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <img
              src={admin.image || '/file.svg'}
              alt="Profile"
              width={80}
              height={80}
              style={{ borderRadius: '50%', background: '#e0e7ef', padding: 4 }}
            />
            <h2>{admin.name}</h2>
            <p style={{ color: '#888' }}>{admin.email}</p>
            {admin.role && <p style={{ color: '#888' }}>{admin.role}</p>}
          </div>
        </div>
      </div>
    </main>
  );
} 