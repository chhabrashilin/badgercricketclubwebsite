import { useState, FormEvent } from 'react';
import { Modal } from '../common';
import { useAuth } from '../../context/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(username, password);
    if (success) {
      setUsername('');
      setPassword('');
      onClose();
    } else {
      setError('Invalid username or password');
    }
  };

  const handleClose = () => {
    setUsername('');
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Member Login">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-600">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
            className="w-full px-3 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:border-cricket-green"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            className="w-full px-3 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:border-cricket-green"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-cricket-green text-white rounded-md font-semibold hover:opacity-90 transition-opacity"
        >
          Login
        </button>

        <button
          type="button"
          onClick={handleClose}
          className="w-full py-3 bg-gray-100 text-gray-600 rounded-md font-semibold mt-2 hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-500 text-center">
        Demo credentials:<br />
        Admin: admin / admin123<br />
        Viewer: viewer / viewer123
      </p>
    </Modal>
  );
}
