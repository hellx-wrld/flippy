// Komponen export/import data modular
export function ExportImportPanel({ onExport, onImport }) {
  return `
    <div class="export-import-panel">
      <button id="exportBtn">Export Data</button>
      <input type="file" id="importFile" style="display:none" />
      <button id="importBtn">Import Data</button>
    </div>
  `;
}
