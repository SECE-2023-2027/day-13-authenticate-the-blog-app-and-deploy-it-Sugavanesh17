import Dashboard from '../../components/admin/Dashboard';
import Header from '../../components/common/Header';
import { fetchBlogs } from '../../api/blogs';

export const metadata = {
  title: 'Admin Dashboard | BlogHub',
  description: 'Manage your blog posts and content.',
};

export default async function AdminDashboard() {
  // Server-side logic: Fetch blogs and validate admin access
  const blogs = await fetchBlogs();
  const isAdmin = true; // This would come from your auth system
  
  if (!isAdmin) {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="error-message">
            <h1>Access Denied</h1>
            <p>Only administrators can access this dashboard.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Dashboard blogs={blogs} />
    </div>
  );
} 