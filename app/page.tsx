import { Chat } from "@/app/components/chat";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-8">
      <h1 className="text-xl font-semibold">Atlas</h1>
      <Chat />
    </main>
  );
}
