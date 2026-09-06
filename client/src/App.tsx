import { useEffect, useState } from 'react'
import Body from './components/body'

// Smoke-test page for the full stack: calls the gateway's health route and
// renders whatever it returns. No routing/auth/feature UI here yet.
function App() {
  const [health, setHealth] = useState<unknown>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then(setHealth)
      .catch((err) => setError(String(err)))
  }, [])

  return (
    <main>
      <h1>A2603 — Stack Health Check</h1>
      <p>GET /api/health</p>
      {error && <pre style={{ color: 'red' }}>{error}</pre>}
      {!error && <pre>{JSON.stringify(health, null, 2)}</pre>}
      <Body />
    </main>
  )
}

export default App
