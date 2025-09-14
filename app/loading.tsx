export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="animate-pulse space-y-4 w-full max-w-md px-4">
        <div className="h-8 bg-surface rounded-lg w-3/4 mx-auto shadow-card"></div>
        <div className="space-y-3">
          <div className="h-4 bg-surface rounded w-full shadow-card"></div>
          <div className="h-4 bg-surface rounded w-5/6 shadow-card"></div>
          <div className="h-32 bg-surface rounded-lg shadow-card"></div>
        </div>
        <div className="flex space-x-2">
          <div className="h-10 bg-surface rounded-md flex-1 shadow-card"></div>
          <div className="h-10 bg-surface rounded-md w-20 shadow-card"></div>
        </div>
      </div>
    </div>
  );
}
