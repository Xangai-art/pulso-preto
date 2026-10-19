import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import architectureMd from '../content/arquitetura.md?raw';
import DesignSystem from '../components/DesignSystem';

export default function Architecture() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <DesignSystem />
      <hr className="border-pulso-dourado/25 my-16" />
      <article className="prose-project [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-pulso-verde [&_h1]:mb-2
        [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-pulso-verde [&_h2]:mt-10 [&_h2]:mb-4
        [&_h3]:font-bold [&_h3]:text-pulso-verde [&_h3]:mt-6 [&_h3]:mb-2
        [&_p]:text-pulso-marrom [&_p]:mb-4 [&_p]:leading-relaxed
        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:text-pulso-marrom
        [&_li]:mb-1
        [&_table]:w-full [&_table]:text-xs [&_table]:mb-8 [&_table]:border-collapse
        [&_th]:border [&_th]:border-pulso-dourado/25 [&_th]:bg-pulso-creme [&_th]:p-2 [&_th]:text-left [&_th]:font-semibold
        [&_td]:border [&_td]:border-pulso-dourado/25 [&_td]:p-2 [&_td]:align-top
        [&_pre]:bg-pulso-verde [&_pre]:text-pulso-creme [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:text-xs [&_pre]:mb-6
        [&_code]:text-xs
        [&_hr]:border-pulso-dourado/25 [&_hr]:my-10
        [&_strong]:text-pulso-verde
        [&_em]:text-pulso-marrom/70
      ">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{architectureMd}</ReactMarkdown>
      </article>
    </div>
  );
}
