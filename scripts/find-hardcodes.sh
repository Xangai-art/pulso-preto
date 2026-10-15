#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════
# SCRIPT: find-hardcodes.sh
# PROPÓSITO: Encontrar todos os hardcodes de "Gente Preta" no codebase
# USO: ./scripts/find-hardcodes.sh
# ═══════════════════════════════════════════════════════════════════════

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║  🔍 BRAND HARDCODE SCANNER — Gente Preta / Pulso Preto           ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
echo ""

# ─────────────────────────────────────────────────────────────────────────
# 1. HARDCODES "GENTE PRETA"
# ─────────────────────────────────────────────────────────────────────────

echo -e "${BLUE}┌─ BUSCANDO: 'Gente Preta' ─────────────────────────────────────┐${NC}"
echo ""

GENTE_PRETA_COUNT=$(grep -r "Gente Preta" site/src/ app/src/ \
  --include="*.ts" \
  --include="*.tsx" \
  --include="*.html" \
  --exclude-dir=node_modules \
  --exclude-dir=dist \
  2>/dev/null | wc -l | xargs)

if [ "$GENTE_PRETA_COUNT" -gt 0 ]; then
  echo -e "${YELLOW}⚠️  Encontradas $GENTE_PRETA_COUNT ocorrências de 'Gente Preta':${NC}"
  echo ""
  
  grep -rn "Gente Preta" site/src/ app/src/ \
    --include="*.ts" \
    --include="*.tsx" \
    --include="*.html" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    --color=always \
    2>/dev/null || true
    
  echo ""
else
  echo -e "${GREEN}✅ Nenhuma ocorrência de 'Gente Preta' encontrada${NC}"
  echo ""
fi

# ─────────────────────────────────────────────────────────────────────────
# 2. HARDCODES "PULSO PRETO"
# ─────────────────────────────────────────────────────────────────────────

echo -e "${BLUE}┌─ BUSCANDO: 'Pulso Preto' ─────────────────────────────────────┐${NC}"
echo ""

PULSO_PRETO_COUNT=$(grep -r "Pulso Preto" site/src/ app/src/ \
  --include="*.ts" \
  --include="*.tsx" \
  --include="*.html" \
  --exclude-dir=node_modules \
  --exclude-dir=dist \
  2>/dev/null | wc -l | xargs)

if [ "$PULSO_PRETO_COUNT" -gt 0 ]; then
  echo -e "${YELLOW}⚠️  Encontradas $PULSO_PRETO_COUNT ocorrências de 'Pulso Preto':${NC}"
  echo ""
  
  grep -rn "Pulso Preto" site/src/ app/src/ \
    --include="*.ts" \
    --include="*.tsx" \
    --include="*.html" \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    --color=always \
    2>/dev/null || true
    
  echo ""
else
  echo -e "${GREEN}✅ Nenhuma ocorrência de 'Pulso Preto' encontrada${NC}"
  echo ""
fi

# ─────────────────────────────────────────────────────────────────────────
# 3. IMPORTS LEGADOS
# ─────────────────────────────────────────────────────────────────────────

echo -e "${BLUE}┌─ BUSCANDO: Imports de '@/data/project' (LEGADO) ─────────────┐${NC}"
echo ""

LEGACY_IMPORTS_COUNT=$(grep -r "from '@/data/project'" site/src/ app/src/ \
  --include="*.ts" \
  --include="*.tsx" \
  2>/dev/null | wc -l | xargs)

if [ "$LEGACY_IMPORTS_COUNT" -gt 0 ]; then
  echo -e "${RED}❌ Encontrados $LEGACY_IMPORTS_COUNT imports legados:${NC}"
  echo ""
  
  grep -rn "from '@/data/project'" site/src/ app/src/ \
    --include="*.ts" \
    --include="*.tsx" \
    --color=always \
    2>/dev/null || true
    
  echo ""
  echo -e "${YELLOW}⚠️  AÇÃO: Substituir por 'from @shared/data/project-adapter'${NC}"
  echo ""
else
  echo -e "${GREEN}✅ Nenhum import legado encontrado (migração completa!)${NC}"
  echo ""
fi

