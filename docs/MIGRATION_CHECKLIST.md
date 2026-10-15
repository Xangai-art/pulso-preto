# Checklist de Migração — Brand Canon

## 🎯 Objetivo

Migrar codebase de **arquitetura duplicada** (project.ts hardcoded) para **arquitetura canônica** (brand-canon.ts versionado).

---

## 📊 Progresso Geral

```
┌─────────────────────────────────────────────────────────┐
│ FASE 1: Infraestrutura         [████████████] 100%     │
│ FASE 2: Migração de Componentes [            ]   0%     │
│ FASE 3: Depreciação Legada      [            ]   0%     │
│ FASE 4: Asset Fabric            [            ]   0%     │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ Fase 1: Infraestrutura [CONCLUÍDA]

- [x] Criar `/shared/data/brand-canon.ts`
- [x] Criar `/shared/data/project-adapter.ts`
- [x] Documentar em `BRAND_VERSIONING_GUIDE.md`
- [x] Criar exemplo migrado (`docs/examples/Header.MIGRATED.tsx`)
- [x] Criar este checklist

---

## 🔄 Fase 2: Migração de Componentes [EM ANDAMENTO]

### Site (`site/src/`)

#### Componentes Principais
- [ ] `components/Header.tsx` — **PRIORIDADE ALTA**
  - Linha 39: `<span>Gente Preta</span>` → `<span>{projectInfo.name}</span>`
  - Import: `from '@shared/data/project-adapter'`
  
- [ ] `components/Footer.tsx` — **PRIORIDADE ALTA**
  - Buscar hardcodes de "Gente Preta" em copyright
  - Usar `{projectInfo.name}`
  
- [ ] `components/Logo.tsx` — **PRIORIDADE MÉDIA**
  - `aria-label="Gente Preta"` → `aria-label={projectInfo.name}`
  - Futuro: integrar com `brand.designSystem.logoVariant`

#### Páginas
- [ ] `pages/Home.tsx` — **PRIORIDADE ALTA**
  - Buscar "Gente Preta" em headings, descriptions
  - Substituir por `{projectInfo.name}` / `{projectInfo.tagline}`
  
- [ ] `pages/About.tsx` — **PRIORIDADE MÉDIA**
  - Verificar narrativa institucional
  - Considerar adicionar seção de histórico: `getBrandHistoryForDisplay()`
  
- [ ] `pages/Memory.tsx` — **PRIORIDADE BAIXA**
  - Contexto histórico pode manter "Gente Preta" se for referência ao passado
  - Avaliar caso a caso
  
- [ ] `pages/Community.tsx` — **PRIORIDADE BAIXA**
  
- [ ] `pages/ClinicalTrials.tsx` — **PRIORIDADE BAIXA**

#### Dados
- [ ] `data/project.ts` — **DEPRECIAR**
  - Adicionar JSDoc `@deprecated`
  - Planejar remoção após migração completa

#### Outros
- [ ] `index.html` — **PRIORIDADE MÉDIA**
  - `<title>` tag
  - `<meta name="description">`
  - Usar helper `getProjectMetadata()`

### App (`app/src/`)

#### Componentes
- [ ] `components/Header.tsx` — **PRIORIDADE ALTA**
  - Similar ao site
  
- [ ] `components/Profile.tsx` — **PRIORIDADE MÉDIA**
  - Verificar menções ao nome do app
  
- [ ] `components/Logo.tsx` — **PRIORIDADE MÉDIA**
  - `aria-label` dinâmico

#### Store
- [ ] `store/useAppStore.ts` — **PRIORIDADE MÉDIA**
  - `name: 'gente-preta-sentinela'` → considerar manter (localStorage key)
  - **ATENÇÃO:** Mudar esta string quebra persistência de usuários ativos
  - Decisão: manter hardcoded OU migrar com estratégia de fallback

#### Dados
- [ ] `data/project.ts` — **DEPRECIAR**

---

## 🔍 Como Encontrar Hardcodes

### Busca via Terminal

```bash
# No repositório local
cd /path/to/gente-preta

# Buscar "Gente Preta" em TypeScript/TSX
grep -r "Gente Preta" site/src/ --include="*.ts" --include="*.tsx"
grep -r "Gente Preta" app/src/ --include="*.ts" --include="*.tsx"

# Buscar em HTML
grep -r "Gente Preta" site/index.html
grep -r "Gente Preta" app/index.html

# Buscar imports legados
grep -r "from '@/data/project'" site/src/
grep -r "from '@/data/project'" app/src/
```

### Busca via VS Code

1. Abrir Search (`Cmd/Ctrl + Shift + F`)
2. Buscar: `Gente Preta`
3. Filtrar por arquivos: `*.ts,*.tsx,*.html`
4. Excluir: `node_modules, dist, docs`

---

## 📝 Padrão de Migração

### Template de Refatoração

```diff
  // ANTES
- export const projectInfo = {
-   name: 'Gente Preta',
-   subtitle: '...',
- };

  // DEPOIS
+ import { projectInfo } from '@shared/data/project-adapter';
+ // ↑ Agora consome Brand Canon automaticamente
```

### Casos Especiais

#### 1. Hardcoded em String Template

```diff
- const title = `Bem-vindo ao Gente Preta`;
+ const title = `Bem-vindo ao ${projectInfo.name}`;
```

#### 2. Hardcoded em aria-label

```diff
- <button aria-label="Ir para página inicial do Gente Preta">
+ <button aria-label={`Ir para página inicial do ${projectInfo.name}`}>
```

#### 3. Hardcoded em SEO Metadata

```diff
- <title>Gente Preta — Sentinela de Saúde</title>
+ <title>{getProjectMetadata().title}</title>
```

#### 4. Contexto Histórico (NÃO MIGRAR)

```typescript
// ✅ CORRETO: Mantém "Gente Preta" se for referência histórica
<p>
  O projeto nasceu em 2026 sob o nome "Gente Preta", 
  em parceria com AECID e SEJUS/DF.
