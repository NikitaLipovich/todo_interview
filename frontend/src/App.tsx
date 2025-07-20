"use client"
import { useState, useEffect } from 'react'
import './App.css'

const API_BASE = 'http://localhost:3000/api/tasks';

type Task = {
  id: number
  text: string
  status: 'in progress' | 'completed'
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [text, setText] = useState('')
  const [status, setStatus] = useState<'in progress' | 'completed'>('in progress')
  const [editId, setEditId] = useState<number | null>(null)
  const [editStatus, setEditStatus] = useState<'in progress' | 'completed'>('in progress')
  const [filter, setFilter] = useState<'all' | 'in progress' | 'completed'>('all')

  const fetchTasks = async (statusFilter?: 'in progress' | 'completed') => {
    setLoading(true)
    setError('')
    try {
      let url = `${API_BASE}/list`
      if (statusFilter) url += `?status=${encodeURIComponent(statusFilter)}`
      const res = await fetch(url)
      const data = await res.json()
      setTasks(Array.isArray(data) ? data : [])
    } catch {
      setError('Failed to load tasks')
    }
    setLoading(false)
  }

  useEffect(() => {
    if (filter === 'all') fetchTasks()
    else fetchTasks(filter)
  }, [filter])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch(`${API_BASE}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, status }),
      })
      if (!res.ok) throw new Error('Failed to create task')
      setText('')
      setStatus('in progress')
      fetchTasks()
    } catch {
      setError('Failed to create task')
    }
  }

  const handleUpdate = async (id: number) => {
    setError('')
    try {
      const res = await fetch(`${API_BASE}/update`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: editStatus }),
      })
      if (!res.ok) throw new Error('Failed to update task')
      setEditId(null)
      fetchTasks()
    } catch {
      setError('Failed to delete task')
    }
  }

  const handleDelete = async (id: number) => {
    setError('')
    try {
      const res = await fetch(`${API_BASE}/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (!res.ok) throw new Error('Failed to delete task')
      fetchTasks()
    } catch {
      setError('Failed to delete task')
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">TODO Tasks Demo</h1>
      <div className="flex gap-2 mb-6 items-center">
        <label className="font-medium">Show:</label>
        <select
          className="border rounded px-2 py-1"
          value={filter}
          onChange={e => setFilter(e.target.value as any)}
        >
          <option value="all">All</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <a
          href="http://localhost:3000/api-docs"
          target="_blank"
          rel="noopener"
          className="ml-auto bg-gray-800 text-white px-4 py-1 rounded hover:bg-gray-600"
        >
          API Docs
        </a>
      </div>
      <form onSubmit={handleCreate} className="flex gap-2 mb-6">
        <input
          className="border rounded px-2 py-1 flex-1"
          placeholder="Task text"
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <select
          className="border rounded px-2 py-1"
          value={status}
          onChange={e => setStatus(e.target.value as any)}
        >
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-1 rounded" type="submit">
          Add
        </button>
      </form>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-2">
          {tasks.map(task => (
            <li
              key={task.id}
              className="border rounded p-3 flex items-center justify-between"
            >
              <div>
                <span
                  className={
                    task.status === 'completed' ? 'line-through text-gray-400' : ''
                  }
                >
                  {task.text}
                </span>
                <span className="ml-2 text-xs px-2 py-1 rounded bg-gray-100">
                  {task.status === 'completed' ? 'Completed' : 'In Progress'}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                {editId === task.id ? (
                  <>
                    <select
                      className="border rounded px-2 py-1"
                      value={editStatus}
                      onChange={e => setEditStatus(e.target.value as any)}
                    >
                      <option value="in progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                    <button
                      className="bg-green-600 text-white px-2 py-1 rounded"
                      onClick={() => handleUpdate(task.id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-300 px-2 py-1 rounded"
                      onClick={() => setEditId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                      onClick={() => {
                        setEditId(task.id)
                        setEditStatus(task.status)
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