# ─────────────────────────────────────────────────────────────────────────
# 4. IMPORTS MIGRADOS (VERIFICAÇÃO)
# ─────────────────────────────────────────────────────────────────────────

echo -e "${BLUE}┌─ VERIFICANDO: Imports de '@shared/data/project-adapter' ─────┐${NC}"
echo ""

MIGRATED_IMPORTS_COUNT=$(grep -r "from '@shared/data/project-adapter'" site/src/ app/src/ \
  --include="*.ts" \
  --include="*.tsx" \
  2>/dev/null | wc -l | xargs)

if [ "$MIGRATED_IMPORTS_COUNT" -gt 0 ]; then
  echo -e "${GREEN}✅ Encontrados $MIGRATED_IMPORTS_COUNT imports migrados:${NC}"
  echo ""
  
  grep -rn "from '@shared/data/project-adapter'" site/src/ app/src/ \
    --include="*.ts" \
    --include="*.tsx" \
    --color=always \
    2>/dev/null || true
    
  echo ""
else
  echo -e "${YELLOW}⚠️  Nenhum import migrado encontrado (migração pendente)${NC}"
  echo ""
fi

# ─────────────────────────────────────────────────────────────────────────
# 5. SCORECARD FINAL
# ─────────────────────────────────────────────────────────────────────────

echo ""
echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║  📊 SCORECARD DE MIGRAÇÃO                                         ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
echo ""

TOTAL_HARDCODES=$((GENTE_PRETA_COUNT + PULSO_PRETO_COUNT))

echo "  Hardcodes 'Gente Preta':        $GENTE_PRETA_COUNT"
echo "  Hardcodes 'Pulso Preto':        $PULSO_PRETO_COUNT"
echo "  ────────────────────────────────────────────"
echo "  TOTAL HARDCODES:                $TOTAL_HARDCODES"
echo ""
echo "  Imports legados:                $LEGACY_IMPORTS_COUNT"
echo "  Imports migrados:               $MIGRATED_IMPORTS_COUNT"
echo ""

# Status final
if [ "$TOTAL_HARDCODES" -eq 0 ] && [ "$LEGACY_IMPORTS_COUNT" -eq 0 ]; then
  echo -e "${GREEN}┌────────────────────────────────────────────────────────────────┐${NC}"
  echo -e "${GREEN}│  ✅ MIGRAÇÃO COMPLETA!                                        │${NC}"
  echo -e "${GREEN}│  Todos os hardcodes foram eliminados.                         │${NC}"
  echo -e "${GREEN}│  Trocar de nome agora = editar 1 linha em brand-canon.ts      │${NC}"
  echo -e "${GREEN}└────────────────────────────────────────────────────────────────┘${NC}"
elif [ "$LEGACY_IMPORTS_COUNT" -eq 0 ] && [ "$TOTAL_HARDCODES" -gt 0 ]; then
  echo -e "${YELLOW}┌────────────────────────────────────────────────────────────────┐${NC}"
  echo -e "${YELLOW}│  🔄 MIGRAÇÃO PARCIAL                                          │${NC}"
  echo -e "${YELLOW}│  Imports migrados, mas ainda há hardcodes no código.          │${NC}"
  echo -e "${YELLOW}│  Próximo passo: substituir hardcodes por {projectInfo.name}   │${NC}"
  echo -e "${YELLOW}└────────────────────────────────────────────────────────────────┘${NC}"
else
  echo -e "${RED}┌────────────────────────────────────────────────────────────────┐${NC}"
  echo -e "${RED}│  ⚠️  MIGRAÇÃO PENDENTE                                        │${NC}"
  echo -e "${RED}│  Há $TOTAL_HARDCODES hardcodes e $LEGACY_IMPORTS_COUNT imports legados.                  │${NC}"
  echo -e "${RED}│  Consulte: docs/MIGRATION_CHECKLIST.md                        │${NC}"
  echo -e "${RED}└────────────────────────────────────────────────────────────────┘${NC}"
fi

echo ""
echo "📖 Documentação: docs/BRAND_VERSIONING_GUIDE.md"
echo "📋 Checklist:    docs/MIGRATION_CHECKLIST.md"
echo "💡 Exemplo:      docs/examples/Header.MIGRATED.tsx"
echo ""
