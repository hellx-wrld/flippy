// Komponen Leaderboard modular
export function Leaderboard({ data }) {
  return `
    <div class="leaderboard">
      <h3>Idle Leaderboard</h3>
      <ol>
        ${data.map(u => `<li>${u.username} - ${u.idleScore}</li>`).join('')}
      </ol>
    </div>
  `;
}
