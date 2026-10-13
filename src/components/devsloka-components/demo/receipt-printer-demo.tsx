import { ReceiptPrinter } from "@/registry/ui/receipt-printer";

const SIZE = 21;

// A decorative stand-in for a real QR code (it doesn't scan). Pass your own in production.
function QrPattern() {
  const isFinder = (x: number, y: number) =>
    (x < 7 && y < 7) || (x >= SIZE - 7 && y < 7) || (x < 7 && y >= SIZE - 7);
  const finderCell = (x: number, y: number) => {
    const fx = x >= SIZE - 7 ? x - (SIZE - 7) : x;
    const fy = y >= SIZE - 7 ? y - (SIZE - 7) : y;
    const ring = Math.max(Math.abs(fx - 3), Math.abs(fy - 3));
    return ring !== 2;
  };
  const noise = (x: number, y: number) => ((x * 73 + y * 151 + x * y * 7) % 11) < 5;

  const cells: React.ReactNode[] = [];
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const on = isFinder(x, y) ? finderCell(x, y) : noise(x, y);
      if (on) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} />);
    }
  }

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="size-28 text-neutral-900"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden
    >
      {cells}
    </svg>
  );
}

export default function ReceiptPrinterDemo() {
  return (
    <ReceiptPrinter
      orderId="#4471"
      merchant="DEVSLOKA COFFEE"
      details={["Koramangala 8th Block · Bangalore", "May 17, 2026 · 09:24 AM", "Order #4471 · Table 12"]}
      items={[
        { label: "Vietnamese Coffee", amount: 280 },
        { label: "Cinnamon Roll", amount: 150 },
      ]}
      charges={[
        { label: "Service charge (10%)", amount: 43 },
        { label: "Tax (5%)", amount: 21.5 },
      ]}
      payment={{
        label: "Scan to pay · UPI",
        code: <QrPattern />,
        id: "devsloka@upi",
      }}
    />
  );
}
