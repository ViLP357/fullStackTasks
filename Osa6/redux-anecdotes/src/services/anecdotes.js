const baseUrl = 'http://localhost:3001/anecdotes'
const getAll = async () => {
    const response = await fetch(baseUrl)
    if (!response.ok) {
        throw new Error('Failed to fetch anecdotes')
    }
    const data = await response.json()
    return data
}

const createNew = async (content) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content, votes: 0}),
    })
    if (!response.ok) {
        throw new Error('Failed to create anecdote')
    }
    return await response.json()
}

const voteAnecdote = async (id, content) => {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(content)
    })
    if (!response.ok) {
        throw new Error('Failed to vote!!!')
    }
    return await response.json()
}

export default { getAll, createNew, voteAnecdote }