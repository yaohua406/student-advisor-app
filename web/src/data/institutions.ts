export function getInstitutionByCode(code?: string) {
  if (!code) return null;
  if (code === 'MDC') return { code: 'MDC', name: 'Miami Dade College' };
  if (code === 'FIU') return { code: 'FIU', name: 'Florida International University' };
  return { code, name: code };
}
