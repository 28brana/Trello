import React from 'react';
import { useNavigate } from 'react-router-dom';

const getGradientFromId = (id) => {
  const colors = [
    ['from-pink-500', 'to-yellow-500'],
    ['from-blue-500', 'to-cyan-500'],
    ['from-green-500', 'to-lime-500'],
    ['from-purple-500', 'to-fuchsia-500'],
    ['from-red-500', 'to-orange-500'],
    ['from-teal-500', 'to-indigo-500'],
  ];
  const index = Math.abs([...id].reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length;
  return colors[index];
};

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const gradient = getGradientFromId(project.id || project.title || 'default');

  return (
    <div
      className="border rounded-xl p-4 shadow cursor-pointer hover:scale-105 transition bg-white"
      onClick={() => navigate(`/project/${project.id}`)}
    >
      {project.coverImage ? (
        <img
          src={project.coverImage}
          alt="cover"
          className="w-full h-40 object-cover rounded-md"
        />
      ) : (
        <div
          className={`w-full h-40 rounded-md bg-gradient-to-r ${gradient[0]} ${gradient[1]}`}
        />
      )}
      <h3 className="text-xl font-bold mt-3">{project.title}</h3>
      <p className="text-sm text-gray-500">{project.description}</p>
    </div>
  );
};

export default ProjectCard;
