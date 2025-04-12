import React from 'react';
import { useNavigate } from 'react-router-dom';

const getRandomGradient = () => {
  const colors = [
    ['from-pink-700', 'to-yellow-700'],
    ['from-blue-700', 'to-cyan-700'],
    ['from-green-700', 'to-lime-700'],
    ['from-purple-700', 'to-fuchsia-700'],
    ['from-red-700', 'to-orange-700'],
    ['from-teal-700', 'to-indigo-700'],
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const gradient = getRandomGradient(); // Get a random gradient

  return (
    <div
      className="border border-gray-700 rounded-xl p-4 shadow-md cursor-pointer hover:scale-105 transition-transform bg-gray-800 hover:shadow-xl"
      onClick={() => navigate(`/project/${project.id}`)}
      aria-label={`View project: ${project.title}`}
    >
      {project.coverImage ? (
        <img
          src={project.coverImage}
          alt={`Cover image for project: ${project.title}`}
          className="w-full h-40 object-cover rounded-md"
        />
      ) : (
        <div
          className={`w-full h-40 rounded-md bg-gradient-to-r ${gradient[0]} ${gradient[1]}`}
        />
      )}
      <h3 className="text-xl font-bold mt-3 text-white">{project.title}</h3>
      <p className="text-sm text-gray-400">{project.description}</p>
    </div>
  );
};

export default ProjectCard;
