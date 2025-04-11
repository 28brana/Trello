import { useState } from "react";

export default function AddColumn({ onAdd }) {
    const [title, setTitle] = useState('');
    const [showInput, setShowInput] = useState(false);

    const handleSubmit = () => {
        if (title.trim()) {
            onAdd(title.trim());
            setTitle('');
            setShowInput(false);
        }
    };

    return (
        <div className="w-80 rounded-lg bg-neutral-700 p-4 min-w-[300px]">
            {showInput ? (
                <div className="flex flex-col gap-2">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Column title"
                        className="rounded px-2 py-1 text-sm bg-neutral-600 text-white"
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-2 py-1 rounded text-sm"
                    >
                        Add
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setShowInput(true)}
                    className="text-white bg-neutral-600 px-3 py-2 rounded hover:bg-neutral-500"
                >
                    + Add Column
                </button>
            )}
        </div>
    );
};