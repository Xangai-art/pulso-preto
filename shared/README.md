# `/shared` — Camada Canônica (CEOS Layer X)

## 📍 Propósito

Código compartilhado entre `site/` e `app/` — a **fonte única de verdade** para:
- Identidade de marca versionada
- Dados canônicos
- Utilitários comuns
- Tipos TypeScript compartilhados

---

## 📂 Estrutura

```
/shared/
  /data/
    brand-canon.ts         # Versionamento de identidade visual
    project-adapter.ts     # Ponte para código legado
    
  /utils/                  # (Futuro) Utilitários compartilhados
  /types/                  # (Futuro) Tipos TypeScript compartilhados
```

---

## 🎯 Conceito: Arquitetura CEOS

Este diretório implementa a **Camada X (Canon)** da arquitetura CEOS:

```
X (Canon)    → /shared/data/brand-canon.ts  ← FONTE ÚNICA DE VERDADE
Y (Content)  → site/src/data/diseases.ts, ...
Z (Present.) → site/src/, app/src/          ← CONSOME X
C (Assets)   → (Futuro) /shared/assets/
M (Manifest) → Componentes React
H (HERMES)   → project-adapter.ts
```

**Princípio:**  
> "Nomes, visuais e narrativas mudam. A missão permanece."

---

## 🚀 Quick Start

### Importar Dados de Marca

```typescript
// Em qualquer componente (site/ ou app/)
import { projectInfo } from '@shared/data/project-adapter';

export default function MyComponent() {
  return <h1>{projectInfo.name}</h1>;
  //           ↑ Renderiza "Pulso Preto" automaticamente
}
```

### Trocar de Nome (1 linha)

```typescript
// shared/data/brand-canon.ts
export const CURRENT_BRAND_VERSION = 'pulso-preto-v1';
//                                    ^^^^^^^^^^^^^^^^
//                                    MUDA AQUI
```

**Resultado:** Todo o site/app renderiza o novo nome instantaneamente.

---

## 📖 Documentação

- **Guia Completo:** `/docs/BRAND_VERSIONING_GUIDE.md`
- **Checklist de Migração:** `/docs/MIGRATION_CHECKLIST.md`
- **Sumário Executivo:** `/docs/EXECUTIVE_SUMMARY_BRAND_VERSIONING.md`
- **Exemplo Prático:** `/docs/examples/Header.MIGRATED.tsx`

---

## 🧪 Testes

### Verificar Hardcodes

```bash
./scripts/find-hardcodes.sh
```

### Trocar Versão de Marca (Teste Local)

```typescript
// 1. Editar shared/data/brand-canon.ts
export const CURRENT_BRAND_VERSION = 'gente-preta-v1'; // ← Versão antiga

// 2. Rodar dev server
npm run dev

// 3. Verificar que site renderiza "Gente Preta"

// 4. Reverter
export const CURRENT_BRAND_VERSION = 'pulso-preto-v1';
```

---

## 🔒 Regras de Commit

1. **NUNCA** editar versões antigas em `BRAND_VERSIONS` (são imutáveis)
2. **SEMPRE** criar nova versão ao invés de modificar existente
3. **DOCUMENTAR** `rationale` e `visualConcept` em toda nova versão
4. **TESTAR** localmente antes de mudar `CURRENT_BRAND_VERSION`
5. **NOTIFICAR** equipe antes de deploy com nova marca

---

## 🤝 Contribuindo

### Adicionar Nova Versão de Marca

```typescript
// shared/data/brand-canon.ts

export const BRAND_VERSIONS: Record<BrandVersionId, BrandIdentity> = {
  // ... versões existentes ...
  
  'nova-versao-v1': {
    id: 'nova-versao-v1',
    name: 'Novo Nome',
    slug: 'novo-nome',
    subtitle: 'Novo Subtitle',
    tagline: 'Nova Tagline',
    effectiveDate: '2027-01-01',
    supersededBy: undefined,
    rationale: 'Por que esta versão foi criada?',
    visualConcept: 'Descrição do conceito visual',
    designSystem: { ... },
    urls: { ... },
  },
};

// Atualizar tipo (para TypeScript)
export type BrandVersionId = 
  | 'gente-preta-v1'
  | 'pulso-preto-v1'
  | 'nova-versao-v1'  // ← ADICIONAR AQUI
  | ...;
```

---

## 📊 Status de Migração

Ver scorecard atualizado:
```bash
./scripts/find-hardcodes.sh
```

Estado atual (07/10/2026):
- ✅ Infraestrutura criada
- 🔄 39 hardcodes encontrados
- ⏳ Migração de componentes pendente

---

## 📞 Suporte

**Dúvidas?**
- 📖 Docs: `/docs/BRAND_VERSIONING_GUIDE.md`
- 💬 Slack: #dev-gente-preta
- 🐛 Issues: Tag `[brand-versioning]`
