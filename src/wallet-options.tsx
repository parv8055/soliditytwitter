import { useConnect } from "wagmi";

export function WalletOptions() {
  const { connectors, connect } = useConnect();
  return (
    <div className="space-x-4">
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          className="border-white border rounded py-2 px-4"
          onClick={() => connect({ connector })}
        >
          {connector.name}
        </button>
      ))}
    </div>
  );
}
