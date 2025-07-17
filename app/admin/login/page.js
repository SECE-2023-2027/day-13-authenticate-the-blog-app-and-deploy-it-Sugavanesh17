import AdminLoginForm from '../../components/admin/LoginForm';

export const metadata = {
  title: 'Admin Login | BlogHub',
  description: 'Log in to the administrator dashboard.',
};

export default function AdminLogin() {
  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 24, background: '#181f2a', borderRadius: 12 }}>
      <AdminLoginForm />
    </div>
  );
} 