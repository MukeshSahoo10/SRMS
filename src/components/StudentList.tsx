import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function StudentList() {
  const students = useLiveQuery(() => db.students.toArray());

  const deleteStudent = async (id?: number) => {
    if (!id) return;
    
    try {
      await db.students.delete(id);
      toast.success('Student result deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete student result');
    }
  };

  if (!students) return <div>Loading...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Marks</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.rollNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.class}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.totalMarks}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.percentage.toFixed(2)}%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.grade}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button
                  onClick={() => deleteStudent(student.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}