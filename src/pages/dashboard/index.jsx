import { Plus } from '@phosphor-icons/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddProject from '../../components/AddProject';
import ProjectCard from '../../components/ProjectCard';

const Dashboard = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.list);
  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const paginated = projects.slice((currentPage - 1) * perPage, currentPage * perPage);
  const totalPages = Math.ceil(projects.length / perPage);

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} weight="bold" />
          <span className="text-sm font-medium">Add Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginated.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-4 items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {showModal && <AddProject onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Dashboard;
