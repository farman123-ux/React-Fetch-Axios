import { useState } from 'react'

export default function LearningSection() {
  const [activeTab, setActiveTab] = useState('what-is-api')
  const [copiedId, setCopiedId] = useState(null)

  const handleCopy = (codeText, id) => {
    navigator.clipboard.writeText(codeText)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const topics = [
    {
      id: 'what-is-api',
      title: '1. What are API Calls in React?',
      badge: 'Core Concept',
      description:
        'An API (Application Programming Interface) allows your React front-end to talk to a backend server to get or send data (like user profiles, posts, or products).',
      explanation: [
        'React components run in the browser (client-side). They do not store permanent databases.',
        'To get dynamic data, React makes an HTTP request (like a GET request) to an API endpoint.',
        'Because fetching data takes time (asynchronous), we run the request inside the useEffect hook so it executes after the component renders, without blocking the screen.',
      ],
      code: `// Why useEffect? It runs side-effects like API fetching!
import { useEffect, useState } from 'react'

function UserList() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    // 1. Fetch runs once when the component mounts
    // 2. The empty array [] prevents an infinite loop!
  }, [])

  return <div>Component UI</div>
}`,
      tip: 'Always provide an empty dependency array [] to useEffect if you only want the API call to run once when the page loads.',
    },
    {
      id: 'fetch-api',
      title: '2. Fetch API – Making GET Requests',
      badge: 'Built-in',
      description:
        'fetch() is built directly into modern web browsers. You do not need to install any external npm library to use it.',
      explanation: [
        'Step 1: Call fetch(url) with await to get the HTTP Response.',
        'Step 2: Check if response.ok is true. Fetch does NOT automatically throw on 404 or 500 errors!',
        'Step 3: Call await response.json() to parse the JSON string into JavaScript objects.',
      ],
      code: `async function loadUsers() {
  try {
    // 1. Send the GET request
    const response = await fetch('https://jsonplaceholder.typicode.com/users')

    // 2. IMPORTANT: Check if request was successful (200-299 status)
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`)
    }

    // 3. Parse JSON body
    const data = await response.json()
    setUsers(data)
  } catch (error) {
    console.error('Fetch failed:', error.message)
  }
}`,
      tip: 'Remember: response.json() is also asynchronous, so you must put "await" in front of response.json().',
    },
    {
      id: 'axios-api',
      title: '3. Axios – Making GET Requests',
      badge: 'Popular Library',
      description:
        'Axios is a lightweight, widely-used third-party library (npm install axios) that simplifies HTTP requests.',
      explanation: [
        'Automatic JSON parsing: You access data directly at response.data without calling .json().',
        'Automatic error throwing: If the server returns a 404, 401, or 500 error, Axios automatically jumps into the catch block.',
        'Cleaner syntax: Less boilerplate code compared to the native Fetch API.',
      ],
      code: `import axios from 'axios'

async function loadPosts() {
  try {
    // 1. Axios handles the request and parses JSON automatically
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')

    // 2. The result is directly in response.data
    setPosts(response.data)
  } catch (error) {
    // Axios automatically catches 4xx and 5xx HTTP errors
    console.error('Axios error:', error.message)
  }
}`,
      tip: 'With Axios, your data is always stored under response.data. You do not need to check response.ok manually.',
    },
    {
      id: 'loading-state',
      title: '4. Managing Loading State',
      badge: 'UX Essential',
      description:
        'API calls take time to travel across the internet. A loading state gives users visual feedback while waiting for data.',
      explanation: [
        'Initialize loading to true using useState: const [loading, setLoading] = useState(true).',
        'Keep loading true while the request is in flight.',
        'Always set loading to false in the finally {} block so it turns off whether the request succeeded or failed.',
      ],
      code: `const [loading, setLoading] = useState(true)

async function fetchData() {
  setLoading(true) // Start loading
  try {
    const res = await axios.get('/api/items')
    setItems(res.data)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false) // Always stops loading (success or error)
  }
}

// In your JSX:
if (loading) {
  return <div className="spinner">Loading your data...</div>
}`,
      tip: 'Using the "finally" block ensures setLoading(false) always executes, preventing your app from getting stuck on the loading screen forever.',
    },
    {
      id: 'error-handling',
      title: '5. Error Handling with try...catch',
      badge: 'Stability',
      description:
        'Network drops, offline devices, or 404 errors can happen at any time. Graceful error handling prevents your application from crashing.',
      explanation: [
        'Create an error state: const [error, setError] = useState(null).',
        'Wrap your fetch code inside a try { ... } catch (err) { ... } block.',
        'IMPORTANT: Place try/catch INSIDE the async function, not outside of its declaration.',
      ],
      code: `const [error, setError] = useState(null)

