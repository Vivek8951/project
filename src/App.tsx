import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { TaskList } from './components/TaskList';
import { Auth } from './components/Auth';
import { AdminPanel } from './components/AdminPanel';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/auth" />;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAuth();
  return isAdmin ? <>{children}</> : <Navigate to="/" />;
}

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminRoute>
                    <Layout>
                      <AdminPanel />
                    </Layout>
                  </AdminRoute>
                </PrivateRoute>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Layout>
                    <TaskList />
                  </Layout>
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;