</p>

// ❌ ERRADO: Não substituir referências históricas
<p>
  O projeto nasceu em 2026 sob o nome "{projectInfo.name}", // ← BUG
</p>
```

---

## ⚠️ Fase 3: Depreciação Legada

### Checklist

- [ ] Adicionar `@deprecated` JSDoc em `site/src/data/project.ts`
- [ ] Adicionar `@deprecated` JSDoc em `app/src/data/project.ts`
- [ ] Confirmar zero imports legados:
  ```bash
  # Deve retornar vazio
  grep -r "from '@/data/project'" site/src/ app/src/
  ```
- [ ] Remover arquivos:
  ```bash
  git rm site/src/data/project.ts
  git rm app/src/data/project.ts
  ```
- [ ] Atualizar `tsconfig.json` paths se necessário

---

## 🎨 Fase 4: Asset Fabric [FUTURO]

### Objetivos

1. **Versionamento de Assets**
   - Logo v1 (Gente Preta) vs Logo v2 (Pulso Preto)
   - Paleta de cores por versão
   - Favicon dinâmico

2. **Semantic Slots**
   - `brand.assets.logo.primary` → resolve para asset correto
   - `brand.assets.heroImage` → troca automaticamente

3. **Art Direction**
   - Metadata por asset: `focal_point`, `safe_area`, `dark/light`
   - Seleção automática: `resolveAsset(slot, { theme: 'dark' })`

### Checklist (Pendente)

- [ ] Criar `/shared/data/asset-fabric.ts`
- [ ] Migrar logos para Asset Fabric
- [ ] Migrar hero images
- [ ] Migrar favicons
- [ ] Integrar com `brand.designSystem.logoVariant`

---

## 🧪 Testes de Regressão

### Checklist de QA

Após cada migração, verificar:

- [ ] Nome aparece corretamente na navbar (desktop + mobile)
- [ ] Nome aparece corretamente no footer
- [ ] Metadata SEO está correta (`<title>`, `<meta description>`)
- [ ] aria-labels estão corretos
- [ ] Console não mostra erros de import
- [ ] Build passa sem warnings (`npm run build`)
- [ ] TypeScript não reporta erros (`npm run type-check`)

### Teste de Troca de Versão

1. **Trocar para "Gente Preta"**
   ```typescript
   // shared/data/brand-canon.ts
   export const CURRENT_BRAND_VERSION = 'gente-preta-v1';
   ```
   - [ ] Site renderiza "Gente Preta" em todos os lugares
   - [ ] URLs canônicas: `https://gente-preta.pages.dev`

2. **Trocar para "Pulso Preto"**
   ```typescript
   export const CURRENT_BRAND_VERSION = 'pulso-preto-v1';
   ```
   - [ ] Site renderiza "Pulso Preto" em todos os lugares
   - [ ] URLs canônicas: `https://pulsopreto.org`

3. **Trocar para Vintage**
   ```typescript
   export const CURRENT_BRAND_VERSION = 'vintage-future-01';
   ```
   - [ ] Site renderiza "Pulso Preto — Vintage Futurista"
   - [ ] Paleta muda (verificar design tokens)

---

## 📦 Commits Recomendados

### Sprint Atual

```bash
# 1. Infraestrutura
git commit -m "feat(brand): add brand-canon versioning system

- Create shared/data/brand-canon.ts
- Create shared/data/project-adapter.ts
- Add migration guide and checklist
- Preserve 'Gente Preta' and 'Pulso Preto' as versioned options"

# 2. Migrar Header
git commit -m "refactor(site): migrate Header to brand-canon

- Replace hardcoded 'Gente Preta' with projectInfo.name
- Import from @shared/data/project-adapter
- Supports instant rebranding via CURRENT_BRAND_VERSION"

# 3. Migrar Footer
git commit -m "refactor(site): migrate Footer to brand-canon"

# 4. Migrar Home
git commit -m "refactor(site): migrate Home page to brand-canon"

# ... (continuar para outros componentes)
```

### Sprint Futura

```bash
# Depreciação
git commit -m "refactor: deprecate legacy project.ts files

- Add @deprecated JSDoc to site/src/data/project.ts
- Add @deprecated JSDoc to app/src/data/project.ts
- All components migrated to brand-canon"

# Remoção
git commit -m "refactor: remove deprecated project.ts files

- Zero imports to legacy project.ts confirmed
- All references migrated to @shared/data/project-adapter"
```

---

## 🚀 Próxima Sessão

**Objetivo:** Migrar Header + Footer + Home (site)

**Tarefas:**
1. [ ] Refatorar `site/src/components/Header.tsx`
2. [ ] Refatorar `site/src/components/Footer.tsx`
3. [ ] Refatorar `site/src/pages/Home.tsx`
4. [ ] Rodar testes de regressão
5. [ ] Commit: `refactor(site): migrate primary UI to brand-canon`

**Tempo estimado:** 1-2 horas

---

## 📞 Suporte

Dúvidas durante migração?
- **Slack:** #dev-gente-preta
- **GitHub:** Issue com tag `[migration]`
- **Doc:** `/docs/BRAND_VERSIONING_GUIDE.md`
