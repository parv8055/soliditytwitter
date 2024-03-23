import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, useAccount } from "wagmi";
import { config } from "./config";
import { Account } from "./account";
import { WalletOptions } from "./wallet-options";

const queryClient = new QueryClient();

function ConnectWallet() {

  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}

export default function App() {
  
  return (
    <div className="min-h-screen w-full bg-black text-white flex justify-center items-center p-8">
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectWallet />
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}
