import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { GraduationCap, ListChecks } from 'lucide-react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

function App() {
  const [activeTab, setActiveTab] = useState<'form' | 'list'>('form');

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Student Result Management System</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('form')}
                className={`inline-flex items-center px-4 py-2 rounded-md ${
                  activeTab === 'form'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                Add Result
              </button>
              <button
                onClick={() => setActiveTab('list')}
                className={`inline-flex items-center px-4 py-2 rounded-md ${
                  activeTab === 'list'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ListChecks className="w-5 h-5 mr-2" />
                View Results
              </button>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            {activeTab === 'form' ? <StudentForm /> : <StudentList />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;