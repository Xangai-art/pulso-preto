// Embed responsivo de vídeo do YouTube — usado na hero da Home, na página Sobre e
// nos cards de Memória e Herança. Suporta paisagem (16:9, padrão) e retrato (9:16,
// para vídeos verticais tipo depoimento/Reels), mantendo a proporção correta em
// qualquer largura de container (wrapper com padding-bottom).
interface VideoEmbedProps {
  youtubeId: string;
  title: string;
  className?: string;
  orientation?: 'landscape' | 'portrait';
}

const PADDING_BY_ORIENTATION = {
  landscape: '56.25%', // 16:9
  portrait: '177.78%', // 9:16
};

export default function VideoEmbed({ youtubeId, title, className = '', orientation = 'landscape' }: VideoEmbedProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-earth-200 bg-earth-900 shadow-sm ${className}`}
      style={{ paddingBottom: PADDING_BY_ORIENTATION[orientation] }}
    >
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
