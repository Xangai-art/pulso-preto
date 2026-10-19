// ACERVO DE IMAGENS DE MARCA (D15) — fonte única.
// Somente imagens já produzidas para GP0/PP1/PP2. Não gerar novas nem buscar fotos.
// Consumido por pulsoContent.ts (Home) e news.ts (notícias).
import type { BrandImage } from './variants.ts';

const img = (url: string, alt: string): BrandImage => ({ url, alt });

export const BRAND_IMAGES = {
  mulher: img(
    'https://sspark.genspark.ai/i/sPLVw1gqzX87GzaU?width=2560',
    'Mulher negra sorridente com turbante amarelo estampado, brincos e colar dourados'
  ),
  homem: img(
    'https://sspark.genspark.ai/i/b6aTgm3D22sA19f1?width=2560',
    'Retrato em preto e branco de homem negro, mão no queixo, olhar contemplativo'
  ),
  infancia: img(
    'https://sspark.genspark.ai/i/hD2yy6QnDCRI1LsB?width=2560',
    'Criança negra sorrindo, close em preto e branco, olhando para cima'
  ),
  idosa: img(
    'https://sspark.genspark.ai/i/oeW572bhZISbG0YS?width=2560',
    'Mulher negra idosa com lenço rosa na cabeça, brincos dourados, ao ar livre'
  ),
  mental: img(
    'https://sspark.genspark.ai/i/3JqbXuliMdaCVlZ2?width=2560',
    'Mulher negra jovem, cabelo black power, expressão calma e contemplativa'
  ),
  maos: img(
    'https://sspark.genspark.ai/i/yTyxFiFCVMnY6Oae?width=2560',
    'Close de duas mãos entrelaçadas em gesto de apoio e cuidado'
  ),
  mulherRetrato: img(
    'https://sspark.genspark.ai/i/Z1eyFhNDHigJwGf6?width=2560',
    'Retrato de mulher negra madura, cabelo em tranças, expressão serena e digna'
  ),
  pressao: img(
    'https://sspark.genspark.ai/i/cNs5DXQ0ttPM970Y?width=2560',
    'Aferição de pressão arterial com estetoscópio e esfigmomanômetro'
  ),
  profissional: img(
    'https://sspark.genspark.ai/i/c1vXWjURnukvsxXF?width=2560',
    'Profissional de saúde negra, de máscara e luvas, examinando um frasco de vacina em ambiente clínico'
  ),
} satisfies Record<string, BrandImage>;
