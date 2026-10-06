// Vitrine de kits na página inicial: os Kits Premium, com o cartão completo. A lista toda fica em /kits.
import { KITS_PREMIUM } from "@/data/kits";
import { pegar } from "@/lib/produtos";
import CardKitPremium from "./CardKitPremium";

export default function Kits() {
  return (
    <section id="kits" className="section cream center">
      <div className="eyebrow">Kits completos</div>
      <h2 className="h2">A Fragrância <em>Completa</em></h2>
      <p className="lead">
        Uma mesma fragrância em todas as suas formas, do perfume ao hidratante, reunida num só kit. O ritual de perfumação
        completo, do banho à noite, com a mesma assinatura.
      </p>
      <div className="kp-grade">
        {pegar(KITS_PREMIUM.produtos).slice(0, 3).map((k) => <CardKitPremium key={k.nome} kit={k} />)}
      </div>
      <a className="btn btn-outline" style={{ marginTop: 64 }} href="/kits">Ver todos os kits</a>
    </section>
  );
}
