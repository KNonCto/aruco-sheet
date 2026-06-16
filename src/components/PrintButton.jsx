export default function PrintButton({ onPrint }) {
  return (
    <button
      onClick={onPrint}
      className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium py-2 rounded-md"
    >
      <i className="ti ti-printer" style={{ fontSize: "16px" }} />
      Imprimir
    </button>
  );
}
