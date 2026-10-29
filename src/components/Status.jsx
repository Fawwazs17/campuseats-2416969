export function Loading({ text = 'Loading…' }) {
  return <p className="status-msg muted">{text}</p>
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="status-msg error-box">
      <p>Something went wrong: {message}</p>
      {onRetry && (
        <button type="button" className="btn retry" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  )
}
