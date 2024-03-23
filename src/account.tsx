import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { abi } from "./abi";
import { useState } from "react";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  const { data: hash, writeContract } = useWriteContract();
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  async function createTweet() {
    alert("Tweet is " + inputValue + "!");
    writeContract({
      abi,
      address: "0xBb5885811e410E9BBB89A06AB242EFC3D3dd2616",
      functionName: "createTweet",
      args: [inputValue],
    });
    console.log(hash);
  }
  const {
    data: tweets,
    isError,
    isFetching,
  } = useReadContract({
    abi,
    address: "0xBb5885811e410E9BBB89A06AB242EFC3D3dd2616",
    functionName: "getAllTweets",
    args: ["0x01aB470F6016632aCF9b8234D8a53175a2c35329"],
    query: { refetchInterval: 1000 * 60 },
  });

  if (isError == true) return <div>Error</div>;
  if (isFetching) return <div>Loading....</div>;
  return (
    <div className="w-6/12">
      <button
        onClick={() => disconnect()}
        className="border-white border rounded px-4 py-2 mx-auto block"
      >
        Disconnect
      </button>
      <div className="space-x-4 mt-20 flex">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="p-2 rounded text-black w-full"
        />
        <button
          onClick={() => createTweet()}
          className="border-white border rounded px-4"
        >
          Create Tweet
        </button>
      </div>
      <div className="space-y-4 mt-10">
        {tweets?.map((tweet) => {
          return (
            <div className="p-4 border border-white rounded">
              <h1> {tweet.content}</h1>
              <h1> {tweet.likes.toString()} Likes</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
  s;
}
