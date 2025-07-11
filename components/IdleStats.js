// Komponen statistik idle user modular
export function IdleStats({ stats }) {
  return `
    <div class="idle-stats">
      <h3>Statistik Idle</h3>
      <ul>
        <li>Passive Income: <b>${stats.passiveIncome}</b></li>
        <li>Worker: <b>${stats.worker}</b></li>
        <li>Prestige: <b>${stats.prestigeLevel}</b></li>
        <li>Achievement: <b>${stats.achievements}</b></li>
      </ul>
    </div>
  `;
}
