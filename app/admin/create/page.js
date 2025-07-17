import CreateBlogForm from '../../components/admin/CreateBlogForm';
import Header from '../../components/common/Header';

export const metadata = {
  title: 'Create Blog | Admin Dashboard',
  description: 'Create a new blog post.',
};

export default function CreateBlog() {
  // Server-side logic: Validate admin permissions
  const hasPermission = true; // This would come from your auth system
  
  if (!hasPermission) {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="error-message">
            <h1>Access Denied</h1>
            <p>You don't have permission to create blogs.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <CreateBlogForm />
    </div>
  );
} 