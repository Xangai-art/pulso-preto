# Guia de Versionamento de Identidade Visual

## 🎯 Objetivo

Este sistema permite **mudar o nome, visual e narrativa do projeto** editando **1 ÚNICA LINHA DE CÓDIGO**, preservando memória histórica completa de todas as versões anteriores.

---

## 📋 Índice

1. [Problema Resolvido](#problema-resolvido)
2. [Arquitetura](#arquitetura)
3. [Como Usar](#como-usar)
4. [Migração Gradual](#migração-gradual)
5. [Casos de Uso](#casos-de-uso)
6. [Referência da API](#referência-da-api)

---

## Problema Resolvido

### ❌ ANTES (Arquitetura Legada)

**Cenário:** Mudar de "Gente Preta" para "Pulso Preto"

```typescript
// site/src/data/project.ts
export const projectInfo = {
  name: 'Gente Preta', // ❌ Hardcoded aqui
  //...
};

// app/src/data/project.ts
export const projectInfo = {
  name: 'Gente Preta', // ❌ E duplicado aqui
  //...
};

// site/src/components/Logo.tsx
<title>Gente Preta</title> // ❌ E hardcoded em componentes

// app/src/components/Header.tsx
aria-label="Gente Preta" // ❌ E em atributos de acessibilidade

// site/src/pages/Home.tsx
<h1>Bem-vindo ao Gente Preta</h1> // ❌ E em conteúdo editorial

// ... ~20-30 arquivos mais
```

**Esforço para mudar:** 
- 🕐 **2-4 horas** de trabalho manual
- ⚠️ **Alto risco** de inconsistência (esquecer algum arquivo)
- ❌ **Perda de memória** histórica (versão anterior desaparece)
- 🚫 **Impossível** fazer A/B testing de nomes
- 🚫 **Impossível** resgatar visuais antigos para campanhas vintage

---

### ✅ DEPOIS (Arquitetura CEOS + Brand Canon)

**Cenário:** Mudar de "Gente Preta" para "Pulso Preto"

```typescript
// shared/data/brand-canon.ts
export const CURRENT_BRAND_VERSION: BrandVersionId = 'pulso-preto-v1';
//                                                    ^^^^^^^^^^^^^^^^
//                                                    MUDA AQUI ✅
```

**Esforço para mudar:**
- ⏱️ **10 segundos** (editar 1 linha + commit)
- ✅ **Zero risco** de inconsistência
- ✅ **Memória preservada** (todas as versões documentadas)
- ✅ **A/B testing** nativo (trocar versão por feature flag)
- ✅ **Resgates vintage** triviais (mudar versão = mudar visual)

---

## Arquitetura

### Estrutura de Arquivos

```
/shared/
  /data/
    brand-canon.ts         # ← FONTE ÚNICA DE VERDADE
    project-adapter.ts     # ← Ponte para código legado
    
/site/
  /src/
    /data/
      project.ts           # ⚠️ LEGADO (será depreciado)
    /pages/
      Home.tsx             # ✅ Consome project-adapter
      
/app/
  /src/
    /data/
      project.ts           # ⚠️ LEGADO (será depreciado)
    /components/
      Header.tsx           # ✅ Consome project-adapter
```

### Fluxo de Dados

```
┌──────────────────────────────────────────────────────────────┐
│ brand-canon.ts                                               │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ BRAND_VERSIONS = {                                       │ │
│ │   'gente-preta-v1': { name: 'Gente Preta', ... },       │ │
│ │   'pulso-preto-v1': { name: 'Pulso Preto', ... },       │ │
│ │ }                                                         │ │
│ │                                                           │ │
│ │ CURRENT_BRAND_VERSION = 'pulso-preto-v1' ← MUDA AQUI    │ │
│ └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────────┐
│ project-adapter.ts                                           │
│ export const projectInfo = getProjectInfo()                 │
│ // { name: 'Pulso Preto', subtitle: '...', tagline: '...' } │
└──────────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────────┐
│ Componentes React (site + app)                              │
│ import { projectInfo } from '@shared/data/project-adapter'  │
│ <h1>{projectInfo.name}</h1> // ← Renderiza "Pulso Preto"   │
└──────────────────────────────────────────────────────────────┘
```

---

## Como Usar

### Opção 1: Import Simples (Recomendado para Migração)

```typescript
// site/src/pages/Home.tsx
import { projectInfo } from '@shared/data/project-adapter';

export default function Home() {
  return (
    <div>
      <h1>{projectInfo.name}</h1>
      <p>{projectInfo.tagline}</p>
    </div>
  );
}
```

### Opção 2: Import Funcional (Mais Flexível)

```typescript
import { getProjectInfo, getProjectMetadata } from '@shared/data/project-adapter';

const projectInfo = getProjectInfo();
const metadata = getProjectMetadata();

// SEO
<Helmet>
  <title>{metadata.title}</title>
  <meta name="description" content={metadata.description} />
  <meta property="og:title" content={metadata.ogTitle} />
</Helmet>
```

### Opção 3: Acesso Direto ao Brand Canon (Para Design System)

```typescript
import { getCurrentBrand, getBrandHistory } from '@shared/data/brand-canon';

const brand = getCurrentBrand();

// Design tokens
const primaryColor = brand.designSystem.primaryTone; // 'folha'
const palette = brand.designSystem.palette;          // 'cultural-ancestral-v1'

// História da marca (para página "Sobre")
const history = getBrandHistory();
```

---

## Migração Gradual

### Fase 1: Criar Infraestrutura ✅ CONCLUÍDA

- [x] `shared/data/brand-canon.ts` criado
- [x] `shared/data/project-adapter.ts` criado
- [x] Documentação escrita

### Fase 2: Migrar Componentes Principais (Sprint Atual)

**Prioridade ALTA:**

```bash
# Site
site/src/pages/Home.tsx
site/src/pages/About.tsx
site/src/components/Header.tsx
site/src/components/Footer.tsx
site/src/components/Logo.tsx

# App
app/src/components/Header.tsx
app/src/components/Profile.tsx
app/src/components/Logo.tsx
```

**Padrão de refatoração:**

```diff
- import { projectInfo } from '@/data/project';
+ import { projectInfo } from '@shared/data/project-adapter';

  export default function Header() {
    return <h1>{projectInfo.name}</h1>;
+   // ↑ Agora consome Brand Canon automaticamente
  }
```

### Fase 3: Depreciar Arquivos Legados (Próxima Sprint)

1. Adicionar aviso de depreciação:

```typescript
// site/src/data/project.ts
/**
 * @deprecated
 * Este arquivo será removido em breve.
 * Use `@shared/data/project-adapter` em vez disso.
 * 
 * Migração: https://github.com/.../docs/BRAND_VERSIONING_GUIDE.md
 */
export const projectInfo = { ... };
```

2. Verificar que não há imports legados:

```bash
# Buscar imports antigos
grep -r "from '@/data/project'" site/src/
grep -r "from '@/data/project'" app/src/

# Se retornar vazio = migração completa ✅
```

3. Remover arquivos legados:

```bash
git rm site/src/data/project.ts
git rm app/src/data/project.ts
git commit -m "refactor: remove legacy project.ts (migrated to brand-canon)"
```

### Fase 4: Integrar com Asset Fabric (Futuro)

```typescript
// shared/data/brand-canon.ts
export interface BrandIdentity {
  // ...
  assets: {
    logo: AssetSlot;        // ← Referência semântica
    heroImage: AssetSlot;
    favicon: AssetSlot;
  };
}

// C (Asset Fabric) resolve automaticamente:
const logo = resolveAsset(brand.assets.logo, { theme: 'dark', format: 'svg' });
// → retorna URL do logo correto para a versão ativa
```

---

## Casos de Uso

### 1. Rebranding Permanente

**Cenário:** Mudança oficial de "Gente Preta" para "Pulso Preto"

```typescript
// shared/data/brand-canon.ts

// 1. Atualizar versão antiga para marcar supersedência
'gente-preta-v1': {
  // ...
  supersededBy: 'pulso-preto-v1', // ← Adicionar esta linha
}

// 2. Trocar versão ativa
export const CURRENT_BRAND_VERSION: BrandVersionId = 'pulso-preto-v1';
//                                                    ^^^^^^^^^^^^^^^^
//                                                    MUDA AQUI
```

**Resultado:**
- ✅ Site renderiza "Pulso Preto" em TODOS os lugares
- ✅ Histórico preservado (getBrandHistory() mostra ambas)
- ✅ URLs canônicas atualizadas automaticamente
- ✅ SEO metadata atualizada

---

### 2. Campanha Vintage Temporária

**Cenário:** Lançar edição especial "Gente Preta Vintage" para aniversário de 2 anos

```typescript
// 1. Criar nova versão vintage em brand-canon.ts
'aniversario-2028': {
  id: 'aniversario-2028',
  name: 'Gente Preta — 2 Anos de Impacto',
  visualConcept: 'Paleta original v1 + elementos retrô anos 70',
  designSystem: {
    palette: 'cultural-ancestral-v1', // ← Resgata paleta original
    primaryTone: 'ouro',              // ← Tom celebrativo
    logoVariant: 'ossaim-abstract-vintage-sepia',
  },
}

// 2. Ativar temporariamente
export const CURRENT_BRAND_VERSION = 'aniversario-2028';

// 3. Após campanha (1 mês depois), reverter
export const CURRENT_BRAND_VERSION = 'pulso-preto-v1';
```

**Resultado:**
- ✅ Visual vintage ativado em **1 commit**
- ✅ Rollback trivial (1 linha)
- ✅ Zero código duplicado

---

### 3. A/B Testing de Naming

**Cenário:** Testar se "Pulso Preto" ou "Sentinela Negra" converte melhor

```typescript
// Pseudocódigo (requer feature flag service)
import { getProjectInfo } from '@shared/data/project-adapter';

const versionId = abTestService.getVariant('brand-name-test', {
  control: 'pulso-preto-v1',
  variant: 'sentinela-negra-v1',
});

const projectInfo = getProjectInfo(versionId);
// ↑ Cada usuário vê nome diferente, mas código é o mesmo
```

---

### 4. Página "Nossa História"

**Cenário:** Mostrar evolução da marca no site

```typescript
import { getBrandHistoryForDisplay } from '@shared/data/project-adapter';

export default function HistoryPage() {
  const history = getBrandHistoryForDisplay();
  
  return (
    <div>
      <h1>Nossa Jornada</h1>
      {history.map(entry => (
        <div key={entry.name}>
          <h2>{entry.name}</h2>
          <p className="period">{entry.period}</p>
          <p>{entry.rationale}</p>
          <blockquote>{entry.visualConcept}</blockquote>
        </div>
      ))}
    </div>
  );
}
```

**Saída:**
```
Nossa Jornada

Gente Preta
2026-04-27 — 2026-10-07
Versão original do projeto piloto financiado pela AECID...
"Cultural-ancestral com referências abstratas a Ossaim..."

Pulso Preto
2026-10-07 — presente
Rebranding para enfatizar monitoramento contínuo...
"Mantém paleta cultural-ancestral v1..."
```

---

## Referência da API

### `brand-canon.ts`

```typescript
// TIPOS
type BrandVersionId = 'gente-preta-v1' | 'pulso-preto-v1' | ...;

interface BrandIdentity {
  id: BrandVersionId;
  name: string;
  slug: string;
  subtitle: string;
  tagline: string;
  effectiveDate: string;
  supersededBy?: BrandVersionId;
  rationale?: string;
  visualConcept?: string;
  designSystem: { palette, primaryTone, logoVariant };
  urls: { main, app, api };
}

// CONSTANTES
BRAND_VERSIONS: Record<BrandVersionId, BrandIdentity>
CURRENT_BRAND_VERSION: BrandVersionId

// FUNÇÕES
getCurrentBrand(): BrandIdentity
getBrandVersion(id: BrandVersionId): BrandIdentity
getAllBrandVersions(): BrandIdentity[]
getBrandHistory(): BrandIdentity[]  // Ordem cronológica
getPreviousBrand(id: BrandVersionId): BrandIdentity | null
getBrandMetadata(id?: BrandVersionId): MetadataObject
```

### `project-adapter.ts`

```typescript
// INTERFACE LEGADA
interface ProjectInfo {
  name: string;
  subtitle: string;
  tagline: string;
  scope: string;
}

// FUNÇÕES
getProjectInfo(versionId?: BrandVersionId, scope?: string): ProjectInfo
getProjectUrls(versionId?: BrandVersionId): { main, app, api }
getProjectMetadata(versionId?: BrandVersionId): MetadataObject
isVintageBrand(versionId?: BrandVersionId): boolean
getVisualConcept(versionId?: BrandVersionId): string
getBrandHistoryForDisplay(): BrandHistoryEntry[]

// EXPORTS
export const projectInfo = getProjectInfo(); // Compatibilidade legada
```

---

## 🎓 Princípios Arquiteturais Aplicados

1. **Single Source of Truth (SSOT)**
   - `CURRENT_BRAND_VERSION` é a ÚNICA declaração de versão ativa

2. **Separation of Concerns**
   - Brand Canon (X) ≠ Presentation (Z) ≠ Assets (C)

3. **Open/Closed Principle**
   - Aberto para extensão (adicionar novas versões)
   - Fechado para modificação (versões antigas nunca mudam)

4. **Don't Repeat Yourself (DRY)**
   - Zero duplicação de dados entre `site/` e `app/`

5. **Historical Preservation**
   - Cada versão é imutável após criação
   - `supersededBy` documenta sucessão sem destruir o predecessor

---

## 🚀 Próximos Passos

- [ ] Migrar `site/src/pages/Home.tsx` para `project-adapter`
- [ ] Migrar `app/src/components/Header.tsx` para `project-adapter`
- [ ] Atualizar `site/src/components/Logo.tsx` para usar `brand.designSystem.logoVariant`
- [ ] Integrar com Asset Fabric (Fase 4)
- [ ] Adicionar feature flag para A/B testing de versões
- [ ] Criar visualização interativa de histórico de marca

---

## 📞 Suporte

Dúvidas sobre migração? Consulte:
- **Arquiteto:** Dan Couto (CASIO V2 Studio)
- **Documentação CEOS:** `/docs/ARQUITETURA_CEOS.md`
- **Issue Tracker:** GitHub Issues com tag `[brand-versioning]`
