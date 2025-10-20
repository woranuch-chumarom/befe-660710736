import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpenIcon, LogoutIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline';
// <-- 1. แก้ไข: นำเข้าฟังก์ชัน getAllBooks จากไฟล์ข้อมูลของคุณ
// **สำคัญ:** โปรดตรวจสอบให้แน่ใจว่า path ไปยังไฟล์ 'booksData' ถูกต้อง
import { getAllBooks } from '../data/booksData'; 

const AllBookPage = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Check authentication
        const isAdminAuthenticated = localStorage.getItem('isAdminAuthenticated');
        if (isAdminAuthenticated !== 'true') {
            navigate('/login');
        } else {
            fetchBooks();
        }
    }, [navigate]);

    // <-- 2. แก้ไข: เปลี่ยนฟังก์ชัน fetchBooks ให้ดึงข้อมูลจาก local แทน API
    const fetchBooks = () => {
        const allBooksData = getAllBooks();
        setBooks(allBooksData);
    };

    const handleLogout = () => {
        localStorage.removeItem('isAdminAuthenticated');
        navigate('/login');
    };

    const handleAddBook = () => {    
        navigate('/store-manager/add-book');
    };

    const handleEditBook = (bookId) => {    
        navigate(`/store-manager/edit-book/${bookId}`);
    };
    
    // <-- 3. แก้ไข: เปลี่ยนฟังก์ชันลบข้อมูลให้ทำงานกับ state โดยตรง
    const handleDeleteBook = (bookId) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            // สร้าง array ใหม่ที่ไม่มีหนังสือเล่มที่ถูกลบ
            const updatedBooks = books.filter(book => book.id !== bookId);
            // อัปเดต state
            setBooks(updatedBooks);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-200 to-pink-200 text-white shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <BookOpenIcon className="h-8 w-8 text-white" />
                            <h1 className="text-2xl font-bold">BookStore - BackOffice</h1>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                        >
                            <LogoutIcon className="h-5 w-5" />
                            <span>ออกจากระบบ</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-700">จัดการหนังสือทั้งหมด</h2>
                    <button
                        onClick={handleAddBook}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <PlusIcon className="h-5 w-5 inline-block mr-1" />
                        เพิ่มหนังสือ

                    </button>
                </div>
                
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {books.map((book) => (
                                <tr key={book.id}>      
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.author}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.isbn}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.year}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">฿{book.price?.toLocaleString('th-TH', 
                                        { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }
                                    )}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">

                                        {/* <-- 4. แก้ไข: เพิ่ม onClick ให้กับปุ่มต่างๆ */}
                                        <button 
                                            onClick={() => handleEditBook(book.id)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                            title='แก้ไข'
                                        >
                                            <PencilIcon className="h-5 w-5 inline" />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteBook(book.id)}
                                            className="text-red-600 hover:text-red-900"
                                            title='ลบ'
                                        >
                                            <TrashIcon className="h-5 w-5 inline" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllBookPage;