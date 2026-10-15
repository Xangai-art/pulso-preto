// Integração com o ViaCEP (https://viacep.com.br) — consulta gratuita de endereço por CEP,
// equivalente ao serviço dos Correios. Usado para preencher automaticamente logradouro/bairro/
// cidade/UF a partir do CEP informado pelo usuário (App Sentinela).

export interface ViaCepAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string; // cidade
  uf: string;
  erro?: boolean;
}

export interface CepLookupResult {
  ok: boolean;
  address?: ViaCepAddress;
  errorMessage?: string;
}

/** Remove tudo que não for dígito e valida se o CEP tem 8 dígitos. */
export function normalizeCep(raw: string): string {
  return raw.replace(/\D/g, '').slice(0, 8);
}

export function isValidCepFormat(raw: string): boolean {
  return normalizeCep(raw).length === 8;
}

/** Formata um CEP de 8 dígitos como "00000-000". */
export function formatCep(raw: string): string {
  const digits = normalizeCep(raw);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

/**
 * Busca o endereço correspondente a um CEP usando a API pública do ViaCEP
 * (mesma base de dados dos Correios — DNE). Retorna ok:false com mensagem
 * amigável em caso de CEP inválido, não encontrado, ou falha de rede.
 */
export async function fetchAddressByCep(rawCep: string): Promise<CepLookupResult> {
  const cep = normalizeCep(rawCep);

  if (cep.length !== 8) {
    return { ok: false, errorMessage: 'CEP inválido — informe os 8 números do CEP.' };
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) {
      return { ok: false, errorMessage: 'Não foi possível consultar o CEP agora. Tente novamente.' };
    }
    const data = (await response.json()) as ViaCepAddress;
    if (data.erro) {
      return { ok: false, errorMessage: 'CEP não encontrado. Verifique o número digitado.' };
    }
    return { ok: true, address: data };
  } catch {
    return { ok: false, errorMessage: 'Falha de conexão ao consultar o CEP. Verifique sua internet.' };
  }
}
