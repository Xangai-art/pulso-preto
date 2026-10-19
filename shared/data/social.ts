// Redes sociais oficiais — fonte única (usada no rodapé e onde mais for preciso).
// Só entram perfis CONFIRMADOS pelo responsável (20/10/2026: Instagram).
export interface SocialProfile {
  kind: 'instagram' | 'facebook' | 'youtube' | 'linkedin';
  label: string;
  handle: string;
  url: string;
}

export const SOCIAL_PROFILES: SocialProfile[] = [
  {
    kind: 'instagram',
    label: 'Instagram',
    handle: '@pulsovivooficial',
    url: 'https://www.instagram.com/pulsovivooficial/',
  },
];
