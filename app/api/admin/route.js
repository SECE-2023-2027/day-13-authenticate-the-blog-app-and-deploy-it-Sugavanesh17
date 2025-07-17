import { connectDB } from "@/lib/mongoose";
import { User } from "@/models/User";
import { Blog } from "@/models/Blog";

let terms = {
    version: '1.0',
    lastUpdated: '2024-01-01',
    effectiveDate: '2024-01-01',
    content: 'These are the terms and conditions...'
};

export async function POST(request) {
    const { pathname } = new URL(request.url);
    await connectDB();
    if (pathname.endsWith('/admin/login')) {
        const { email, password } = await request.json();
        const admin = await User.findOne({ email, password, role: 'Administrator' });
        if (!admin) {
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
        }
        return Response.json({ message: 'Admin login successful', admin });
    }
    if (pathname.endsWith('/admin/blogs')) {
        const data = await request.json();
        const newBlog = await Blog.create(data);
        return Response.json(newBlog);
    }
    return new Response('Not found', { status: 404 });
}

export async function GET(request) {
    const { pathname } = new URL(request.url);
    await connectDB();
    if (pathname.endsWith('/admin/profile')) {
        const admin = await User.findOne({ role: 'Administrator' });
        return Response.json(admin);
    }
    if (pathname.endsWith('/admin/blogs')) {
        const blogs = await Blog.find();
        return Response.json(blogs);
    }
    if (pathname.match(/\/admin\/blogs\/.+/)) {
        const id = pathname.split('/').pop();
        const blog = await Blog.findById(id);
        return new Response(JSON.stringify(blog), { status: 200 });
    }
    if (pathname.endsWith('/admin/terms')) {
        return Response.json(terms);
    }
    return new Response('Not found', { status: 404 });
}

export async function PUT(request) {
    const { pathname } = new URL(request.url);
    await connectDB();
    if (pathname.endsWith('/admin/profile')) {
        const data = await request.json();
        const updated = await User.findOneAndUpdate({ role: 'Administrator' }, data, { new: true });
        return Response.json(updated);
    }
    if (pathname.match(/\/admin\/blogs\/.+/)) {
        const id = pathname.split('/').pop();
        const data = await request.json();
        const updated = await Blog.findByIdAndUpdate(id, data, { new: true });
        return Response.json(updated);
    }
    if (pathname.endsWith('/admin/terms')) {
        const data = await request.json();
        terms = { ...terms, ...data };
        return Response.json(terms);
    }
    return new Response('Not found', { status: 404 });
}

export async function DELETE(request) {
    const { pathname } = new URL(request.url);
    await connectDB();
    if (pathname.match(/\/admin\/blogs\/.+/)) {
        const id = pathname.split('/').pop();
        const deleted = await Blog.findByIdAndDelete(id);
        return Response.json(deleted);
    }
    return new Response('Not found', { status: 404 });
}
