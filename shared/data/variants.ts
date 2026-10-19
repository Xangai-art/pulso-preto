/**
 * IDENTIDADE PULSO PRETO (PP3) — Identidade ÚNICA de produção
 *
 * HISTÓRICO (arquitetura CEOS, Fase 3):
 * Durante o teste mínimo da arquitetura CEOS existiram 3 variantes de design
 * (GP0 = "Gente Preta" original; PP1 = Pulso Preto "família"; PP2 = Pulso
 * Preto "mulher") trocáveis em runtime por um seletor de aparência. Esse teste
 * cumpriu seu papel e foi ENCERRADO.
 *
 * A partir de PP3 (identidade única de produção, SSOT):
 * - GP0, PP1 e PP2 SOMEM da UI de vez — não há mais seletor de variante nem
 *   ramificação de código por variante em nenhuma página ou no aplicativo.
 * - Existe UMA única identidade visual de produção: "Pulso Preto", ancorada no
 *   Canon (brand-canon.ts → 'pulso-preto-v1') e na paleta/tipografia OFICIAIS
 *   do pacote de identidade de marca (00_Identidade.zip).
 * - A camada de idioma (LOCALES → locales.ts) permanece: PT/ES continuam
 *   trocáveis em runtime (é um seletor de idioma, não de marca).
 *
 * Este arquivo agora descreve apenas os ATIVOS visuais fixos da identidade
 * Pulso Preto que não vivem no Canon (imagens de hero/missão). Nomes e taglines
 * continuam vindo exclusivamente do Canon (fonte única de verdade).
 */

export interface BrandImage {
  url: string;
  alt: string;
}

/**
 * Fotografia oficial de hero — família negra reunida, retrato de afeto e união.
 * Ativo reaproveitado do acervo produzido para as variantes anteriores (PP1/PP2),
 * conforme decisão D15 (usar exclusivamente o que foi produzido para
 * GP0/PP1/PP2; não gerar novas imagens nem buscar fotos).
 */
export const HERO_IMAGE: BrandImage = {
  url: 'https://sspark.genspark.ai/i/vNw4tCYwkHPw1Y3n?width=2560',
  alt: 'Família negra sorrindo e se abraçando, pai sentado ao centro recebendo beijos das duas filhas e da esposa — retrato de afeto e união familiar',
};

/**
 * Fotografia oficial da faixa de missão — retrato de mulher negra madura,
 * expressão serena e digna. Mesmo acervo reaproveitado (D15).
 */
export const MISSION_IMAGE: BrandImage = {
  url: 'https://sspark.genspark.ai/i/Z1eyFhNDHigJwGf6?width=2560',
  alt: 'Retrato de mulher negra madura, cabelo em tranças, expressão serena e digna, olhando diretamente para a câmera',
};
