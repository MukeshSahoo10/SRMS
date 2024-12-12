import React, { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { db, Student } from "../db/db";
import toast from "react-hot-toast";

const calculateGrade = (percentage: number): string => {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 50) return "D";
  return "F";
};

export default function StudentForm() {
  const [formData, setFormData] = useState({
    rollNumber: "",
    name: "",
    class: "",
    subjects: [{ name: "", marks: 0 }],
  });

  const addSubject = () => {
    setFormData((prev) => ({
      ...prev,
      subjects: [...prev.subjects, { name: "", marks: 0 }],
    }));
  };

  const removeSubject = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const totalMarks = formData.subjects.reduce(
      (sum, subject) => sum + subject.marks,
      0
    );
    const percentage = (totalMarks / (formData.subjects.length * 100)) * 100;

    const studentData: Student = {
      ...formData,
      totalMarks,
      percentage,
      grade: calculateGrade(percentage),
      createdAt: new Date(),
    };

    try {
      await db.students.add(studentData);
      toast.success("Student result added successfully!");
      setFormData({
        rollNumber: "",
        name: "",
        class: "",
        subjects: [{ name: "", marks: 0 }],
      });
    } catch (error) {
      toast.error("Failed to add student result");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Roll Number
          </label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            value={formData.rollNumber}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, rollNumber: e.target.value }))
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Class
          </label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            value={formData.class}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, class: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Subjects</h3>
          <button
            type="button"
            onClick={addSubject}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Subject
          </button>
        </div>

        {formData.subjects.map((subject, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Subject Name
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                value={subject.name}
                onChange={(e) => {
                  const newSubjects = [...formData.subjects];
                  newSubjects[index].name = e.target.value;
                  setFormData((prev) => ({ ...prev, subjects: newSubjects }));
                }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Marks
              </label>
              <input
                type="number"
                required
                min="0"
                max="100"
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                value={subject.marks || ""}
                onChange={(e) => {
                  const newSubjects = [...formData.subjects];
                  const newValue =
                    e.target.value === "" ? 0 : Number(e.target.value);
                  newSubjects[index].marks = newValue;
                  setFormData((prev) => ({ ...prev, subjects: newSubjects }));
                }}
              />
            </div>
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeSubject(index)}
                className="mt-6 p-2 text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Result
        </button>
      </div>
    </form>
  );
}
