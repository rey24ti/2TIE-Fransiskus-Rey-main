import React, { useState } from 'react';

// Jika template kamu menggunakan Material UI atau komponen lokal, bisa diimport di sini
const UserManagement = () => {
    const [names, setNames] = useState(['Andi', 'Budi', 'Caca']);
    const [input, setInput] = useState('');
    const [search, setSearch] = useState('');

    const handleAdd = () => {
        if (input.trim()) {
            setNames([...names, input]);
            setInput('');
        }
    };

    const filteredNames = names.filter(n => 
        n.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ padding: '20px', background: 'white', borderRadius: '8px' }}>
            <h2>User Management</h2>
            
            {/* Input Nama Baru */}
            <div style={{ marginBottom: '20px' }}>
                <input 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Tambah nama baru..." 
                    style={{ padding: '8px', marginRight: '10px' }}
                />
                <button onClick={handleAdd} style={{ padding: '8px 15px' }}>Tambah</button>
            </div>
            
            {/* Input Pencarian */}
            <div style={{ marginBottom: '20px' }}>
                <input 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    placeholder="Cari nama..." 
                    style={{ padding: '8px', width: '100%', maxWidth: '300px' }}
                />
            </div>

            {/* Hasil Output */}
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {filteredNames.map((name, i) => (
                    <li key={i} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                        {name}
                    </li>
                ))}
                {filteredNames.length === 0 && <p>Nama tidak ditemukan.</p>}
            </ul>
        </div>
    );
};

export default UserManagement;