import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DealsManager from '../components/dashboard/DealsManager';

const AdminDeals = () => {
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <DealsManager />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDeals;