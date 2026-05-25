function Notification({ showNotification }) {
  if (!showNotification) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in-up no-print">
      <div className={`p-4 rounded-xl shadow-lg flex items-center space-x-2 text-white font-semibold ${
        showNotification.type === 'error' ? 'bg-rose-600' : showNotification.type === 'warning' ? 'bg-amber-500' : 'bg-emerald-600'
      }`}>
        <span>{showNotification.message}</span>
      </div>
    </div>
  );
}
