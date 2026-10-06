// Ícones em linha fina usados no site.
type P = { tamanho?: number };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export const IconeWhats = ({ tamanho = 20 }: P) => (
  <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" {...base}><path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.5L3 21l2-5.5A8.5 8.5 0 1 1 21 11.5z" /></svg>
);
export const IconeEmail = ({ tamanho = 20 }: P) => (
  <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" {...base}><rect x="3" y="5" width="18" height="14" rx="1" /><path d="M3 7l9 6 9-6" /></svg>
);
export const IconeMenu = ({ tamanho = 22 }: P) => (
  <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" {...base}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const IconeSacola = ({ tamanho = 20 }: P) => (
  <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" {...base}><path d="M6 7h12l-1 13H7z" /><path d="M9 7a3 3 0 0 1 6 0" /></svg>
);
export const IconeEstrela = ({ tamanho = 18 }: P) => (
  <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" {...base}><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z" /></svg>
);
export const IconeCoracao = ({ tamanho = 18 }: P) => (
  <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" {...base}><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>
);
export const IconeRelogio = ({ tamanho = 18 }: P) => (
  <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" {...base}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const IconeCheck = ({ tamanho = 20 }: P) => (
  <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" {...base}><circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.5 2.5 4.5-5" /></svg>
);
export const IconeBusca = ({ tamanho = 20 }: P) => (
  <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></svg>
);
