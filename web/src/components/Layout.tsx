// Archived: moved to web/legacy-react/src/components/Layout.tsx
import React from 'react';

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <div style={{ padding: 16, background: '#f9fafb' }}>
        <div style={{ padding: 12, background: '#2563eb', color: 'white' }}>
            Student Advisor App (archived)
        </div>
        <main>{children}</main>
        <footer style={{ marginTop: 20, color: '#6b7280' }}>See web/legacy-react for original app</footer>
    </div>
);

export default Layout;