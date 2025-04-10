import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import InputField from './InputField'; // Your reusable input field
import { addProjectAction } from '../redux/slice/project.slice';

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  coverImage: Yup.string().url('Must be a valid URL').notRequired(),
});

const AddProject = ({ onClose }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    const newProject = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      coverImage: data.coverImage || '', 
      tasks: [],
    };

    dispatch(addProjectAction(newProject));
    onClose(); 
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Add New Project</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Title"
            name="title"
            register={register}
            placeholder="Enter project title"
            error={errors.title?.message}
          />

          <InputField
            label="Description"
            name="description"
            register={register}
            placeholder="Enter project description"
            error={errors.description?.message}
          />

          <InputField
            label="Cover Image URL (optional)"
            name="coverImage"
            register={register}
            placeholder="https://example.com/image.jpg"
            error={errors.coverImage?.message}
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
