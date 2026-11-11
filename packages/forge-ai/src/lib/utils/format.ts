/**
 * Formats a date as a short relative time label: "Just now" under a minute, "Xm ago"/"Xh ago"
 * under 24 hours, "Yesterday" between 24-48 hours elapsed, otherwise a short date (with year if
 * not the current year).
 *
 * @param dateString - An ISO date string to format.
 * @returns The formatted relative time label.
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMs / 3_600_000);
  const diffDays = Math.floor(diffMs / 86_400_000);

  if (diffMinutes < 1) {
    return 'Just now';
  }

  if (diffHours < 24) {
    return diffHours >= 1 ? `${diffHours}h ago` : `${diffMinutes}m ago`;
  }

  if (diffDays < 2) {
    return 'Yesterday';
  }

  const sameYear = date.getFullYear() === new Date().getFullYear();
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    ...(sameYear ? {} : { year: 'numeric' })
  }).format(date);
}