useEffect(() => {
  async function getData() {
    try {
      setError(null) // Reset any previous error
      const res = await axios.get('https://api.example.com/data')
      setData(res.data)
    } catch (err) {
      // Save readable error message to display in UI
      setError(err.message || 'Failed to fetch data')
    }
  }

  getData()
}, [])

// In your JSX:
if (error) {
  return <div className="error-alert">Error: {error}</div>
}`,
      tip: 'Do not put try/catch around the function definition in useEffect. Put it inside the async function body so asynchronous promise errors are properly caught.',
    },
    {
      id: 'displaying-data',
      title: '6. Displaying API Data with .map()',
      badge: 'React Rendering',
      description:
        'Once API data arrives in state as an array, use JavaScript .map() to transform each item into JSX elements.',
      explanation: [
        'Every mapped element must have a unique "key" prop (usually item.id). React uses this for efficient DOM updates.',
        'Make sure to initialize your state to an empty array ([]) so .map() doesn’t crash on the initial render.',
        'Use conditional rendering: check loading and error states before rendering the list.',
      ],
      code: `function UserList({ users }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {users.map((user) => (
        // KEY PROP IS REQUIRED:
        <div key={user.id} className="p-4 border rounded-lg">
          <h3 className="font-bold">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      ))}
    </div>
  )
}`,
      tip: 'Never use the array index as the key if the list can be reordered or filtered. Always prefer a persistent unique ID like user.id.',
    },
    {
      id: 'all-together',
      title: '7. The Complete 3-State Pattern',
      badge: 'Gold Standard',
      description:
        'The gold standard pattern for every React API call handles 3 distinct states: Loading, Error, and Success.',
      explanation: [
        'State 1: Loading (Show spinner or skeleton).',
        'State 2: Error (Show friendly error message and a retry button).',
        'State 3: Success (Render the fetched data using .map()).',
      ],
      code: `function MyComponent() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const res = await axios.get('/api/users')
        setData(res.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // 1. Loading UI
  if (loading) return <p>Loading data...</p>

  // 2. Error UI
  if (error) return <p className="text-red-500">Error: {error}</p>

  // 3. Success UI
  return (
    <ul>
      {data.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  )
}`,
      tip: 'By handling all 3 states (loading, error, success), your application provides a smooth, bug-free experience on every device.',
    },
  ]

  const currentTopic = topics.find((t) => t.id === activeTab) || topics[0]

  return (
    <section id="learn" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
            Step-by-Step Curriculum
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Learn the Fundamentals
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg">
            Select a topic below to read simple explanations and study clean, copyable code examples.
          </p>
        </div>

        {/* Topic Selector Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setActiveTab(topic.id)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                activeTab === topic.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {topic.title.split('–')[0]}
            </button>
          ))}
        </div>

        {/* Selected Topic Content Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Card Header */}
          <div className="p-6 sm:p-8 border-b border-slate-200 bg-gradient-to-r from-slate-900 to-indigo-950 text-white">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                {currentTopic.badge}
              </span>
              <span className="text-xs text-slate-400">Topic {topics.indexOf(currentTopic) + 1} of {topics.length}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {currentTopic.title}
            </h3>
            <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-3xl">
              {currentTopic.description}
            </p>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Key Bullet Points */}
            <div className="lg:col-span-5 space-y-6">
              <h4 className="text-base font-bold text-slate-900 uppercase tracking-wide text-xs">
                Key Concepts to Remember:
              </h4>
              <ul className="space-y-3.5">
                {currentTopic.explanation.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Beginner Tip Callout Box */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-bold mb-1 text-amber-800">
                  <span>💡</span>
                  <span>Beginner Tip:</span>
                </div>
                <p className="leading-relaxed">{currentTopic.tip}</p>
              </div>
            </div>

            {/* Right: Code Example with Copy Button */}
            <div className="lg:col-span-7">
              <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shadow-inner flex flex-col h-full">
                {/* Code Window Header */}
                <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                    <span className="ml-2 text-xs font-mono text-slate-400">ExampleCode.jsx</span>
                  </div>
                  <button
                    onClick={() => handleCopy(currentTopic.code, currentTopic.id)}
                    className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition flex items-center gap-1 cursor-pointer"
                  >
                    {copiedId === currentTopic.id ? '✓ Copied!' : 'Copy Code'}
                  </button>
                </div>

                {/* Code Content */}
                <pre className="p-4 sm:p-5 font-mono text-xs sm:text-sm text-indigo-100 overflow-x-auto leading-relaxed flex-1">
                  <code>{currentTopic.code}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
