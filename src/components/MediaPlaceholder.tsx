type Props = {
  kind: 'Image' | 'Video';
  title: string;
  alt: string;
  note: string;
  className?: string;
};

/**
 * Replace this component with an <img> or <video> after approved media is ready.
 * The visible ALT field is retained so the final upload has an SEO-ready description.
 */
export function MediaPlaceholder({kind, title, alt, note, className = ''}: Props) {
  return <div className={`media-placeholder ${className}`} role="img" aria-label={alt} data-alt={alt}>
    <div className="media-placeholder-grid" aria-hidden="true"><span /><span /><span /><span /></div>
    <div className="media-placeholder-copy"><p>{kind.toUpperCase()} PLACEHOLDER</p><strong>{title}</strong><small>{note}</small><em>Suggested alt: {alt}</em></div>
    {kind === 'Video' && <span className="media-play" aria-hidden="true">▶</span>}
  </div>;
}
